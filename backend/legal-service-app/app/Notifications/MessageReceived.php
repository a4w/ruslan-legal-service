<?php

namespace App\Notifications;

use App\Mail\MessageReceived as MailMessageReceived;
use App\Message;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class MessageReceived extends Notification implements ShouldQueue
{
    use Queueable;

    protected $message;

    public function __construct(Message $message)
    {
        $this->message = $message;
    }

    public function via($notifiable)
    {
        return ['database', 'mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessageReceived($this->message))->delay(now()->addSeconds(30));
    }

    public function doSend($event)
    {
        if ($event->channel === "database") {
            return true;
        }
        // Check if is already read
        $notifiable = $event->notifiable;
        $notifications = $notifiable->unreadNotifications;
        $notifications->map(function ($notification) {
            if ($notification->id === $this->id) {
                return true;
            }
        });
        return false;
    }


    public function toArray($notifiable)
    {
        return [
            'type' => 'INCOMING_MESSAGE',
            'notification_data' => [
                'message_hint' => Str::substr($this->message->content, 0, 20),
                'sender_name' => $this->message->sender->full_name
            ]
        ];
    }
}
