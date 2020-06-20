<?php

namespace App\Http\Controllers;

use App\Appointment;
use App\Helpers\AppointmentHelper;
use App\Http\Requests\JSONRequest;
use App\Lawyer;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Auth;
use Stripe\PaymentIntent;
use Stripe\Stripe;
use Twilio\Jwt\AccessToken;
use Twilio\Jwt\Grants\VideoGrant;

class AppointmentController extends Controller
{
    public function selectSlots(Lawyer $lawyer, JSONRequest $request)
    {
        $request->validate([
            'slots' => ['required', 'array', 'min:1'],
            'slots.*.datetime' => ['required', 'date_format:Y-m-d H:i:s', 'after_or_equal:now'],
        ]);
        /** @var Account */
        $user = Auth::user();
        if ($user->isLawyer()) {
            return [
                'error' => true,
                'message' => 'Not available'
            ];
        }
        $user = $user->client;
        /**
            Validate that slots are available
            1) It's not reserved (easier)
            2) It's an actual slot for the lawyer by checking if it evenly divides the slot_length and is available in schedule
         */
        $selected_slots = $request->get('slots');
        $total_price = 0;
        $appointments = [];
        foreach ($selected_slots as $slot) {
            $slot_datetime = new Carbon($slot['datetime']);
            // Check 1
            $appointment = $lawyer->appointments()->where('appointment_time', $slot_datetime)->first();
            if ($appointment !== null) {
                return [
                    'error' => true,
                    'message' => 'Appointment is not available'
                ];
            }
            // Check 2
            $slot_weekday = AppointmentHelper::dayToIndex($slot_datetime->dayName);
            $slot_time = AppointmentHelper::clockToMinutes($slot_datetime->format(AppointmentHelper::TIME_FORMAT));
            $slot_index = $slot_time / $lawyer->slot_length;
            $lawyer_schedule = $lawyer->schedule;
            if (array_search($slot_index, $lawyer_schedule[$slot_weekday]) === false) {
                return [
                    'error' => true,
                    'message' => 'Appointment is not available'
                ];
            }
            // All is good create and put em on hold
            $original_price = $lawyer->price_per_slot;
            $discounted_price = $original_price;
            if (Carbon::now()->lte($lawyer->discount_end)) {
                if ($lawyer->is_percent_discount) {
                    $discounted_price -= $lawyer->discount / 100 * $original_price;
                } else {
                    $discounted_price -= $lawyer->discount;
                }
            }
            $appointment = Appointment::make([
                'appointment_time' => $slot_datetime,
                'status' => 'ON_HOLD',
                'price' => $discounted_price,
                'duration' => $lawyer->slot_length
            ]);
            $total_price += $appointment->price;
            $appointment->lawyer()->associate($lawyer);
            $appointment->client()->associate($user);
            $appointments[] = $appointment;
        }

        // Create payment intent
        // TODO Account for commission
        Stripe::setApiKey(config('app.stripe_api_key'));
        try {
            $paymentIntent = PaymentIntent::create([
                'amount' => $total_price * 100, // Stripe uses this stupid way to avoid rounding errors
                'currency' => 'gbp'
            ]);
            foreach ($appointments as $appointment) {
                $appointment->payment_intent_id = $paymentIntent->id;
                $appointment->save();
            }
            return [
                'error' => false,
                'client_secret' => $paymentIntent->client_secret
            ];
        } catch (Exception $e) {
            return [
                'error' => true,
                'message' => 'Error creating payment'
            ];
        }
    }
    public function getRoomAccessToken(Appointment $appointment)
    {
        if ($appointment->status !== 'UPCOMING') {
            return [
                'error' => true,
                'message' => 'Appointment not paid'
            ];
        }
        // Check if a participant in this appointment
        $user = Auth::user();
        if ($user->lawyer != $appointment->lawyer && $user->client != $appointment->client) {
            return [
                'error' => true,
                'message' => 'Unauthorized'
            ];
        }
        // Check time
        $LOOSE_MINUTES = 1; // Allow joining minutes early
        /** @var Carbon */
        $time = $appointment->appointment_time;
        if (now()->lt($time->subMinute($LOOSE_MINUTES))) {
            // Time has not came
            return [
                'error' => true,
                'message' => 'Appointment time has not came'
            ];
        }
        // All is good, Check if room already created
        $room_sid = $appointment->room_sid;
        if ($room_sid === null) {
            $appointment->createRoom();
        }
        // Verify room is present
        $twilio = resolve(\Twilio\Rest\Client::class);
        try {
            $twilio->video->rooms($appointment->room_sid)->fetch();
        } catch (Exception $e) {
            // Recreate room
            $appointment->createRoom();
        }
        $room = $twilio->video->rooms($appointment->room_sid)->fetch();


        // Required for all Twilio access tokens
        $sid    = config('app.twilio_account_sid');
        $token  = config('app.twilio_auth_token');
        $apiKey = config('app.twilio_api_key_sid');
        $apiSecret = config('app.twilio_api_key_secret');

        // A unique identifier for this user
        $identity = $user->name . ' ' . $user->surname;

        // Create access token, which we will serialize and send to the client
        $token = new AccessToken($sid, $apiKey, $apiSecret, 3600, $identity);

        // Create Video grant
        $videoGrant = new VideoGrant();
        $videoGrant->setRoom($room->sid);
        // Add grant to token
        $token->addGrant($videoGrant);

        // render token to string
        return [
            'error' => false,
            'access_token' => $token->toJWT()
        ];
    }
}
