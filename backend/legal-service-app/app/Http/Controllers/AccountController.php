<?php

namespace App\Http\Controllers;

use App\Account;
use App\Helpers\RespondJSON;
use App\Http\Requests\JSONRequest;
use Exception;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;

class AccountController extends Controller
{
    public function resetPasswordRequest(JSONRequest $request)
    {
        // Get user to reset his password
        $user = Account::firstWhere('email', $request->get('email'));
        $user->sendPasswordResetNotification();
        return RespondJSON::success();
    }

    public function resetPassword($token, JSONRequest $request)
    {
        $key = config('app.key');
        try {
            $jwt = JWT::decode($token, $key, array('HS256'));
        } catch (TokenExpiredException $e) {
            return RespondJSON::tokenExpired();
        } catch (Exception $e) {
            return RespondJSON::unknownError();
        }
        if ($jwt->rea !== 'PASSWORD_RESET') {
            return RespondJSON::unknownError();
        }
        $user = Account::find($jwt->sub);
        // All OK, reset password
        $user->password = $request->get('new_password');
        $user->save();
        return RespondJSON::success();
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
        return RespondJSON::success();
    }

    public function uploadProfilePicture(Request $request)
    {
        $request->validate([
            'profile_picture' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);
        // Upload profile image
        $path = $request->file('profile_picture')->store('profile_pictures', ['disk' => 'public']);
        $user = Auth::user();
        $user->profile_picture = URL::to('/') . Storage::url($path);
        $user->save();
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
        return RespondJSON::success();
    }

    public function updatePassword(JSONRequest $request)
    {
        $request->validate([
            'new_password' => ['required', 'min:8'],
            'old_password' => ['required', 'min:8'],
        ]);
        $user = Auth::user();
        if (!Auth::validate(['email' => $user->email, 'password' => $request->get('old_password')])) {
            return RespondJSON::unauthorized();
        }
        $user->password = $request->get('new_password');
        $user->save();
        return RespondJSON::success();
    }

    public function getPersonalInfo()
    {
        $user = Auth::user();
        return RespondJSON::success([
            'profile_data' => $user
        ]);
    }
}
