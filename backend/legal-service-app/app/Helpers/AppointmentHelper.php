<?php

namespace App\Helpers;

use Carbon\Carbon;
use Exception;
use Illuminate\Support\Str;

class AppointmentHelper
{
    public const DATETIME_FORMAT = 'Y-m-d H:i:s';
    public const DATE_FORMAT = 'Y-m-d';
    public const TIME_FORMAT = 'H:i';
    public const MINUTES_PER_DAY = 60 * 24;

    protected const DAY_MAPPING = [
        'monday' => 0,
        'tuesday' => 1,
        'wednesday' => 2,
        'thursday' => 3,
        'friday' => 4,
        'saturday' => 5,
        'sunday' => 6,
    ];

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

    public static function dayToIndex($day)
    {
        $day_idx = AppointmentHelper::DAY_MAPPING[Str::lower($day)] ?? null;
        if ($day_idx === null) {
            throw new Exception("Day is not valid");
        }
        return $day_idx;
    }

    public static function indexToDay($index)
    {
        $day = array_search($index, AppointmentHelper::DAY_MAPPING);
        if ($day === false) {
            throw new Exception("Day index is not valid");
        }
        return $day;
    }
}
