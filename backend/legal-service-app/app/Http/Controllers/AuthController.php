<?php

namespace App\Http\Controllers;

use App\Account;
use App\Http\Requests\JSONRequest;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'refresh']]);
    }

    public function login(JSONRequest $request)
    {
        $credentials = $request->only('email', 'password');
        if (!$token = auth()->attempt($credentials)) {
            return $this->respondUnauthorized();
        }
        return $this->respondWithToken($token);
    }

    public function logout()
    {
        auth()->logout();
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    public function refresh(JSONRequest $request)
    {
        $request->validate([
            'refresh_token' => ['required']
        ]);
        $refresh_token = $request->get('refresh_token');
        // Find user with this refresh token
        $user = Account::where('refresh_token', $refresh_token)->first();
        if ($user === null) {
            return $this->respondUnauthorized();
        }
        // Create new login token from $user
        $token = JWTAuth::fromUser($user);
        return $this->respondWithToken($token);
    }

    public function refreshCurrentToken()
    {
        return $this->respondWithToken(Auth::refresh());
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expires_in' => Auth::factory()->getTTL() * 60
        ]);
    }

    protected function respondUnauthorized()
    {
        return response()->json(['error' => 'Unauthorized'], 401);
    }
}
