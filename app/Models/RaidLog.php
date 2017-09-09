<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RaidLog extends Model
{
    use SoftDeletes;

    protected $dates = ['deleted_at'];

    public function raid()
    {
        return $this->hasOne('App\Models\Raid', 'id', 'raid_id');
    }

}
