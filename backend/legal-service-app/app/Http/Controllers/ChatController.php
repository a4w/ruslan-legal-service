<?php

namespace App\Http\Controllers;

use App\Account;
use App\Chat;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function getChat($u1, $u2)
    {
        $user_1 = Account::find($u1);
        $user_2 = Account::find($u2);
        $sender = Auth::user();
        if ($sender != $user_1 && $sender != $user_2) {
            return [
                'error' => true,
                'message' => 'unauthorized'
            ];
        }
        $chat = Chat::whereHas('participents', function ($query) use ($user_1, $user_2) {
            $query->whereIn('user_id', [$user_1->id, $user_2->id]);
        }, '=', 2)->first();
        if ($chat === null) {
            // Create chat
            $chat = Chat::create();
            $chat->participents()->attach($user_1);
            $chat->participents()->attach($user_2);
            return $chat->id;
        } else {
            return $chat->id;
        }
    }
}
