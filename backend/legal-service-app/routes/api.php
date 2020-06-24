<?php

use Illuminate\Support\Facades\Route;

Route::prefix('register')->group(function () {
    Route::post('client', 'RegistrationController@registerClient');
    Route::post('lawyer', 'RegistrationController@registerLawyer');
});

Route::prefix('auth')->group(function () {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh-current-token', 'AuthController@refreshCurrentToken');
    Route::post('refresh', 'AuthController@refresh');
});

Route::prefix('account')->group(function () {
    Route::post('reset-password-request', 'AccountController@resetPasswordRequest');
    Route::post('reset-password/{token}', 'AccountController@resetPassword');
    Route::post('personal-info', 'AccountController@savePersonalInfo')->middleware('auth:api');
    Route::get('personal-info', 'AccountController@getPersonalInfo')->middleware('auth:api');
    Route::post('update-email', 'AccountController@updateEmail')->middleware('auth:api');
    Route::post('update-password', 'AccountController@updatePassword')->middleware('auth:api');
    Route::post('upload-profile-picture', 'AccountController@uploadProfilePicture')->middleware('auth:api');
    Route::post('update-address', 'AccountController@saveAddress')->middleware('auth:api');
});

Route::prefix('lawyer')->group(function () {
    Route::get('all', 'LawyerController@getLawyersPaginated');
    Route::post('{id}/schedule', 'LawyerController@fetchSchedule');
    Route::post('update-schedule', 'LawyerController@updateSchedule')->middleware('auth:api');
    Route::get('appointments', 'LawyerController@fetchLawyerAppointments')->middleware('auth:api');
    Route::get('{lawyer}', 'LawyerController@fetchLawyer');
});

Route::prefix('chat')->group(function () {
    Route::post('{account1_id}/{account2_id}', 'ChatController@getChat')->middleware('auth:api');
    Route::get('all', 'ChatController@getChats')->middleware('auth:api');
    Route::post('{chat}', 'ChatController@sendMessage')->middleware('auth:api');
    Route::get('{chat}', 'ChatController@getMessages')->middleware('auth:api');
});

Route::prefix('rating')->group(function () {
    Route::post('/rate/{appointment}', 'RatingsController@rateAppointment')->middleware('auth:api');
    Route::get('{lawyer}', 'RatingsController@getLawyerRatings');
});

Route::prefix('appointment')->group(function () {
    Route::post('{lawyer}/select-slots', 'AppointmentController@selectSlots')->middleware('auth:api');
    Route::post('{appointment}/get-room-access-token', 'AppointmentController@getRoomAccessToken')->middleware('auth:api');
});

Route::prefix('webhook')->group(function () {
    Route::post('/payment-status-success', 'WebhooksController@paymentIntentSuccessListener');
});
