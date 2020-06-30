<?php

namespace App\Http\Controllers;

use App\Blog;
use App\Helpers\RespondJSON;
use Illuminate\Http\Request;

class BlogsController extends Controller
{
    public function getBlogs()
    {
        $blogs = Blog::all();
        return RespondJSON::success(['blogs' => $blogs]);
    }
}
