<?php

namespace App\Http\Controllers;

use App\Account;
use App\Http\Requests\JSONRequest;

class AccountController extends Controller
{
    //
    public function resetPasswordRequest(JSONRequest $request)
    {
        // Get user to reset his password
        $user = Account::firstWhere('email', $request->get('email'));
        $user->sendPasswordResetNotification();
        return [
            'success' => true
        ];
    }
}
