<?php

use App\Account;
use Firebase\JWT\JWT;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

const default_app_url = 'https://testing.lawbe.co.uk/';

Route::get('verify/email/{token}', function ($token) {
    $key = config('app.key');
    $jwt = JWT::decode($token, $key, array('HS256'));
    $account = Account::find($jwt->sub);
    if (!$account->hasVerifiedEmail()) {
        $account->markEmailAsVerified();
    }
    return Redirect::to(default_app_url . 'post-verification');
})->name('verify.email');
