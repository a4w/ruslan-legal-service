<?php

use App\Account;
use Firebase\JWT\JWT;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Route;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;

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
    $key = config('app.key');
    try {
        $jwt = JWT::decode($token, $key, array('HS256'));
    } catch (TokenExpiredException $e) {
        return "Email verification token expired";
    } catch (Exception $e) {
        return redirect('/');
    }
    if ($jwt->rea !== 'EMAIL_VERIFY') {
        return redirect('/');
    }
    $account = Account::find($jwt->sub);
    if ($account === null) {
        return redirect('/');
    }
    // TODO: Check email to be verified
    $account->markEmailAsVerified();
    return "Email verified correctly"; // TODO Create post verification page
})->name('verify.email');

Route::get('account/reset-password/{token}', function ($token) {
    // TODO: Redirect to correct page
    redirect('/' . $token);
})->name('account.reset_password');
