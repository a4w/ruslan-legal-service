<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{

    protected $hidden = [
        'pivot'
    ];
    protected $with = ['participents'];
    public function participents()
    {
        return $this->belongsToMany(Account::class, 'chat_participents', 'chat_id', 'user_id');
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}
