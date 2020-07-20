<?php

namespace App\Notifications;

use App\Message;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
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
        return (new MailMessage)->markdown('emails.account.incoming_message', ['sender' => $this->message->sender]);
    }


    public function toArray($notifiable)
    {
        return [
            'type' => 'INCOMING_MESSAGE',
            'notification_data' => [
                'message_hint' => Str::substr($this->message->content, 0, 20),
                'sender_name' => $this->message->sender->full_name,
                'chat_id' => $this->message->chat->id
            ]
        ];
    }
}
