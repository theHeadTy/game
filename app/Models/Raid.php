<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Raid extends Model
{

    public function stats()
    {
        return $this->hasOne('App\Models\RaidStat');
    }

}
