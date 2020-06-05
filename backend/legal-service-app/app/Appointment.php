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

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function rating()
    {
        return $this->hasOne(Rating::class);
    }
}
