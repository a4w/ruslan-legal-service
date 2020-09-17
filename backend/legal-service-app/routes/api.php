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

    Route::post('google-login', 'AuthController@googleLogin');
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

    Route::get('notifications', 'AccountController@getNotifications')->middleware('auth:api');
    Route::get('notification/{notification}', 'AccountController@markReadNotification')->middleware('auth:api');
    Route::get('mark-read-notifications', 'AccountController@markAllAsRead')->middleware('auth:api');

    Route::get('summary', 'AccountController@getSummary')->middleware('auth:api');
});

Route::prefix('lawyer')->group(function () {
    Route::get('me', 'LawyerController@fetchMe')->middleware('auth:api');
    Route::post('me', 'LawyerController@updateProfile')->middleware('auth:api');
    Route::post('{id}/schedule', 'LawyerController@fetchSchedule');
    Route::get('schedule', 'LawyerController@getWeekSchedule')->middleware('auth:api');
    Route::post('update-schedule', 'LawyerController@updateSchedule')->middleware('auth:api');
    Route::get('all', 'LawyerController@getLawyersPaginated');
    Route::get('types', 'LawyerController@getLawyerTypes');
    Route::get('practice-areas', 'LawyerController@getPracticeAreas');
    Route::get('accreditations', 'LawyerController@getAccreditations');
    Route::get('appointments', 'LawyerController@fetchLawyerAppointments')->middleware('auth:api');
    Route::get('done-appointments', 'LawyerController@fetchLawyerDoneAppointments')->middleware('auth:api');
    Route::get('stripe-connect', 'LawyerController@getStripeConnectionLink')->middleware('auth:api');
    Route::get('search', 'LawyerController@searchLawyers');
    Route::get('{lawyer}', 'LawyerController@fetchLawyer');
});

Route::prefix('client')->group(function () {
    Route::get('appointments', 'ClientController@fetchClientAppointments')->middleware('auth:api');
});

Route::prefix('chat')->group(function () {
    Route::post('{chat}/file', 'ChatController@sendFile')->middleware('auth:api');
    Route::get('file/{mid}', 'ChatController@getChatFile')->middleware('auth:api')->name('chat.download_file');
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
    Route::get('{appointment}/get-room-access-token', 'AppointmentController@getRoomAccessToken')->middleware('auth:api');
    Route::post('{appointment}/cancel', 'AppointmentController@cancelAppointment')->middleware('auth:api');
    Route::get('{appointment}', 'AppointmentController@getAppointment')->middleware('auth:api');
});

Route::prefix('blogs')->group(function () {
    Route::get('all', 'BlogsController@getBlogs');
    Route::get('search', 'BlogsController@searchBlogs');
    Route::get('mine', 'BlogsController@getPersonalLawyerBlogs')->middleware('auth:api');
    Route::get('{blog}', 'BlogsController@getBlog');
    Route::get('/my/{blog}', 'BlogsController@getMyBlog')->middleware('auth:api');
    Route::get('/lawyer/{lawyer}', 'BlogsController@getLawyerBlogs');
    Route::post('add', 'BlogsController@addBlogPost')->middleware('auth:api');
    Route::post('edit/{blog}', 'BlogsController@editBlogPost')->middleware('auth:api');
    Route::post('{blog}/upload-cover', 'BlogsController@uploadCover')->middleware('auth:api');
    Route::get('latest/{number}', 'BlogsController@latestBlogs');
});

Route::prefix('admin')->group(function () {
    Route::post('login', 'AdminController@login');
    Route::post('logout', 'AdminController@logout')->middleware('auth:admin');
    Route::post('refresh-current-token', 'AdminController@refreshCurrentToken')->middleware('auth:admin');
    Route::post('add', 'AdminController@addAdmin')->middleware('auth:admin');
    Route::get('blogs', 'AdminController@getBlogs')->middleware('auth:admin');
    Route::get('lawyers', 'AdminController@getLawyers')->middleware('auth:admin');
    Route::get('blog/{blog}', 'AdminController@getBlog')->middleware('auth:admin');
    Route::post('blog/{blog}', 'AdminController@updateBlogStatus')->middleware('auth:admin');
    Route::post('lawyer/{lawyer}', 'AdminController@updateLawyerActivation')->middleware('auth:admin');
});


Route::prefix('webhook')->group(function () {
    Route::post('/payment-status-success', 'WebhooksController@paymentIntentSuccessListener');
});
