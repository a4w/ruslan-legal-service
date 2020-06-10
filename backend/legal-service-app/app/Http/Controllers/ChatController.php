<?php

namespace App\Http\Controllers;

use App\Account;
use App\Http\Requests\JSONRequest;

class ChatController extends Controller
{
    public function getChat($u1, $u2, JSONRequest $request)
    {
        $user_1 = Account::find($u1);
        $user_2 = Account::find($u2);
    }
}
