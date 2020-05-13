<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Accreditation extends Model
{
    protected $table = 'accreditations';
    public $timestamps = false;

    public function lawyers()
    {
        return $this->belongsToMany(Lawyer::class, 'accreditations_lawyers', 'accreditation_id', 'lawyer_id');
    }
}
