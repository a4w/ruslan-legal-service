<?php

namespace App\Http\Controllers;

use App\Http\Requests\JSONRequest;
use App\Lawyer;
use Carbon\Carbon;
use App\Helpers\AppointmentHelper;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Request;

class LawyerController extends Controller
{

    public function getLawyersPaginated(Request $request)
    {
        $offset = $request->get('offset', 0);
        $length = (int) $request->get('length', 10);

        // This can be cached (and should be)
        $lawyers = Lawyer::where('slot_length', '<>', null)
            ->limit($length)
            ->skip($offset)
            ->get();

        foreach ($lawyers as &$lawyer) {
            // Show only average rating
            $ratings = collect($lawyer['ratings']);
            $lawyer['ratings_average'] = $ratings->avg('rating') ?? 0;
            $lawyer['ratings_count'] = $ratings->count();
            $end_date = new Carbon($lawyer['discount_end']);
            $lawyer['discount_ends_in'] = $end_date->gt(now()) ? $end_date->diffInMilliseconds(now()) : null;
            unset($lawyer['ratings']);
        }
        return $lawyers;
    }

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
                $current->setTime($start_minute / 60, $start_minute % 60);
                $is_upcoming = true;
                if ($current->lt(now())) {
                    $is_upcoming = false;
                }
                $end_time = AppointmentHelper::minutesToClock($start_minute + $slot_length);
                $day['slots'][] = [
                    'id' => $slots[$i],
                    'from' => $start_time,
                    'to' => $end_time,
                    'reserved' => !$is_upcoming || isset($appointments_check[$formated_date][$start_time])
                ];
            }
            $data[] = $day;
            $current->addDay();
        }
        $output['data'] = $data;
        return $output;
    }

    public function updateSchedule(JSONRequest $request)
    {
        $request->validate([
            'slot_length' => ['required', 'IN:30,45,60,75,90'],
            'enable_discount' => ['required', 'boolean'],
            'percent_discount' => ['exclude_if:enable_discount,false', 'required', 'boolean'],
            'discount_value' => ['exclude_if:enable_discount,false', 'required', 'min:0', 'numeric'],
            'discount_end' => ['exclude_if:enable_discount,false', 'required', 'date_format:Y-m-d H:i:s'],
            'price_per_slot' => ['required', 'numeric', 'min:0']
        ]);
        /** @var Account **/
        $user = Auth::user();
        if (!$user->isLawyer()) {
            return ["error" => true, "message" => "unauthorized"];
        }
        $lawyer = $user->lawyer;
        $incoming_schedule = $request->get('schedule');
        // Set the schedule
        $schedule = array([], [], [], [], [], [], []);
        $slot_length = $lawyer->slot_length;
        foreach ($incoming_schedule as $day => $slots) {
            try {
                $day_idx = AppointmentHelper::dayToIndex($day);
                if ($day_idx === null) {
                    return ['error' => true, 'message' => 'Malformed request'];
                }
                foreach ($slots as $slot) {
                    $slot = AppointmentHelper::clockToMinutes($slot);
                    $schedule[$day_idx][] = (int) ($slot / $slot_length);
                }
            } catch (Exception $e) {
                return ['error' => true, 'message' => 'Malformed request'];
            }
        }
        if (count($schedule) !== 7) {
            return ['error' => true, 'message' => 'Malformed request'];
        }
        // Save fields
        $lawyer->schedule = $schedule;
        $lawyer->slot_length = $request->get('slot_length');
        $lawyer->price_per_slot = $request->get('price_per_slot');
        if ($request->get('enable_discount', false)) {
            $lawyer->discount = $request->get('discount_value');
            $lawyer->is_percent_discount = $request->get('percent_discount');
            $lawyer->discount_end = $request->get('discount_end');
        } else {
            $lawyer->discount = null;
        }
        $lawyer->save();

        return ['error' => false, 'message' => 'success'];
    }
    public function fetchLawyer(Lawyer $lawyer)
    {
        return $lawyer;
    }
}
