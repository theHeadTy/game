<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class QuestStep extends Model
{
    public function mob()
    {
        return $this->belongsTo('App\Mob', 'kill_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo('App\UserQuest', 'quest_id', 'quest_id');
    }

}
