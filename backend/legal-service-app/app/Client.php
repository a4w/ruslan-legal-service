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
}
