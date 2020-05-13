<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PracticeArea extends Model
{
    protected $table = 'practice_areas';
    public $timestamps = false;

    public function lawyers()
    {
        return $this->belongsToMany(Lawyer::class, 'lawyers_practice_areas', 'practice_area_id', 'lawyer_id');
    }
}
