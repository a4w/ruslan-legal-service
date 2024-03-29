<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Stripe\Stripe;
use Twilio\Rest\Client;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $twilio_client = new Client(config('app.twilio_account_sid'), config('app.twilio_auth_token'));
        $this->app->instance('Twilio\Rest\Client', $twilio_client);
        Stripe::setApiKey(config('app.stripe_api_key'));
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
    }
}
