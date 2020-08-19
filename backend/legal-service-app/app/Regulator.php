<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Regulator extends Model
{
    protected $table = 'regulators';
    public $timestamps = false;

    protected $fillable = ['regulator'];

    public function lawyers()
    {
        return $this->hasMany(Lawyer::class, 'regulator_id');
    }
}
