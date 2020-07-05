<?php

namespace App;

use Exception;
use Twilio\Rest\Client;

class PayLawyers
{
    public function __invoke()
    {
        $appointments = Appointment::where('status', 'DONE')->where('transfer_id', null)->get();
        foreach ($appointments as $appointment) {
            // Attempt paying lawyer
            try {
                $transfer = \Stripe\Transfer::create([
                    "amount" => $appointment->price * 100,
                    "currency" => config('app.currency'),
                    "destination" => $appointment->lawyer->stripe_connected_account_id
                ]);
                $appointment->transfer_id = $transfer->id;
                $appointment->save();
            } catch (Exception $e) {
                //
            }
        }
    }
}
