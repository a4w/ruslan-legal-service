<?php

namespace App\Helpers;

class AppointmentHelper
{
    public static $DATETIME_FORMAT = 'Y-m-d H:i:s';
    public static $DATE_FORMAT = 'Y-m-d';
    public static $TIME_FORMAT = 'H:i';

    public static function minutesToClock($minutes)
    {
        $hour = $minutes / 60;
        $minute = $minutes % 60;
        return sprintf('%02d', $hour) . ':' . sprintf('%02d', $minute);
    }
}
