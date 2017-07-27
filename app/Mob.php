<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Mob extends Model
{
    public function world()
    {
        return $this->belongsTo('App\World');
    }
}
