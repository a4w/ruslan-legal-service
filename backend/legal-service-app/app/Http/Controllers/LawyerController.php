<?php

namespace App\Http\Controllers;

use App\Accreditation;
use App\Http\Requests\JSONRequest;
use App\Lawyer;
use Carbon\Carbon;
use App\Helpers\AppointmentHelper;
use App\Helpers\RespondJSON;
use App\LawyerType;
use App\PracticeArea;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\Routing\Exception\ResourceNotFoundException;

class LawyerController extends Controller
{

    public function getLawyersPaginated(Request $request)
    {
        $offset = $request->get('offset', 0);
        $length = (int) $request->get('length', 10);

        // Filters
        $location = $request->get('location');
        $location = $location === '' ? null : $location;
        $practice_areas = $request->get('practice_areas');
        $practice_areas = $practice_areas === null ? null : explode(',', $practice_areas);
        $available_on = $request->get('available_on');
        $available_on = $available_on === '' ? null : $available_on;

        // Sorting
        $order_by = $request->get('order', 'price');

        // TODO: This can be cached (and should be)
        $lawyers = Lawyer::where('schedule', '<>', null)
            ->whereHas('account', function ($query) use ($location) {
                if ($location === null) {
                    return $query;
                }
                return $query->where('city', $location);
            })
            ->whereHas('practice_areas', function ($query) use ($practice_areas) {
                if ($practice_areas === null) {
                    return $query;
                }
                return $query->whereIN('id', $practice_areas);
            })
            ->limit($length)
            ->skip($offset)
            ->get()
            ->filter(function ($item) use ($available_on) {
                if ($available_on === null) {
                    return true;
                }
                // Check if available on selected date
                $day = new Carbon($available_on);
                $dayIdx = $day->dayOfWeek;
                $schedule = $item->schedule;
                $slots = $schedule[$dayIdx]['slots'];
                return count($slots) > 0;
            })
            ->each(function (&$item, $key) {
                $ratings = collect($item['ratings']);
                $item['ratings_average'] = $ratings->avg('rating') ?? 0;
                $item['ratings_count'] = $ratings->count();
                unset($item['ratings']);
            })
            ->sortBy(function ($query) use ($order_by) {
                switch ($order_by) {
                    case 'ratings':
                        return -$query->ratings_average;
                        break;
                    case 'price':
                        return $query->discounted_price_per_hour;
                        break;
                    case 'popular':
                        return -$query->ratings_count;
                        break;
                }
            })->values();

        /*foreach ($lawyers as &$lawyer) {
            // Show only average rating
            $ratings = collect($lawyer['ratings']);
            $lawyer['ratings_average'] = $ratings->avg('rating') ?? 0;
            $lawyer['ratings_count'] = $ratings->count();
            unset($lawyer['ratings']);
        }*/
        return RespondJSON::with(['lawyers' => $lawyers]);
    }

    public function fetchSchedule($id, JSONRequest $request)
    {
        // Get lawyer
        $lawyer = Lawyer::find($id);
        if ($lawyer !== null && !$lawyer->isAvailable()) {
            return RespondJSON::unknownError();
        }
        $schedule = $lawyer->schedule;

        $output = [];

        // Get from and days to show
        $days_to_show = (int) $request->get('days_to_show', 7);
        $from_date = new Carbon($request->get('from', now()));
        $to_date = new Carbon($from_date);
        $to_date->addDays($days_to_show);

        $output['from'] = now()->format(AppointmentHelper::DATETIME_FORMAT);
        $output['number_of_days'] = $days_to_show;

        // Get appointments and pre-process them for fast checking
        $appointments = $lawyer->appointments->whereBetween('appointment_time', [$from_date, $to_date]);
        $appointments_check = array();
        foreach ($appointments as $appointment) {
            $appointments_check[$appointment->appointment_time->format(AppointmentHelper::DATE_FORMAT)][$appointment->appointment_time->format(AppointmentHelper::TIME_FORMAT)] = true;
        }

        // Process schedule
        $data = array();
        $current = new Carbon($from_date);
        for ($d = 0; $d < $days_to_show; ++$d) {
            $formatted_date = $current->format(AppointmentHelper::DATE_FORMAT);
            $day = array(
                'name' => $current->dayName,
                'date' => $formatted_date,
                'slots' => []
            );
            $current_day_slots = $schedule[$current->dayOfWeek]['slots'];
            for ($i = 0; $i < count($current_day_slots); ++$i) {
                $slot = $current_day_slots[$i];
                $start_time = new Carbon($slot['time']);
                $end_time = new Carbon($start_time);
                $end_time->addMinutes($slot['length']);
                $is_upcoming = true;
                if ($current->lt(now())) {
                    $is_upcoming = false;
                }
                $day['slots'][] = [
                    'time' => $slot['time'],
                    'length' => $slot['length'],
                    'to' => $end_time->format('H:i'),
                    'reserved' => !$is_upcoming || isset($appointments_check[$formatted_date][$slot['time']]),
                ];
                /*$start_minute = $slots[$i] * $slot_length;
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
                    'reserved' => !$is_upcoming || isset($appointments_check[$formatted_date][$start_time])
                ];*/
            }
            $data[] = $day;
            $current->addDay();
        }
        $output['days'] = $data;
        return RespondJSON::with([
            'schedule' => $output,
            'price_per_hour' => $lawyer->price_per_hour,
            'enable_discount' => $lawyer->discount !== null,
            'discount_amount' => $lawyer->discount,
            'is_percent_discount' => $lawyer->is_percent_discount,
            'discount_end' => $lawyer->discount_end
        ]);
    }

    public function getWeekSchedule()
    {
        /** @var Account */
        $user = Auth::user();
        $lawyer = $user->lawyer;
        if (!$user->isLawyer()) {
            return RespondJSON::forbidden();
        }
        return RespondJSON::success([
            'schedule' => $lawyer->schedule,
            'price_per_hour' => $lawyer->price_per_hour,
            'enable_discount' => $lawyer->discount !== null,
            'discount_amount' => $lawyer->discount,
            'is_percent_discount' => $lawyer->is_percent_discount,
            'discount_end' => $lawyer->discount_end
        ]);
    }

    public function updateSchedule(JSONRequest $request)
    {
        $request->validate([
            'schedule' => ['required', 'array'],
            'schedule.days' => ['required', 'array', 'size:7'],
            'schedule.days.*.slots' => ['array'],
            'schedule.days.*.slots.*.weekday' => ['required', 'numeric', 'min:0', 'max:6'],
            'schedule.days.*.slots.*.time' => ['required', 'regex:/^[0-9]{2}:[0-9]{2}$/', 'date_format:H:i'],
            'schedule.days.*.slots.*.length' => ['required', 'IN:30,45,60,90'],

            'schedule.settings.price_per_hour' => ['required', 'numeric', 'min:0'],
            'schedule.settings.enable_discount' => ['required', 'boolean'],
            'schedule.settings.is_percent_discount' => ['exclude_if:schedule.settings.enable_discount,false', 'required', 'boolean'],
            'schedule.settings.discount_amount' => ['exclude_if:schedule.settings.enable_discount,false', 'required', 'min:0', 'numeric'],
            'schedule.settings.discount_end' => ['exclude_if:schedule.settings.enable_discount,false', 'required', 'date'],
        ]);
        /** @var Account **/
        $user = Auth::user();
        if (!$user->isLawyer()) {
            return RespondJSON::forbidden();
        }
        $lawyer = $user->lawyer;
        $incoming_schedule = $request->input('schedule.days');

        // Save schedule
        $lawyer->schedule = $incoming_schedule;

        // Save settings
        $lawyer->price_per_hour = $request->input('schedule.settings.price_per_hour');
        $enable_discount = $request->input('schedule.settings.enable_discount');
        $lawyer->discount = $enable_discount ? $request->input('schedule.settings.discount_amount') : null;
        $lawyer->is_percent_discount = $request->input('schedule.settings.is_percent_discount', null);
        $lawyer->discount_end = $request->input('schedule.settings.discount_end', null);

        $lawyer->save();
        return RespondJSON::success();
    }
    public function fetchLawyer(Lawyer $lawyer)
    {
        return RespondJSON::with(['lawyer' => $lawyer]);
    }

    public function fetchMe()
    {
        /** @var Account */
        $user = Auth::user();
        if ($user->isClient()) {
            return RespondJSON::forbidden();
        }
        return RespondJSON::with(['lawyer' => $user->lawyer]);
    }

    public function getLawyerTypes()
    {
        return RespondJSON::success(['types' => LawyerType::all()]);
    }

    public function getPracticeAreas()
    {
        return RespondJSON::success(['areas' => PracticeArea::all()]);
    }

    public function getAccreditations()
    {
        return RespondJSON::success(['accreditations' => Accreditation::all()]);
    }

    public function updateProfile(JSONRequest $request)
    {
        /** @var Account */
        $user = Auth::user();
        if ($user->isClient()) {
            return RespondJSON::forbidden();
        }
        $lawyer = $user->lawyer;
        $request->validate([
            'lawyer_type_id' => ['required', 'IN:0,1,2'],
            'lawyer_type' => ['exclude_unless:lawyer_type_id,0', 'required'],
            'regulator' => ['required'],
            'year_licensed' => ['required', 'numeric'],
            'institution' => ['required'],
            'graduation' => ['required', 'numeric'],
            'course' => ['required'],
            'practice_areas' => ['required', 'array', 'min:1'],
            'practice_areas.*' => ['required', 'numeric', 'exists:practice_areas,id'],
            'accreditations' => ['required', 'array', 'min:1'],
            'accreditations.*' => ['required', 'numeric', 'exists:accreditations,id'],
        ]);
        $lawyer->update($request->only(['biography', 'years_licenced', 'institution', 'course', 'graduation_year']));
        // Lawyer type
        if ($request->get('lawyer_type_id') === 0) {
            $type = LawyerType::create([
                'type' => $request->get('lawyer_type')
            ]);
            $lawyer->lawyer_type()->associate($type);
        } else {
            $type = LawyerType::find($request->get('lawyer_type_id'));
            $lawyer->lawyer_type()->associate($type);
        }
        // Lawyer practice areas
        $practice_areas = $request->get('practice_areas');
        $lawyer->practice_areas()->detach();
        foreach ($practice_areas as $area) {
            $lawyer->practice_areas()->attach(PracticeArea::find($area));
        }

        // Lawyer accreditations
        $accreditations = $request->get('accreditations');
        $lawyer->accreditations()->detach();
        foreach ($accreditations as $accreditation) {
            $lawyer->accreditations()->attach(Accreditation::find($accreditation));
        }
        $lawyer->save();
        return RespondJSON::success();
    }

    public function fetchLawyerAppointments(Request $request)
    {
        /** @var Account */
        $user = Auth::user();
        if ($user->isClient()) {
            return RespondJSON::forbidden();
        }
        $lawyer = $user->lawyer;
        // Detect filters
        $upcoming = $request->get('upcoming', "false") === "true";
        if ($upcoming) {
            $appointments = $lawyer->appointments()->where('appointment_time', '>=', now())->get();
        } else {
            $appointments = $lawyer->appointments;
        }
        return RespondJSON::success(['appointments' => $appointments]);
    }
}
