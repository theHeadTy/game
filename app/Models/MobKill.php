<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class MobKill extends Model
{
    public function scopeIsDead($query, $userid, $mobid)
    {
        return $query->where('user_id', $userid)
            ->where('mob_id', $mobid)
            ->where('spawn_at', '>', Carbon::now());
    }
}
