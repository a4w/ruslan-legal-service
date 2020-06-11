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

class AppointmentController extends Controller
{
    public function selectSlots(Lawyer $lawyer, JSONRequest $request)
    {
        $request->validate([
            'slots' => ['required', 'array', 'min:1'],
            'slots.*.datetime' => ['required', 'date_format:Y-m-d H:i:s', 'after:today'],
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
            $appointment = Appointment::make([
                'appointment_time' => $slot_datetime,
                'status' => 'ON_HOLD',
                'price' => $lawyer->price_per_slot, // TODO: Account for discount
                'duration' => $lawyer->slot_length
            ]);
            $total_price += $appointment->price;
            $appointment->lawyer()->associate($lawyer);
            $appointment->client()->associate($user);
            $appointments[] = $appointment;
        }

        // Create payment intent
        Stripe::setApiKey(config('app.stripe_api_key'));
        try {
            $paymentIntent = PaymentIntent::create([
                'amount' => $total_price,
                'currency' => 'usd'
            ]);
            foreach ($appointments as $appointment) {
                $appointment->save();
            }
            return [
                'error' => false,
                'client_secret' => $paymentIntent->client_secret
            ];
        } catch (Exception $e) {
            dump($e);
            return [
                'error' => true,
                'message' => 'Error creating payment'
            ];
        }
    }
}
