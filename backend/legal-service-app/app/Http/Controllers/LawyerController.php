<?php

namespace App\Http\Controllers;

use App\Appointment;
use App\Http\Requests\JSONRequest;
use App\Lawyer;
use Carbon\Carbon;
use App\Helpers\AppointmentHelper;

class LawyerController extends Controller
{

    public function fetchSchedule($id, JSONRequest $request)
    {
        // Get lawyer
        $lawyer = Lawyer::find($id);
        if (!$lawyer->isAvailable()) {
            return ['error' => 'Lawyer not available'];
        }
        $schedule = json_decode($lawyer->schedule, true);

        $output = [];

        // Get from and days to show
        $days_to_show = (int) $request->get('days_to_show', 7);
        $from_date = new Carbon($request->get('from', now()));
        $to_date = new Carbon($from_date);
        $to_date->addDays($days_to_show);

        $output['from'] = now()->format(AppointmentHelper::$DATETIME_FORMAT);
        $output['days'] = $days_to_show;

        // Fetch lawyer data
        $slot_length = $lawyer->slot_length;

        // Get appointments and pre-process them for fast checking
        $appointments = $lawyer->appointments->whereBetween('appointment_time', [$from_date, $to_date]);
        $appointments_check = array();
        foreach ($appointments as $appointment) {
            $appointments_check[$appointment->appointment_time->format(AppointmentHelper::$DATE_FORMAT)][$appointment->appointment_time->format(AppointmentHelper::$TIME_FORMAT)] = true;
        }

        // Process schedule
        $data = array();
        $current = new Carbon($from_date);
        for ($d = 0; $d < $days_to_show; ++$d) {
            $formated_date = $current->format(AppointmentHelper::$DATE_FORMAT);
            $day = array(
                'name' => $current->dayName,
                'date' => $formated_date
            );
            $slots = $schedule[$current->dayOfWeek];
            for ($i = 0; $i < count($slots); ++$i) {
                $start_minute = $slots[$i] * $slot_length;
                $start_time = AppointmentHelper::minutesToClock($start_minute);
                $end_time = AppointmentHelper::minutesToClock($start_minute + $slot_length);
                $day['slots'][] = [
                    'id' => $slots[$i],
                    'from' => $start_time,
                    'to' => $end_time,
                    'reserved' => isset($appointments_check[$formated_date][$start_time])
                ];
            }
            $data[] = $day;
            $current->addDay();
        }
        $output['data'] = $data;
        return $output;
    }
}
