<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    public $fillable = ['content'];

    protected $casts = [
        'is_read' => 'bool',
    ];

    protected $appends = ['link'];

    public function getLinkAttribute()
    {
        if ($this->message_type === 'FILE') {
            return route('chat.download_file', ['mid' => $this->id]);
        }
        return null;
    }

    public function getUIDAttribute()
    {
        if ($this->message_type === 'FILE') {
            $content = json_decode($this->attributes['content']);
            return $content->uid;
        }
        return null;
    }

    public function getContentAttribute($content)
    {
        if ($this->message_type === 'FILE') {
            $content = json_decode($content);
            return $content->name;
        }
        return $content;
    }

    public function sender()
    {
        return $this->belongsTo(Account::class, 'sender_id');
    }

    public function chat()
    {
        return $this->belongsTo(Chat::class, 'chat_id');
    }
}
