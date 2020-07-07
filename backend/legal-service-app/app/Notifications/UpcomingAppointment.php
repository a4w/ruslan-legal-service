<?php

namespace App\Notifications;

use App\Appointment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class UpcomingAppointment extends Notification
{
    use Queueable;

    private Appointment $appointment;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Appointment $appointment)
    {
        $this->appointment = $appointment;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database', 'email'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        if($notifiable->isLawyer()){
            return (new MailMessage)->markdown('emails.lawyer.upcoming_appointment', ['appointment' => $this->appointment]);
        }else{
            return (new MailMessage)->markdown('emails.client.upcoming_appointment', ['appointment' => $this->appointment]);
        }
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'type' => 'UPCOMING_APPOINTMENT',
            'notification_data' => [
                'appointment_id' => $this->appointment->id
            ]
        ];
    }
