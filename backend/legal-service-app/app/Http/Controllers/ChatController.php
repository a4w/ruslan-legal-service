<?php

namespace App\Http\Controllers;

use App\Account;
use App\Chat;
use App\ChatParticipent;
use App\Http\Requests\JSONRequest;
use App\Message;
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

    public function sendMessage(Chat $chat, JSONRequest $request)
    {
        $request->validate([
            'content' => ['required', 'min:1']
        ]);
        $user = Auth::user();
        $participents = $chat->participents;
        if (!$participents->contains($user)) {
            return [
                'error' => true,
                'message' => 'unauthorized'
            ];
        }
        $message = Message::make($request->only('content'));
        $message->sender()->associate($user);
        $chat->messages()->save($message);
    }
}
