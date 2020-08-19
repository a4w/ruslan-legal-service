<?php

namespace App\Console;

use App\DeleteOldHeldAppointments;
use App\NotifyUpcomingAppointments;
use App\PayLawyers;
use App\UpdateFinishedAppointments;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // $schedule->command('inspire')->hourly();
        $schedule->call(new DeleteOldHeldAppointments)->everyMinute();
        // End appointments
        $schedule->call(new UpdateFinishedAppointments)->everyMinute();
        // Pay lawyers after appointment ends
        $schedule->call(new PayLawyers)->everyMinute();
        // Notify users before appointments by 5 minutes
        $schedule->call(new NotifyUpcomingAppointments)->everyMinute();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
