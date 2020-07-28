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
use App\Regulator;
use Exception;
use Firebase\JWT\JWT;
use Illuminate\Database\Query\Builder;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

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

        $sort = ['price_per_hour', 'asc'];
        switch ($order_by) {
            default:
            case 'price':
                $sort = ['price_per_hour', 'asc'];
                break;
            case 'ratings':
                $sort = ['ratings_average', 'desc'];
                break;
            case 'popular':
                $sort = ['ratings_count', 'desc'];
                break;
        }

        $dat_table = DB::table('lawyers as lawyer_data')->where('lawyer_data.schedule', '<>', null)
            ->selectRaw('`lawyer_data`.`id` AS `lawyer_id`')
            ->selectRaw('COUNT(`ratings`.`id`) AS `ratings_count`')
            ->selectRaw('AVG(`ratings`.`rating`) AS `ratings_average`')
            ->join('appointments', function (JoinClause $join) {
                $join->on('lawyer_data.id', '=', 'appointments.lawyer_id');
            })
            ->join('ratings', function (JoinClause $join) {
                $join->on('appointments.id', 'ratings.appointment_id');
                $join->where('ratings.rating', '<>', null);
            })
            ->groupBy(['lawyer_data.id'])
            ->toSql();

        $lawyers = Lawyer::fullyRegistered()
            ->addSelect(DB::raw('*'))
            ->addSelect(DB::raw('IFNULL(ratings_count, 0) AS ratings_count'))
            ->addSelect(DB::raw('IFNULL(ratings_average, 0) AS ratings_average'))
            ->leftJoin(DB::raw('(' . $dat_table . ') `lawyer_data`'), function (JoinClause $join) {
                $join->on('lawyer_data.lawyer_id', '=', 'lawyers.id');
            })
            ->whereHas('account', function ($query) use ($location) {
                if ($location === null) {
                    return $query;
                }
                return $query->where('city', $location);
            })
            ->when($practice_areas, function ($query, $areas) {
                return $query->whereIn('lawyers.id', $areas);
            })
            ->orderBy($sort[0], $sort[1])
            ->limit($length)
            ->skip($offset)
            ->get();

        if ($available_on !== null) {
            $lawyers = $lawyers->filter(function ($item) use ($available_on) {
                // Check if available on selected date
                $day = new Carbon($available_on);
                $dayIdx = $day->dayOfWeek;
                $schedule = $item->schedule;
                $slots = $schedule[$dayIdx]['slots'];
                return count($slots) > 0;
            });
        }

        // TODO: This can be cached (and should be)
        /*$lawyers = Lawyer::where('schedule', '<>', null)
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
            })->values();*/
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
        $from_date->setTime(0, 0, 0, 0);
        $to_date = new Carbon($from_date);
        $to_date->addDays($days_to_show);
        $to_date->setTime(23, 59, 59);

        $output['from'] = $from_date->format(AppointmentHelper::DATETIME_FORMAT);
        $output['number_of_days'] = $days_to_show;

        // Get appointments and pre-process them for fast checking
        $appointments = $lawyer->appointments->where('status', '<>', 'CANCELLED')->whereBetween('appointment_time', [$from_date, $to_date]);
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
                $current->setHour($start_time->hour);
                $current->setMinute($start_time->minute);

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
            'schedule.days.*.slots.*.time' => ['required', 'regex:/^[0-9]{2}:[0-9]{2}$/', 'date_format:H:i'],
            'schedule.days.*.slots.*.length' => ['required', 'IN:30,45,60,90'],

            'schedule.settings.price_per_hour' => ['required', 'numeric', 'min:0'],
            'schedule.settings.enable_discount' => ['required', 'boolean'],
            'schedule.settings.is_percent_discount' => ['exclude_if:schedule.settings.enable_discount,false', 'required', 'boolean'],
            'schedule.settings.discount_amount' => ['exclude_if:schedule.settings.enable_discount,false', 'required', 'min:0', 'numeric'],
            'schedule.settings.discount_end' => ['exclude_if:schedule.settings.enable_discount,false', 'required', 'date'],

            'schedule.settings.timezone' => ['required', 'date_format:P'],
        ]);
        /** @var Account **/
        $user = Auth::user();
        if (!$user->isLawyer()) {
            return RespondJSON::forbidden();
        }
        $lawyer = $user->lawyer;

        //$incoming_schedule = collect($request->input('schedule.days'))->map(function ($day) {
        //    $day['slots'] = collect($day['slots'])->map(function ($slot) {
        //        $slot = collect($slot);
        //        return $slot->only('time', 'length');
        //    });
        //    return $day;
        //});

        // Adjust schedule to timezone
        $week_reducer = function ($action, $day) {
            switch ($action) {
                case '+':
                    $day = ($day + 1) % 7;
                case '-':
                    $day = ($day + 6) % 7;
            }
            return $day;
        };
        $incoming_schedule = [];
        for ($i = 0; $i < 7; ++$i) {
            $incoming_schedule[$i] = ['slots' => []];
        }
        $days = $request->input('schedule.days');
        $timezone = $request->input('schedule.settings.timezone');
        for ($i = 0; $i < count($days); ++$i) {
            $slots = $days[$i]['slots'];
            for ($j = 0; $j < count($slots); ++$j) {
                $slot = $slots[$j];
                // Add timezone offset
                $time_obj = new Carbon($slot['time'], $timezone);
                $time_utc = (new Carbon($time_obj))->tz('UTC');
                $day = $i;
                if ($time_utc->format("Y-m-d") < $time_obj->format("Y-m-d")) {
                    $day = $week_reducer('-', $day);
                } else if ($time_utc->format("Y-m-d") > $time_obj->format("Y-m-d")) {
                    $day = $week_reducer('+', $day);
                }
                $time = $time_utc->format('H:i');
                $incoming_schedule[$day]['slots'][] = ['time' => $time, 'length' => $slot['length']];
            }
        }

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
        $ratings = collect($lawyer->ratings);
        $item = $lawyer->toArray();
        $item['ratings_average'] = $ratings->avg('rating') ?? 0;
        $item['ratings_count'] = $ratings->count();
        return RespondJSON::with(['lawyer' => $item]);
    }

    public function fetchMe()
    {
        /** @var Account */
        $user = Auth::user();
        if ($user->isClient()) {
            return RespondJSON::forbidden();
        }
        $ratings = collect($user->lawyer->ratings);
        $item = $user->lawyer->toArray();
        $item['ratings_average'] = $ratings->avg('rating') ?? 0;
        $item['ratings_count'] = $ratings->count();
        return RespondJSON::with(['lawyer' => $item]);
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
            'years_licenced' => ['required', 'numeric'],
            'institution' => ['required'],
            'graduation_year' => ['required', 'numeric'],
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

        // Save regulator
        $regulator = $request->get('regulator');
        $lawyer->regulator()->delete();
        $lawyer->regulator()->associate(Regulator::create(['regulator' => $regulator]));

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
            $appointments = $lawyer->appointments()->where('status', 'UPCOMING')->orderBy('appointment_time', 'asc')->get();
        } else {
            $appointments = $lawyer->appointments()->orderBy('created_at', 'desc')->get();
        }
        return RespondJSON::success(['appointments' => $appointments]);
    }

    public function fetchLawyerDoneAppointments()
    {
        /** @var Account */
        $user = Auth::user();
        if ($user->isClient()) {
            return RespondJSON::forbidden();
        }
        $lawyer = $user->lawyer;
        // Detect filters
        $appointments = $lawyer->appointments()->where('status', 'DONE')->orderBy('appointment_time', 'asc')->get();
        return RespondJSON::success(['appointments' => $appointments, 'total' => $appointments->sum('price'), 'currency_symbol' => $lawyer->currency_symbol]);
    }

    public function getStripeConnectionLink()
    {
        /** @var Account */
        $user = Auth::user();
        if (!$user->isLawyer()) {
            return RespondJSON::forbidden();
        }
        $lawyer = $user->lawyer;
        if ($lawyer->stripe_connected_account_id !== null) {
            $link = "https://connect.stripe.com";
        } else {
            // TODO Lawyer must have finished his registration
            $client_id = config('app.stripe_client_id');
            $key = config('app.key');
            $payload = array(
                "iss" => url('/'),
                "aud" => url('/'),
                "iat" => now()->unix(),
                "exp" => now()->addHours(8)->unix(),
                "sub" => $lawyer->id,
                "rea" => 'STRIPE_CONNECT_STATE'
            );
            $token = urlencode(JWT::encode($payload, $key));
            $link = "https://connect.stripe.com/express/oauth/authorize?client_id={$client_id}&state={$token}&suggested_capabilities[]=transfers&stripe_user[email]={$user->email}&stripe_user[first_name]={$user->name}&stripe_user[last_name]={$user->surname}";
        }
        return RespondJSON::success([
            'connection_link' => $link
        ]);
    }

    public function searchLawyers(JSONRequest $request)
    {
        $request->validate([
            'term' => ['required', 'string', 'min:1']
        ]);
        $char = '\\';
        $term = str_replace([$char, '%', '_'], [$char . $char, $char . '%', $char . '_'], $request->get('term'));
        $term = Str::lower($term);
        $lawyers = Lawyer::select(['lawyers.*'])->where('schedule', '<>', null)
            ->leftJoin('users', function (JoinClause $join) {
                $join->on('lawyers.user_id', '=', 'users.id');
            })
            ->whereRaw('LOWER(CONCAT_WS(\' \', users.name, users.surname)) LIKE ' . '\'%' . $term . '%\'')->get();
        return RespondJSON::success(['lawyers' => $lawyers]);
    }
}
