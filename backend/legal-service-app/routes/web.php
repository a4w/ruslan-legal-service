<?php

use App\Account;
use App\Lawyer;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;
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
    if ($account->unverified_email === $jwt->email) {
        $account->markEmailAsVerified();
    }
    return redirect(config('app.frontend_url') . '/home/login');
})->name('verify.email');

Route::get('account/reset-password/{token}', function ($token) {
    return redirect(config('app.frontend_url') . '/reset/' . $token);
})->name('account.reset_password');

Route::get('account/connect-stripe-success', function (Request $request) {
    $state = $request->get('state');
    $key = config('app.key');
    try {
        $jwt = JWT::decode($state, $key, array('HS256'));
    } catch (TokenExpiredException $e) {
        return "Email verification token expired";
    } catch (Exception $e) {
        return "Error occurred";
    }
    if ($jwt->rea !== 'STRIPE_CONNECT_STATE') {
        return "Error verifying identity, please try again later";
    }
    // State is ok, get user and save it
    $lawyer = Lawyer::find($jwt->sub);
    if ($lawyer->stripe_connected_account_id !== null) {
        return "You are already connected to stripe";
    }
    try {
        $stripeResponse = \Stripe\OAuth::token([
            'grant_type' => 'authorization_code',
            'code' => $request->get('code'),
        ]);
    } catch (Exception $e) {
        return "Error verifying identity, please try again later";
    }
    $connected_account_id = $stripeResponse->stripe_user_id;
    $lawyer->stripe_connected_account_id = $connected_account_id;
    $lawyer->save();
    // Redirect to dashboard
    return redirect(config('app.frontend_url') . '/dashboard');
});
