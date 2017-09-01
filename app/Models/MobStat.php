<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MobStat extends Model
{
    public function mob()
    {
        return $this->belongsTo('App\Models\Mob');
    }
}
