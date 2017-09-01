<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserAttack extends Model
{
    public function scopeCreateAttack($query, $slug, $userid, $targetid)
    {
        return $query->where('slug', $slug)
            ->where('user_id', $userid)
            ->where('target_id', $targetid)
            ->where('completed', 0);
    }
}
