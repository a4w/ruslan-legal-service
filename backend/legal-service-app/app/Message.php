<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    public $fillable = ['content'];

    protected $casts = [
        'is_read' => 'bool',
    ];

    public function sender()
    {
        return $this->belongsTo(Account::class, 'sender_id');
    }

    public function chat()
    {
        return $this->belongsTo(Chat::class, 'chat_id');
    }
}
