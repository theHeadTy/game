<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Mob extends Model
{
    public function stats()
    {
        return $this->hasOne('App\MobStat');
    }

    public function kills()
    {
        return $this->hasMany('App\MobKill');
    }

    public function world()
    {
        return $this->belongsTo('App\World');
    }


    //public function quest()
    //{
    //    return $this->hasMany('App\Quest');
    //}
}
