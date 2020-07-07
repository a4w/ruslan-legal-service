<?php

namespace App;

use App\Notifications\UpcomingAppointment;
use Carbon\Carbon;

class NotifyUpcomingAppointments
{
    public function __invoke()
    {
        $appointments = Appointment::where('status', 'UPCOMING')->where('appointment_time', Carbon::now()->subMinutes(5))->get();
        foreach ($appointments as $appointment) {
            // Notify users
            $appointment->lawyer->account->notify(new UpcomingAppointment($appointment));
            $appointment->client->account->notify(new UpcomingAppointment($appointment));
        }
    }
}
