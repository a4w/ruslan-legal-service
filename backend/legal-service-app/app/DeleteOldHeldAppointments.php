<?php

namespace App;

use Carbon\Carbon;

class DeleteOldHeldAppointments
{
    public function __invoke()
    {
        Appointment::where('status', 'ON_HOLD')->where('created_at', '<=', Carbon::now()->subMinutes(15))->delete();
    }
};
