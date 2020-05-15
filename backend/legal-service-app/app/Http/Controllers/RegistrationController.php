<?php

namespace App\Http\Controllers;

use App\Account;
use App\Client;
use App\Http\Requests\JSONRequest;
use App\Lawyer;
use Illuminate\Auth\Events\Registered;

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
        // Insert
        $account = Account::create($request->only('name', 'surname', 'email', 'password', 'phone'));
        $account->client()->save(Client::make());
        event(new Registered($account));
        return ['error' => false, 'message' => 'User added successfully'];
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
        // Insert
        $account = Account::create($request->only('name', 'surname', 'email', 'password', 'phone'));
        $account->lawyer()->save(Lawyer::make());
        event(new Registered($account));

        return ['error' => false, 'message' => 'User added successfully'];
    }
}
