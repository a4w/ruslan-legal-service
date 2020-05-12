<?php

namespace App;

use App\Notifications\AccountEmailVerification;
use Firebase\JWT\JWT;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Account extends Authenticatable implements MustVerifyEmail
{
    protected $table = 'users';
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'surname', 'email', 'password', 'phone'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'refresh_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function client()
    {
        return $this->hasOne(Client::class, 'user_id');
    }

    public function lawyer()
    {
        return $this->hasOne(Lawyer::class, 'user_id');
    }


    public function sendEmailVerificationNotification()
    {
        $key = config('app.key');
        $payload = array(
            "iss" => url('/'),
            "aud" => url('/'),
            "iat" => now()->unix(),
            "exp" => now()->addDays(1)->unix(),
            "sub" => $this->getKey()
        );
        $token = JWT::encode($payload, $key);
        $verify_url = route('verify.email', ['token' => $token]);
        $this->notify(new AccountEmailVerification($verify_url));
    }
}
