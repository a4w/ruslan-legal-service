<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{

    protected $fillable = [
        'title',
        'body',
        'cover_photo_path'
    ];
    protected $with = ['lawyer'];
    protected $casts = [
        'publish_date' => 'datetime'
    ];

    public function lawyer()
    {
        return $this->belongsTo(Lawyer::class, 'lawyer_id');
    }

    public function tag()
    {
        return $this->belongsTo(PracticeArea::class, 'practice_area_id');
    }
}
