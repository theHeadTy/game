<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AttackLog extends Model
{
    public function user()
    {
        return $this->hasOne('App\User', 'id', 'user_id');
    }

    public function target()
    {
        return $this->hasOne('App\User', 'id', 'target_id');
    }

}
