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
        $sid    = config('app.twilio_account_sid');
        $token  = config('app.twilio_auth_token');
        $twilio = new Client($sid, $token);
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
