<?php

namespace App\Helpers;

use Exception;
use Illuminate\Support\Str;

class AppointmentHelper
{
    public static $DATETIME_FORMAT = 'Y-m-d H:i:s';
    public static $DATE_FORMAT = 'Y-m-d';
    public static $TIME_FORMAT = 'H:i';
    public const MINUTES_PER_DAY = 60 * 24;

    public static function minutesToClock($minutes)
    {
        $hour = $minutes / 60;
        $minute = $minutes % 60;
        return sprintf('%02d', $hour) . ':' . sprintf('%02d', $minute);
    }

    public static function clockToMinutes(String $clock): Int
    {
        $parts = explode(':', $clock);
        $hour = (int) $parts[0];
        $minutes = (int) $parts[1];
        if ($hour < 0 || $hour > 23 || $minutes < 0 || $minutes > 59) {
            throw new Exception("Clock is not properly formated");
        }
        return 60 * $hour + $minutes;
    }
}
