<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ChatParticipent extends Model
{
    public $timestamps = false;
    public function account()
    {
        return $this->belongsTo(Account::class, 'user_id');
    }
}
