<?php

namespace App\Http\Controllers;

use App\Account;
use App\Client;
use App\Helpers\RespondJSON;
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
        $data = $request->only('name', 'surname', 'email', 'password', 'phone');
        $data['unverified_email'] = $data['email'];
        unset($data['email']);
        // Insert
        $account = Account::create($data);
        $account->client()->save(Client::make());
        event(new Registered($account));
        return RespondJSON::success();
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
        return RespondJSON::success();
    }
}
