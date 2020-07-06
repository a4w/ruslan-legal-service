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
                // Subtract commission
                $price_after_commission = $appointment->price;
                if (config('app.commission_type') === 'PERCENT') {
                    $price_after_commission -= $price_after_commission * (config('app.commission_amount') / 100);
                } else {
                    $price_after_commission -= config('app.commission_amount');
                }
                if ($price_after_commission > 0) {
                    $transfer = \Stripe\Transfer::create([
                        "amount" => $price_after_commission * 100,
                        "currency" => "gbp",
                        "destination" => $appointment->lawyer->stripe_connected_account_id
                    ]);
                    $appointment->transfer_id = $transfer->id;
                } else {
                    $appointment->transfer_id = 'NO_TRANSFER';
                }
                $appointment->save();
            } catch (Exception $e) {
                dump($e);
            }
        }
    }
}
