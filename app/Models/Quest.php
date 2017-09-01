<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quest extends Model
{
    public function step()
    {
        return $this->hasMany('App\Models\QuestStep');
    }

    public function mob()
    {
        return $this->belongsTo('App\Models\Mob');
    }

}
