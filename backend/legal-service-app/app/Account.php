<?php

namespace App;

use App\Notifications\AccountEmailVerification;
use App\Notifications\AccountPasswordReset;
use Firebase\JWT\JWT;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Notification;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Account extends Authenticatable implements MustVerifyEmail, JWTSubject
{
    protected $table = 'users';
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'surname', 'unverified_email', 'password', 'phone', 'address', 'city', 'state', 'zip_code', 'country'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'refresh_token', 'unverified_email', 'pivot'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $appends = ['full_name'];

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
            "exp" => now()->addHours(8)->unix(),
            "sub" => $this->getKey(),
            "rea" => 'EMAIL_VERIFY'
        );
        $token = JWT::encode($payload, $key);
        $verify_url = route('verify.email', ['token' => $token]);
        Notification::route('mail', $this->getEmailForVerification())->notify(new AccountEmailVerification($verify_url));
    }

    public function sendPasswordResetNotification($token = null)
    {
        $key = config('app.key');
        $payload = array(
            "iss" => url('/'),
            "aud" => url('/'),
            "iat" => now()->unix(),
            "exp" => now()->addHours(8)->unix(),
            "sub" => $this->getKey(),
            "rea" => 'PASSWORD_RESET'
        );
        $token = JWT::encode($payload, $key);
        $reset_url = route('account.reset_password', ['token' => $token]);
        $this->notify(new AccountPasswordReset($reset_url));
    }

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    /**
     * Mark the given user's email as verified.
     *
     * @return bool
     */
    public function markEmailAsVerified()
    {
        $this->email = $this->unverified_email;
        $this->save();
        return $this->forceFill([
            'email_verified_at' => $this->freshTimestamp(),
            'unverified_email' => null
        ])->save();
    }

    public function isLawyer()
    {
        return $this->lawyer !== null;
    }

    public function isClient()
    {
        return $this->client !== null;
    }

    public function getType()
    {
        if ($this->isClient()) {
            return 'CLIENT';
        } else if ($this->isLawyer()) {
            return 'LAWYER';
        }
        return null;
    }

    /**
     * Get the email address that should be used for verification.
     *
     * @return string
     */
    public function getEmailForVerification()
    {
        return $this->unverified_email;
    }

    public function chats()
    {
        return $this->belongsToMany(Chat::class, 'chat_participents', 'user_id', 'chat_id');
    }

    public function getFullNameAttribute()
    {
        return $this->name . ' ' . $this->surname;
    }
}
