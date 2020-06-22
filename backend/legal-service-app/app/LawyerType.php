<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LawyerType extends Model
{
    protected $table = 'lawyer_types';
    public $timestamps = false;
    protected $fillable = ['type'];

    public function lawyers()
    {
        return $this->hasMany(Lawyer::class, 'lawyer_type_id');
    }
}
