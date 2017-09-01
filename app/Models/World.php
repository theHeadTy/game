<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class World extends Model
{
    public function mobs()
    {
        return $this->hasMany('App\Models\Mobs');
    }
}
