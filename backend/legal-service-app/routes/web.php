<?php

use App\Account;
use Firebase\JWT\JWT;
use Illuminate\Notifications\Messages\MailMessage;
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

Route::get('/', function () {
    return view('welcome');
});
Route::get('/test', function () {
    return (new MailMessage)->markdown('emails.account.emailverification');
});
Route::get('verify/email/{token}', function ($token) {
    $key = env('APP_KEY');
    $jwt = JWT::decode($token, $key, array('HS256'));
    $account = Account::find($jwt->sub);
    if (!$account->hasVerifiedEmail()) {
        $account->markEmailAsVerified();
    }
    return redirect('/');
})->name('verify.email');
