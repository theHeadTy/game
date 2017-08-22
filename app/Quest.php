<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Quest extends Model
{
    public function step()
    {
        return $this->hasMany('App\QuestStep');
    }

    public function mob()
    {
        return $this->belongsTo('App\Mob');
    }

}
