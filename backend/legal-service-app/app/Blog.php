<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;

class Blog extends Model
{

    protected $fillable = [
        'title',
        'body',
        'cover_photo_path'
    ];
    protected $with = ['lawyer', 'tag'];
    protected $casts = [
        'publish_date' => 'datetime'
    ];
    protected $appends = ['cover_photo_link'];

    public function lawyer()
    {
        return $this->belongsTo(Lawyer::class, 'lawyer_id');
    }

    public function tag()
    {
        return $this->belongsTo(PracticeArea::class, 'practice_area_id');
    }

    public function getCoverPhotoLinkAttribute()
    {
        if ($this->cover_photo_path === null) {
            return null;
        }
        return URL::to('/') . $this->cover_photo_path;
    }
}
