<?php

use App\Appointment;
use App\Http\Requests\JSONRequest;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/register/client', 'RegistrationController@registerClient');
Route::post('/register/lawyer', 'RegistrationController@registerLawyer');
Route::post('/lawyer/{id}/schedule', 'LawyerController@fetchSchedule');

Route::prefix('auth')->group(function () {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refreshCurrentToken', 'AuthController@refreshCurrentToken');
    Route::post('refresh', 'AuthController@refresh');
});

Route::get('/lawyers', 'LawyerController@getLawyersPaginated');

Route::post('/account/reset-password-request', 'AccountController@resetPasswordRequest');
Route::post('/account/reset-password/{token}', 'AccountController@resetPassword');

Route::post('/account/personal-info', 'AccountController@savePersonalInfo')->middleware('auth:api');
Route::post('/account/update-email', 'AccountController@updateEmail')->middleware('auth:api');
Route::post('/account/update-password', 'AccountController@updatePassword')->middleware('auth:api');
Route::post('/rate/{appointment_id}', 'RatingsController@rateAppointment')->middleware('auth:api');

Route::post('/lawyer/update-schedule', 'LawyerController@updateSchedule')->middleware('auth:api');
Route::get('lawyer/{lawyer}', 'LawyerController@fetchLawyer');
Route::post('/chat/{account1_id}/{account2_id}', 'ChatController@getChat')->middleware('auth:api');
Route::post('/chat/{chat}', 'ChatController@sendMessage')->middleware('auth:api');
Route::get('/chat/{chat}', 'ChatController@getMessages')->middleware('auth:api');
Route::post('/appointment/{lawyer}/select-slots', 'AppointmentController@selectSlots')->middleware('auth:api');
Route::post('/appointment/{appointment}/getRoomAccessToken', 'AppointmentController@selectSlots')->middleware('auth:api');

Route::post('/payment-status-webhook', function (JSONRequest $request) {
    $intent_id = $request->input('data.object.id');
    $amount = $request->input('data.object.amount');
    $currency = $request->input('data.object.currency');
    $status = $request->input('data.object.status');
    $type = $request->input('type');
    if ($type !== 'payment_intent.succeeded' || $currency !== 'gbp' || $status !== 'succeeded') {
        return;
    }
    // Find appointments associated with this intent
    $appointments = Appointment::where('payment_intent_id', $intent_id)->get();
    // Verify amount
    $total = 0;
    foreach ($appointments as $appointment) {
        $total += $appointment->price;
    }
    $total *= 100;
    if ($amount !== $total) {
        return;
    }
    // Now all is good, update appointment status
    foreach ($appointment as $appointment) {
        $appointment->status = 'UPCOMING';
        $appointment->save();
    }
});
