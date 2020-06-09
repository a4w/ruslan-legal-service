<?php

namespace App\Http\Controllers;

use App\Account;
use App\Appointment;
use App\Http\Requests\JSONRequest;
use App\Rating;
use Illuminate\Support\Facades\Auth;

class RatingsController extends Controller
{
    public function rateAppointment(JSONRequest $request, $appointment_id)
    {
        // Validation
        $request->validate([
            'rating' => ['required', 'numeric', 'min:0', 'max:5']
        ]);
        // Check that the user has this appointment
        /** @var Account **/
        $user = Auth::user()->client;
        $appointment = Appointment::find($appointment_id);
        if ($user == $appointment->client) {
            // Add rating
            $rating = Rating::make([
                'rating' => $request->get('rating'),
                'comment' => $request->get('comment', null),
            ]);

            $appointment->rating()->save($rating);
            return ["error" => false];
        } else {
            return ["error" => true, "message" => "Unauthorized to rate appointment"];
        }
    }
}
