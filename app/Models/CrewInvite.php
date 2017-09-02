<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CrewInvite extends Model
{
    use SoftDeletes;

    protected $dates = ['deleted_at'];

    public function crew()
    {
        return $this->hasOne('App\Models\Crew', 'id', 'crew_id');
    }
}
