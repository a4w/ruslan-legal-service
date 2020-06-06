<?php

namespace App\Http\Controllers;

use App\Account;
use App\Http\Requests\JSONRequest;
use Exception;
use Firebase\JWT\JWT;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;

class AccountController extends Controller
{
    public function resetPasswordRequest(JSONRequest $request)
    {
        // Get user to reset his password
        $user = Account::firstWhere('email', $request->get('email'));
        $user->sendPasswordResetNotification();
        return [
            'success' => true
        ];
    }

    public function resetPassword($token, JSONRequest $request)
    {
        $key = config('app.key');
        try {
            $jwt = JWT::decode($token, $key, array('HS256'));
        } catch (TokenExpiredException $e) {
            return [
                'error' => 'true',
                'message' => 'Reset token expired'
            ];
        } catch (Exception $e) {
            return [
                'error' => 'true',
                'message' => 'Error occurred'
            ];
        }
        if ($jwt->rea !== 'PASSWORD_RESET') {
            return [
                'error' => 'true',
                'message' => 'Error occurred'
            ];
        }
        $user = Account::find($jwt->sub);
        // All OK, reset password
        $user->password = $request->get('new_password');
        $user->save();
        return [
            'message' => 'Password updated successfully'
        ];
    }

    public function savePersonalInfo(JSONRequest $request)
    {
        $request->validate([
            'name' => ['required'],
            'surname' => ['required'],
            'phone' => ['required']
        ]);
        /** @var $user Account **/
        $user = Auth::user();
        $user->update($request->only(['name', 'surname', 'phone']));
        return [
            'error' => 'false',
            'message' => 'Updated successfully'
        ];
    }

    public function updateEmail(JSONRequest $request)
    {
        $request->validate([
            'email' => ['required', 'email', 'unique:users'],
        ]);
        /** @var $user Account **/
        $user = Auth::user();
        $user->update(['unverified_email' => $request->get('email')]);
        $user->sendEmailVerificationNotification();
        return [
            'error' => 'false',
            'message' => 'Updated successfully'
        ];
    }
}
