<?php

namespace App\Http\Controllers;

use App\Account;
use App\Client;
use App\Http\Requests\JSONRequest;
use Illuminate\Http\Request;

class RegistrationController extends Controller
{
    public function registerClient(JSONRequest $request)
    {
        $request->validate([
            'name' => ['required'],
            'surname' => ['required'],
            'email' => ['required', 'email', 'unique:users'],
            'password' => ['required', 'min:8']
        ]);
        // Insert
        $account = Account::create($request->only('name', 'surname', 'email', 'password'));
        $account->client()->save(Client::make());

        return ['error' => false, 'message' => 'User added successfully'];
    }
}
