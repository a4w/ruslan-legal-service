<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    public function appointment()
    {
        return $this->belongsTo(Appointment::class);
    }
}
