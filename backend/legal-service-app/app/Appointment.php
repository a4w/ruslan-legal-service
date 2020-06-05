<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{

    protected $casts = [
        'appointment_time' => 'datetime',
    ];
    public function lawyer()
    {
        return $this->belongsTo(Lawyer::class);
    }
}
