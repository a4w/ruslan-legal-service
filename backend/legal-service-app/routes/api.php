<?php

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

Route::post('/appointment/{lawyer}/select-slots', 'AppointmentController@selectSlots');
Route::post('/lawyer/update-schedule', 'LawyerController@updateSchedule')->middleware('auth:api');
