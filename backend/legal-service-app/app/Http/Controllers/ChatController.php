<?php

namespace App\Http\Controllers;

use App\Account;
use App\Chat;
use App\ChatParticipent;
use App\Http\Requests\JSONRequest;

class ChatController extends Controller
{
    public function getChat($u1, $u2, JSONRequest $request)
    {
        $user_1 = Account::find($u1);
        $user_2 = Account::find($u2);
        // TODO: Check if sender is one of those
        // dump(Chat::whereIn('participents', [$user_1, $user_2])->get());
        $chat = Chat::whereHas('participents', function ($query) use ($user_1, $user_2) {
            $query->whereIn('user_id', [$user_1->id, $user_2->id]);
        }, '=', 2)->first();
        if ($chat === null) {
            // Create chat
            $chat = Chat::create();
            $p1 = ChatParticipent::make();
            $p1->account()->associate($user_1);
            $p2 = ChatParticipent::make();
            $p2->account()->associate($user_2);
            $chat->participents()->save($p1);
            $chat->participents()->save($p2);
            return $chat->id;
        } else {
            return $chat->id;
        }
    }
}
