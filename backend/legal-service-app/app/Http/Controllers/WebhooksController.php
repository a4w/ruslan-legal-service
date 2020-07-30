<?php

namespace App\Http\Controllers;

use App\Appointment;
use App\Http\Requests\JSONRequest;
use Illuminate\Support\Facades\Log;
use App\Notifications\AppointmentReserved;

class WebhooksController extends Controller
{
    public function paymentIntentSuccessListener(JSONRequest $request)
    {
        $intent_id = $request->input('data.object.id');
        $amount = (int) $request->input('data.object.amount');
        $currency = $request->input('data.object.currency');
        $status = $request->input('data.object.status');
        $type = $request->input('type');
        if ($type !== 'payment_intent.succeeded' || $currency !== config('app.currency') || $status !== 'succeeded') {
            Log::info('Wrong webhook message');
            return;
        }
        // Find appointments associated with this intent
        $appointments = Appointment::where('payment_intent_id', $intent_id)->get();
        // Verify amount
        $total = 0;
        foreach ($appointments as $appointment) {
            $total += $appointment->price;
        }
        $total *= 100;
        $total = (int) $total;
        if ($amount != $total) {
            Log::info('Wrong webhook total');
            return;
        }
        // Check if already updated
        if ($appointment->status === 'UPCOMING') {
            return;
        }
        // Now all is good, update appointment status
        foreach ($appointments as $appointment) {
            $appointment->status = 'UPCOMING';
            $appointment->save();
        }

        // Notify lawyer of the appointment
        $appointment->lawyer->account->notify(new AppointmentReserved($appointment));
    }
}
