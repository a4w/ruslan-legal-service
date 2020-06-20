<?php

use App\Appointment;
use App\Http\Requests\JSONRequest;
use Illuminate\Support\Facades\Route;

Route::prefix('register')->group(function () {
    Route::post('client', 'RegistrationController@registerClient');
    Route::post('lawyer', 'RegistrationController@registerLawyer');
});

Route::prefix('auth')->group(function () {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refreshCurrentToken', 'AuthController@refreshCurrentToken');
    Route::post('refresh', 'AuthController@refresh');
});

Route::prefix('account')->group(function () {
    Route::post('reset-password-request', 'AccountController@resetPasswordRequest');
    Route::post('reset-password/{token}', 'AccountController@resetPassword');
    Route::post('personal-info', 'AccountController@savePersonalInfo')->middleware('auth:api');
    Route::post('update-email', 'AccountController@updateEmail')->middleware('auth:api');
    Route::post('update-password', 'AccountController@updatePassword')->middleware('auth:api');
});

Route::prefix('lawyer')->group(function () {
    Route::get('{lawyer}', 'LawyerController@fetchLawyer');
    Route::post('{id}/schedule', 'LawyerController@fetchSchedule');
    Route::post('update-schedule', 'LawyerController@updateSchedule')->middleware('auth:api');
    Route::get('all', 'LawyerController@getLawyersPaginated');
});

Route::prefix('chat')->group(function () {
    Route::post('{account1_id}/{account2_id}', 'ChatController@getChat')->middleware('auth:api');
    Route::post('{chat}', 'ChatController@sendMessage')->middleware('auth:api');
    Route::get('{chat}', 'ChatController@getMessages')->middleware('auth:api');
});

Route::prefix('rating')->group(function () {
    Route::post('/rate/{appointment_id}', 'RatingsController@rateAppointment')->middleware('auth:api');
});

Route::prefix('appointment')->group(function () {
    Route::post('{lawyer}/select-slots', 'AppointmentController@selectSlots')->middleware('auth:api');
    Route::post('{appointment}/getRoomAccessToken', 'AppointmentController@getRoomAccessToken')->middleware('auth:api');
});





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
