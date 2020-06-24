<?php

namespace App\Http\Controllers;

use App\Account;
use App\Appointment;
use App\Helpers\RespondJSON;
use App\Http\Requests\JSONRequest;
use App\Lawyer;
use App\Rating;
use Illuminate\Support\Facades\Auth;

class RatingsController extends Controller
{
    public function rateAppointment(JSONRequest $request, Appointment $appointment)
    {
        // Validation
        $request->validate([
            'rating' => ['required', 'numeric', 'min:0', 'max:5'],
            'comment' => []
        ]);
        // Check that the user has this appointment
        /** @var Account **/
        $user = Auth::user()->client;
        $data = $request->only(['rating', 'comment']);
        $data['comment'] = $data['comment'] === null ? '' : trim($data['comment']);
        dump($appointment->rating);
        if ($user == $appointment->client) {
            // Add rating
            if ($appointment->rating === null) {
                $appointment->rating()->save(Rating::make($data));
            } else {
                $appointment->rating->update($data);
            }
            return RespondJSON::success();
        } else {
            return RespondJSON::forbidden();
        }
    }

    public function getLawyerRatings(Lawyer $lawyer)
    {
        $ratings = $lawyer->ratings;
        return RespondJSON::success(['ratings' => $ratings]);
    }
}
