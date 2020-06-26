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

        // TODO: This can be cached (and should be)
        $lawyers = Lawyer::where('slot_length', '<>', null)
            ->limit($length)
            ->skip($offset)
            ->get();

        foreach ($lawyers as &$lawyer) {
            // Show only average rating
            $ratings = collect($lawyer['ratings']);
            $lawyer['ratings_average'] = $ratings->avg('rating') ?? 0;
            $lawyer['ratings_count'] = $ratings->count();
            unset($lawyer['ratings']);
        }
        return RespondJSON::with(['lawyers' => $lawyers]);
    }

    public function fetchSchedule($id, JSONRequest $request)
    {
        // Get lawyer
        $lawyer = Lawyer::find($id);
        if (!$lawyer->isAvailable()) {
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

        // Fetch lawyer data
        $slot_length = $lawyer->slot_length;

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
            $formated_date = $current->format(AppointmentHelper::DATE_FORMAT);
            $day = array(
                'name' => $current->dayName,
                'date' => $formated_date
            );
            $slots = $schedule[$current->dayOfWeek];
            $day['slots'] = [];
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
        $output['days'] = $data;
        $output['slot_length'] = $lawyer->slot_length;
        return RespondJSON::with(['schedule' => $output]);
    }

    public function updateSchedule(JSONRequest $request)
    {
        $request->validate([
            'schedule' => ['required', 'array', 'size:7'],
            'schedule.*.slots' => ['array'],
            'schedule.*.slots.*.time' => ['required', 'regex:/^[0-9]{2}:[0-9]{2}$/', 'date_format:H:i'],
            'schedule.*.slots.*.length' => ['required', 'IN:30,45,60,90'],
            'schedule.*.slots.*.enable_discount' => ['required', 'boolean'],
            'schedule.*.slots.*.is_percent_discount' => ['required', 'boolean'],
            'schedule.*.slots.*.discount_amount' => ['required', 'min:0', 'numeric'],
            'schedule.*.slots.*.discount_end' => ['required', 'date'],
            'schedule.*.slots.*.price' => ['required', 'numeric', 'min:0']
        ]);
        /** @var Account **/
        $user = Auth::user();
        if (!$user->isLawyer()) {
            return RespondJSON::forbidden();
        }
        $lawyer = $user->lawyer;
        $incoming_schedule = $request->get('schedule');

        // Save schedule
        $lawyer->schedule = $incoming_schedule;
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
