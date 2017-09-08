<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RaidCrew extends Model
{
    use SoftDeletes;

    protected $dates = ['deleted_at'];
    
    public function raid()
    {
        return $this->hasOne('App\Models\Raid', 'id', 'raid_id');
    }

    public function users()
    {
        return $this->hasMany('App\Models\RaidUser', 'id', 'raid_id');
    }

}
