<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    public function participents()
    {
        return $this->belongsToMany(Account::class, 'chat_participents', 'chat_id', 'user_id');
    }
}
