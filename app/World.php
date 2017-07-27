<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class World extends Model
{
    public function mobs()
    {
        return $this->hasMany('App\Mobs');
    }
}
