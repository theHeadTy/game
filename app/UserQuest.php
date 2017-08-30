<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserQuest extends Model
{
    public function step()
    {
        return $this->hasMany('App\QuestStep', 'quest_id', 'quest_id');
    }
}
