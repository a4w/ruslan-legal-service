<?php

namespace App\Http\Controllers;

use App\Helpers\RespondJSON;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClientController extends Controller
{
    public function fetchClientAppointments(Request $request)
    {
        /** @var Account */
        $user = Auth::user();
        if ($user->isLawyer()) {
            return RespondJSON::forbidden();
        }
        $client = $user->client;
        // Detect filters
        $upcoming = $request->get('upcoming', "false") === "true";
        if ($upcoming) {
            $appointments = $client->appointments()->where('status', 'UPCOMING')->orderBy('appointment_time', 'asc')->get();
        } else {
            $appointments = $client->appointments()->orderBy('appointment_time', 'asc')->get();
        }
        return RespondJSON::success(['appointments' => $appointments]);
    }
}
