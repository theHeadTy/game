<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Crew extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id', 'name', 'points', 'gold', 'description'
    ];

    protected $dates = ['deleted_at'];

    public function users()
    {
        return $this->hasMany('App\User');
    }

    public function ranks()
    {
        return $this->hasMany('App\Models\CrewRank');
    }

    public function leader()
    {
        return $this->hasOne('App\User', 'id', 'user_id');
    }
}
