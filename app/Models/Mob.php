<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mob extends Model
{
    public function stats()
    {
        return $this->hasOne('App\Models\MobStat');
    }

    public function kill()
    {
        return $this->hasOne('App\Models\MobKill', 'mob_id', 'id');
    }

    public function kills()
    {
        return $this->hasMany('App\Models\MobKill');
    }


    public function world()
    {
        return $this->belongsTo('App\Models\World');
    }

}
