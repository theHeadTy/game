<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuestStep extends Model
{
    public function mob()
    {
        return $this->belongsTo('App\Models\Mob', 'kill_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo('App\Models\UserQuest', 'quest_id', 'quest_id');
    }

}
