<?php

namespace App\Http\Controllers;

use App\Blog;
use App\Helpers\RespondJSON;
use App\Http\Requests\JSONRequest;
use App\Lawyer;
use App\PracticeArea;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

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
        return RespondJSON::success(['blog' => $blog]);
    }

    public function uploadCover(Request $request, Blog $blog)
    {
        $request->validate([
            'cover_photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);
        /** @var Account */
        $user = Auth::user();
        if (!$user->isLawyer()) {
            return RespondJSON::forbidden();
        }
        $path = $request->file('cover_photo')->store('blog_covers', ['disk' => 'public']);
        $blog->cover_photo_path = Storage::url($path);
        $blog->save();
        return RespondJSON::success(['blog' => $blog]);
    }

    public function getBlog(Blog $blog)
    {
        if ($blog->status !== 'PUBLISHED') {
            return RespondJSON::notFound();
        }
        return RespondJSON::success(['blog' => $blog]);
    }
}
