<?php

namespace App\Http\Controllers;

use App\Appointment;
use App\Http\Requests\JSONRequest;
use App\Lawyer;
use Carbon\Carbon;
use Illuminate\Http\Request;

class LawyerController extends Controller
{
    private static function minutesToClock($minutes)
    {
        $hour = $minutes / 60;
        $minute = $minutes % 60;
        return self::formatTwoDigits($hour) . ':' . self::formatTwoDigits($minute);
    }

    private static function formatTwoDigits($number)
    {
        return substr("0" . $number, -2);
    }

    public function fetchSchedule($id, JSONRequest $request)
    {
        // Get lawyer
        $lawyer = Lawyer::find($id);
        $schedule = json_decode($lawyer->schedule, true);
        // Get from and days to show
        $days_to_show = $request->get('days_to_show');
        $from_date = new Carbon($request->get('from'));
        $to_date = new Carbon($from_date);
        $to_date->addDays($days_to_show);
        // Fetch lawyer data
        $slot_length = $lawyer->slot_length;
        // Get appointments and preprocess them
        $appointments = $lawyer->appointments->whereBetween('appointment_time', [$from_date, $to_date]);
        $appointments_check = array();
        foreach ($appointments as $appointment) {
            $appointments_check[$appointment->appointment_time->format('Y-m-d')][$appointment->appointment_time->format('H:i')] = true;
        }
        // Process schedule
        $data = array();
        $current = $from_date;
        for ($d = 0; $d < $days_to_show; ++$d) {
            $formated_date = $current->format('Y-m-d');
            $day = array(
                'name' => $current->dayName,
                'date' => $formated_date
            );
            $slots = $schedule[$current->dayOfWeek];
            for ($i = 0; $i < count($slots); ++$i) {
                $start_minute = $slots[$i] * $slot_length;
                $end_minute = $start_minute + $slot_length;
                $day['slots'][] = [
                    'id' => $slots[$i],
                    'from' => self::minutesToClock($start_minute),
                    'to' => self::minutesToClock($end_minute),
                    'reserved' => isset($appointments_check[$formated_date][self::minutesToClock($start_minute)])
                ];
            }
            $data[] = $day;
            $current->addDay();
        }
        return $data;
    }
}
