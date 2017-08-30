<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserStat extends Model
{
    public $primaryKey = 'user_id';
    
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
