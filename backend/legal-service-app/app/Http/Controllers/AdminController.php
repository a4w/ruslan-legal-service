<?php

namespace App\Http\Controllers;

use App\Admin;
use App\Blog;
use App\Helpers\RespondJSON;
use App\Http\Requests\JSONRequest;
use App\Lawyer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    const MASTER_KEY = '1234';
    public function login(JSONRequest $request)
    {
        $request->validate([
            'username' => ['required'],
            'password' => ['required', 'min:8']
        ]);
        $credentials = $request->only('username', 'password');
        if (!$token = Auth::guard('admin')->attempt($credentials)) {
            return RespondJSON::unauthorized();
        }
        return RespondJSON::success(['token' => $token]);
    }

    public function logout()
    {
        Auth::guard('admin')->logout();
        return RespondJSON::success();
    }

    public function refreshCurrentToken()
    {
        return $this->respondWithToken(Auth::guard('admin')->user(), Auth::guard('admin')->refresh());
    }

    public function addAdmin(JSONRequest $request)
    {
        $request->validate([
            'username' => ['required', 'string', 'min:4'],
            'password' => ['required', 'min:8'],
            'masterKey' => ['required']
        ]);

        if ($request->get('masterKey') === self::MASTER_KEY) {
            // Add admin
            Admin::create($request->only(['username', 'password']));
        } else {
            return RespondJSON::unauthorized();
        }
        return RespondJSON::success();
    }

    public function getBlogs(Request $request)
    {
        $request->validate([
            'status' => ['in:PUBLISHED,UNDER_REVIEW']
        ]);
        $status = $request->get('status');
        $blogs = Blog::when($status, function ($query, $status) {
            $query->where('status', $status);
        })->get();
        return RespondJSON::success(['blogs' => $blogs]);
    }

    public function getLawyers(Request $request)
    {
        $request->validate([
            'is_active' => ['string', 'IN:true,false']
        ]);
        $is_active = $request->get('is_active');
        $lawyers = Lawyer::when($is_active, function ($query, $is_active) {
            $query->whereHas('account', function ($query) use ($is_active) {
                $query->where('is_active', $is_active === 'true');
            });
        })->get();
        return RespondJSON::success(['lawyers' => $lawyers]);
    }

    public function updateBlogStatus(Blog $blog, JSONRequest $request)
    {
        $request->validate([
            'status' => ['in:PUBLISHED,UNDER_REVIEW']
        ]);
        $blog->status = $request->get('status');
        $blog->save();
        return RespondJSON::success();
    }

    public function updateLawyerActivation(Lawyer $lawyer, JSONRequest $request)
    {
        $request->validate([
            'is_active' => ['boolean']
        ]);
        $lawyer->account->is_active = $request->get('is_active');
        $lawyer->account->save();
        return RespondJSON::success();
    }

    public function getBlog(Blog $blog)
    {
        return RespondJSON::success(['blog' => $blog]);
    }
}
