<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MobStat extends Model
{
    public function mob()
    {
        return $this->belongsTo('App\Mob');
    }
}
