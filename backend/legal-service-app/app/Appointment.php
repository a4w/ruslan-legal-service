<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{

    protected $with = ['client'];
    protected $hidden = ['room_sid', 'payment_intent_id'];
    protected $fillable = [
        'appointment_time', 'status', 'price', 'duration'
    ];

    protected $casts = [
        'appointment_time' => 'datetime',
    ];

    protected $appends = ['is_cancellable', 'can_be_started'];

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

    public function getIsCancellableAttribute()
    {
        $CANCEL_ALLOWED_MINUTES = 6 * 60;
        /** @var Carbon */
        $appointment_time = $this->appointment_time;
        return now()->lt($appointment_time->subMinutes($CANCEL_ALLOWED_MINUTES)) && $this->status === 'UPCOMING';
    }

    public function getCanBeStartedAttribute()
    {
        if ($this->status !== 'UPCOMING') {
            return false;
        }
        // Check time
        $LOOSE_MINUTES = 1; // Allow joining minutes early
        /** @var Carbon */
        $time = $this->appointment_time;
        if (now()->lt($time->subMinute($LOOSE_MINUTES))) {
            // Time has not came
            return false;
        }
        if (now()->gt($time->addMinutes($this->duration))) {
            // Time has passed
            return false;
        }
        return true;
    }
}
