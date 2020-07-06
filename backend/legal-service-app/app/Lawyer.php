<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Lawyer extends Model
{
    protected $fillable = ['biography', 'years_licenced', 'institution', 'course', 'graduation_year'];
    protected $with = ['account', 'lawyer_type', 'regulator', 'accreditations', 'practice_areas', 'ratings'];
    protected $hidden = [
        'schedule'
    ];

    protected $casts = [
        'schedule' => 'json',
        'is_percent_discount' => 'bool',
        'discount_end' => 'datetime'
    ];

    public $timestamps = false;
    protected $appends = array('discount_ends_in', 'discounted_price_per_hour', 'currency_symbol');

    public function getDiscountEndsInAttribute()
    {
        $end_date = $this->discount_end;
        if ($end_date === null) {
            return null;
        }
        return $end_date->gt(now()) ? $end_date->diffInMilliseconds(now()) : 0;
    }

    public function getDiscountedPricePerHourAttribute()
    {
        $original_price = $this->price_per_hour;
        $discounted_price = $original_price;
        if (Carbon::now()->lte($this->discount_end)) {
            if ($this->is_percent_discount) {
                $discounted_price -= $this->discount / 100 * $original_price;
            } else {
                $discounted_price -= $this->discount;
            }
        }
        return $discounted_price;
    }

    public function account()
    {
        return $this->belongsTo(Account::class, 'user_id');
    }

    public function lawyer_type()
    {
        return $this->belongsTo(LawyerType::class, 'lawyer_type_id', 'id');
    }

    public function regulator()
    {
        return $this->belongsTo(Regulator::class, 'regulator_id');
    }

    public function accreditations()
    {
        return $this->belongsToMany(Accreditation::class, 'accreditations_lawyers', 'lawyer_id', 'accreditation_id');
    }

    public function practice_areas()
    {
        return $this->belongsToMany(PracticeArea::class, 'lawyers_practice_areas', 'lawyer_id', 'practice_area_id');
    }

    public function ratings()
    {
        return $this->hasManyThrough(Rating::class, Appointment::class);
    }

    public function blogs()
    {
        return $this->hasMany(Blog::class, 'lawyer_id');
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function isAvailable()
    {
        return $this->schedule !== null;
    }

    public function getCurrencySymbolAttribute()
    {
        return config('app.currency_symbol');
    }
}
