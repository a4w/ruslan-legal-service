<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Events\NotificationSending;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class NotificationSendingListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle(NotificationSending $event)
    {
        if (method_exists($event->notification, 'doSend')) {
            return $event->notification->doSend($event);
        }
        return $b;
    }
}
