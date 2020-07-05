<?php

namespace App;

use Exception;
use Twilio\Rest\Client;

class UpdateFinishedAppointments
{
    public function __invoke()
    {
        $appointments = Appointment::where('status', 'UPCOMING')->where('appointment_time', '<', now())->get();
        $twilio = resolve(Client::class);
        foreach ($appointments as $appointment) {
            /** @var Carbon */
            $time = $appointment->appointment_time;
            // If it's time has passed
            if ($time->addMinutes($appointment->duration)->lt(now())) {
                // Kick all participants
                try {
                    $twilio->video->v1->rooms($appointment->room_sid)
                        ->update("completed");
                } catch (\Exception $e) {
                }
                // Update appointment to be DONE
                $appointment->status = 'DONE';
                $appointment->save();
            }
        }
    }
}
