<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    public function participents()
    {
        return $this->hasMany(ChatParticipent::class);
    }
}
