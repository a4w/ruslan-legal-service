<?php

namespace App\Http\Controllers;

use App\Appointment;
use App\Helpers\AppointmentHelper;
use App\Helpers\RespondJSON;
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
            'slots.*.datetime' => ['required', 'date_format:Y-m-d H:i', 'after_or_equal:now'],
            'slots.*.time' => ['required', 'date_format:H:i'],
            'slots.*.length' => ['required', 'numeric', 'min:1'],
        ]);
        /** @var Account */
        $user = Auth::user();
        if ($user->isLawyer()) {
            return RespondJSON::forbidden();
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
                return RespondJSON::gone();
            }
            // Check 2
            $slot_weekday = AppointmentHelper::dayToIndex($slot_datetime->dayName);
            $slot_time = $slot['time'];
            $slot_length = $slot['length'];
            $is_real_slot = false;
            foreach ($lawyer->schedule[$slot_weekday]['slots'] as $schedule_slot) {
                if ($schedule_slot['time'] === $slot_time && $schedule_slot['length'] === $slot_length) {
                    $is_real_slot = true;
                    break;
                }
            }
            if (!$is_real_slot) {
                return RespondJSON::gone();
            }
            // All is good create and put em on hold
            $appointment = Appointment::make([
                'appointment_time' => $slot_datetime,
                'status' => 'ON_HOLD',
                'price' => $lawyer->discounted_price_per_hour * ($slot_length / 60),
                'duration' => $slot_length
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
            return RespondJSON::with(['client_secret' => $paymentIntent->client_secret]);
        } catch (Exception $e) {
            return RespondJSON::unknownError();
        }
    }
    public function getRoomAccessToken(Appointment $appointment)
    {
        if ($appointment->status !== 'UPCOMING') {
            return RespondJSON::paymentRequired();
        }
        // Check if a participant in this appointment
        $user = Auth::user();
        if ($user->lawyer != $appointment->lawyer && $user->client != $appointment->client) {
            return RespondJSON::forbidden();
        }
        // Check time
        $LOOSE_MINUTES = 1; // Allow joining minutes early
        /** @var Carbon */
        $time = $appointment->appointment_time;
        if (now()->lt($time->subMinute($LOOSE_MINUTES))) {
            // Time has not came
            return RespondJSON::conflict();
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
        $identity = $user->id;

        // Create access token, which we will serialize and send to the client
        $token = new AccessToken($sid, $apiKey, $apiSecret, 3600, $identity);

        // Create Video grant
        $videoGrant = new VideoGrant();
        $videoGrant->setRoom($room->sid);
        // Add grant to token
        $token->addGrant($videoGrant);

        // render token to string
        return RespondJSON::success(['access_token' => $token->toJWT()]);
    }
}
