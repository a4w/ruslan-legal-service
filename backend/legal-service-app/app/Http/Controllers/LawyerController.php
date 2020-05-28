<?php

namespace App\Http\Controllers;

use App\Lawyer;
use Illuminate\Http\Request;

class LawyerController extends Controller
{
    public function getLawyersPaginated(Request $request)
    {
        $offset = $request->get('offset', 0);
        $length = (int) $request->get('length', 10);
        $sortBy = $request->get('sortBy', 'name');
        return Lawyer::paginate($length);
    }
}
