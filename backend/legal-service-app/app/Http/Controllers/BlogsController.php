<?php

namespace App\Http\Controllers;

use App\Blog;
use App\Helpers\RespondJSON;
use App\Http\Requests\JSONRequest;
use App\PracticeArea;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BlogsController extends Controller
{
    public function getBlogs()
    {
        $blogs = Blog::all();
        return RespondJSON::success(['blogs' => $blogs]);
    }

    public function getLawyerBlogs(Lawyer $lawyer)
    {
        $blogs = $lawyer->blogs;
        return RespondJSON::success(['blogs' => $blogs]);
    }

    public function addBlogPost(JSONRequest $request)
    {
        $request->validate([
            'title' => ['required', 'max:255'],
            'body' => ['required'],
            'tag_id' => ['required', 'exists:practice_areas,id']
        ]);
        /** @var Account */
        $user = Auth::user();
        if (!$user->isLawyer()) {
            return RespondJSON::forbidden();
        }
        $lawyer = $user->lawyer;
        $blog = Blog::make($request->only(['title', 'body']));
        $blog->cover_photo_path = null;
        $practice_area = PracticeArea::find($request->get('tag_id'));
        $blog->tag()->associate($practice_area);
        $blog->lawyer()->associate($lawyer);
        $blog->save();
    }
}
