<?php

namespace App\Http\Controllers;

use App\Account;
use App\Client;
use App\Helpers\RespondJSON;
use App\Http\Requests\JSONRequest;
use Exception;
use Firebase\JWT\JWT;
use Google_Client;
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
            return RespondJSON::unauthorized();
        }
        $refresh_token = null;
        if ($request->get('refresh_token') === true) {
            // Create refresh_token
            $key = config('app.key');
            $payload = array(
                "iss" => url('/'),
                "aud" => url('/'),
                "iat" => now()->unix(),
                "exp" => now()->addMonths(1)->unix(),
                "sub" =>  auth()->user()->getAuthIdentifier(),
                "rea" => 'REFRESH_TOKEN'
            );
            $refresh_token = JWT::encode($payload, $key);
        }
        return $this->respondWithToken($token, $refresh_token);
    }

    public function logout()
    {
        auth()->logout();
        return RespondJSON::success();
    }

    public function refresh(JSONRequest $request)
    {
        $request->validate([
            'refresh_token' => ['required']
        ]);
        $refresh_token = $request->get('refresh_token');
        // Find user with this refresh token
        $key = config('app.key');
        try {
            $jwt = JWT::decode($refresh_token, $key, array('HS256'));
        } catch (Exception $e) {
            return RespondJSON::unauthorized();
        }
        $user = Account::find($jwt->sub);
        if ($user === null) {
            return RespondJSON::unauthorized();
        }
        // Create new login token from $user
        $token = JWTAuth::fromUser($user);
        return $this->respondWithToken($token);
    }

    public function refreshCurrentToken()
    {
        return $this->respondWithToken(Auth::refresh());
    }

    protected function respondWithToken($token, $refresh_token = null)
    {
        $response = [
            'access_token' => $token,
            'token_type' => 'Bearer'
        ];
        if ($refresh_token !== null) {
            $response += [
                'refresh_token' => $refresh_token
            ];
        }
        return RespondJSON::with($response);
    }

    public function googleLogin(JSONRequest $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
            'id_token' => ['required']
        ]);

        $email = $request->get('email');
        $client = new Google_Client(['client_id' => config('app.google_client_id')]);  // Specify the CLIENT_ID of the app that accesses the backend
        $payload = $client->verifyIdToken($request->get('id_token'));
        if ($payload) {
            // Check if registered
            $user = Account::where('email', $email)->find();
            if ($user === null) {
                // Create account
                $account = Account::create($request->only(['name', 'surname', 'email']));
                $account->client()->save(Client::make());
                return $this->respondWithToken(Auth::login($account));
            } else {
                // login
                return $this->respondWithToken(Auth::login($user));
            }
        } else {
            return RespondJSON::unauthorized();
        }
    }
}
