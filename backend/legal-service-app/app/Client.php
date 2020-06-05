<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    public $timestamps = false;

    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function ratings()
    {
        return $this->hasManyThrough(Rating::class, Appointment::class);
    }
}
