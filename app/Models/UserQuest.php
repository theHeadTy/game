<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserQuest extends Model
{
    public function step()
    {
        return $this->hasMany('App\Models\QuestStep', 'quest_id', 'quest_id');
    }
}
