<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{

    protected $fillable = [
        'appointment_time', 'status', 'price', 'duration'
    ];

    protected $casts = [
        'appointment_time' => 'datetime',
    ];

    public function lawyer()
    {
        return $this->belongsTo(Lawyer::class);
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function rating()
    {
        return $this->hasOne(Rating::class);
    }

    public function createRoom()
    {
        // Create the room
        $twilio = resolve('Twilio\Rest\Client');
        $room = $twilio->video->v1->rooms
            ->create(
                [
                    "enableTurn" => true,
                    "type" => "peer-to-peer",
                    "maxParticipants" => 2
                ]
            );
        $this->room_sid = $room->sid;
        $this->save();
    }
}
