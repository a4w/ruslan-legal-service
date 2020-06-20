<?php

namespace App\Http\Controllers;

use App\Account;
use App\Client;
use App\Http\Requests\JSONRequest;
use App\Lawyer;
use Illuminate\Auth\Events\Registered;
use Symfony\Component\HttpFoundation\Response;

class RegistrationController extends Controller
{
    public function registerClient(JSONRequest $request)
    {
        $request->validate([
            'name' => ['required'],
            'surname' => ['required'],
            'email' => ['required', 'email', 'unique:users'],
            'password' => ['required', 'min:8'],
            'phone' => ['required']
        ]);
        $data = $request->only('name', 'surname', 'email', 'password', 'phone');
        $data['unverified_email'] = $data['email'];
        unset($data['email']);
        // Insert
        $account = Account::create($data);
        $account->client()->save(Client::make());
        event(new Registered($account));
        return response()->json([
            'error' => false,
            'message' => 'User added successfully'
        ], 200);
    }

    public function registerLawyer(JSONRequest $request)
    {
        $request->validate([
            'name' => ['required'],
            'surname' => ['required'],
            'email' => ['required', 'email', 'unique:users'],
            'password' => ['required', 'min:8'],
            'phone' => ['required']
        ]);
        $data = $request->only('name', 'surname', 'email', 'password', 'phone');
        $data['unverified_email'] = $data['email'];
        unset($data['email']);
        // Insert
        $account = Account::create($data);
        $account->lawyer()->save(Lawyer::make());
        event(new Registered($account));

        return response()->json([
            'error' => false,
            'message' => 'User added successfully'
        ], 200);
    }
}
