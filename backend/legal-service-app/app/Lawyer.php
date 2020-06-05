<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lawyer extends Model
{
    protected $fillable = ['biography', 'years_licenced', 'institution', 'course', 'graduation_year'];
    protected $hidden = [
        'schedule'
    ];
    public $timestamps = false;

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

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function isAvailable()
    {
        return $this->schedule !== null;
    }
}
