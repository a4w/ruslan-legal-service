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
    public function getBlogs(Request $request)
    {
        $tag = $request->get('tag');
        $blogs = Blog::where('status', 'PUBLISHED')
            ->when($tag, function ($query, $tag) {
                $query->whereHas('tag', function ($query) use ($tag) {
                    $query->where('id', $tag);
                });
            })->get();
        return RespondJSON::success(['blogs' => $blogs]);
    }

    public function getLawyerBlogs(Lawyer $lawyer)
    {

        $blogs = $lawyer->blogs()->where('status', 'PUBLISHED')->get();
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

    public function editBlogPost(JSONRequest $request, Blog $blog)
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
        /** @var Lawyer */
        $lawyer = $user->lawyer;
        if (!$lawyer->blogs->contains($blog)) {
            return RespondJSON::notFound();
        }
        $blog->update($request->only(['title', 'body']));
        $practice_area = PracticeArea::find($request->get('tag_id'));
        $blog->tag()->associate($practice_area);
        // Update status to under review
        $blog->status = "UNDER_REVIEW";
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

    public function getMyBlog(Blog $blog)
    {
        if ($blog->lawyer->is(Auth::user()->lawyer)) {
            return RespondJSON::success(['blog' => $blog]);
        } else {
            return RespondJSON::notFound();
        }
    }

    public function latestBlogs($number)
    {
        $number = (int) $number;
        $blogs = Blog::where('status', 'PUBLISHED')->limit($number)->orderBy('publish_date', 'DESC')->get();
        return RespondJSON::success(['blogs' => $blogs]);
    }

    public function searchBlogs(Request $request)
    {
        $request->validate([
            'term' => ['required', 'string', 'min:1']
        ]);
        $char = '\\';
        $term = str_replace([$char, '%', '_'], [$char . $char, $char . '%', $char . '_'], $request->get('term'));
        $blogs = Blog::where('status', 'PUBLISHED')->where('title', 'LIKE', '%' . $term . '%')->get();
        return RespondJSON::success(['blogs' => $blogs]);
    }
}
