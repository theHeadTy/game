<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AttackLog extends Model
{
    public function user()
    {
        return $this->hasOne('App\User', 'user_id');
    }

    public function target()
    {
        return $this->hasOne('App\User', 'target_id', 'user_id');
    }
}
