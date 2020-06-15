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
            'rating' => ['required', 'numeric', 'min:0', 'max:5'],
            'comment' => []
        ]);
        // Check that the user has this appointment
        /** @var Account **/
        $user = Auth::user()->client;
        $appointment = Appointment::find($appointment_id);
        $data = $request->only(['rating', 'comment']);
        $data['comment'] = $data['comment'] === null ? '' : trim($data['comment']);
        if ($user == $appointment->client) {
            // Add rating
            if ($appointment->rating === null) {
                $appointment->rating()->save(Rating::make($data));
            } else {
                $appointment->rating->update($data);
            }

            return ["error" => false];
        } else {
            return ["error" => true, "message" => "Unauthorized to rate appointment"];
        }
    }
}
