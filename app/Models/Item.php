<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    public function stats()
    {
        return $this->hasOne('App\Models\ItemStat');
    }

}
