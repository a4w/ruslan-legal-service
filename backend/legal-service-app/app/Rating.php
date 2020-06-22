<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    protected $fillable = ['rating', 'comment'];
    protected $hidden = ['laravel_through_key'];

    public function appointment()
    {
        return $this->belongsTo(Appointment::class);
    }
}
