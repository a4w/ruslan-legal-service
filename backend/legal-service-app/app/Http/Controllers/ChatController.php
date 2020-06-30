<?php

namespace App\Http\Controllers;

use App\Account;
use App\Chat;
use App\Helpers\RespondJSON;
use App\Http\Requests\JSONRequest;
use App\Message;
use Carbon\Carbon;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ChatController extends Controller
{
    public function getChat($u1, $u2)
    {
        $user_1 = Account::find($u1);
        $user_2 = Account::find($u2);
        $sender = Auth::user();
        if ($sender != $user_1 && $sender != $user_2) {
            return RespondJSON::forbidden();
        }
        $chat = Chat::whereHas('participants', function ($query) use ($user_1, $user_2) {
            $query->whereIn('user_id', [$user_1->id, $user_2->id]);
        }, '=', 2)->first();
        if ($chat === null) {
            // Create chat
            $chat = Chat::create();
            $chat->participants()->attach($user_1);
            $chat->participants()->attach($user_2);
        }
        return RespondJSON::with(['chat_id' => $chat->id]);
    }

    public function sendMessage(Chat $chat, JSONRequest $request)
    {
        $request->validate([
            'content' => ['required', 'min:1']
        ]);
        $user = Auth::user();
        $participants = $chat->participants;
        if (!$participants->contains($user)) {
            return RespondJSON::forbidden();
        }
        $message = Message::make($request->only('content'));
        $message->sender()->associate($user);
        $chat->messages()->save($message);
        return RespondJSON::success();
    }

    public function getMessages(Chat $chat, Request $request)
    {
        $since = $request->get('since', null);
        $user = Auth::user();
        $participants = $chat->participants;
        if (!$participants->contains($user)) {
            return RespondJSON::forbidden();
        }
        $messages = $chat->messages()
            ->select(['id', 'message_type', 'content', 'sender_id', 'created_at'])
            ->when($since, function ($query, $since) {
                $query->where('created_at', '>', new Carbon($since));
            })
            ->get();
        return RespondJSON::with(['messages' => $messages]);
    }

    public function getChats()
    {
        $user = Auth::user();
        return RespondJSON::success(['chats' => $user->chats]);
    }

    public function sendFile(Chat $chat, Request $request)
    {
        $request->validate([
            'file' => 'required|max:4096'
        ]);
        // Upload profile image
        $user = Auth::user();
        $participants = $chat->participants;
        if (!$participants->contains($user)) {
            return RespondJSON::forbidden();
        }
        $uid = Str::random(32);
        $request->file('file')->storeAS("chat_files/{$chat->id}", $uid, ['disk' => 'local']);
        $message = Message::make(['content' => json_encode([
            'uid' => $uid,
            'name' => $request->file('file')->getClientOriginalName()
        ])]);
        $message->message_type = 'FILE';
        $message->sender()->associate($user);
        $chat->messages()->save($message);
        return RespondJSON::success();
    }

    public function getChatFile($mid)
    {
        $user = Auth::user();
        $message = Message::find($mid);
        $chat = $message->chat;
        if (!$chat->participants->contains($user)) {
            return RespondJSON::forbidden();
        }
        return Storage::download("chat_files/{$chat->id}/{$message->uid}");
    }
}
