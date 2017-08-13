<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    public function stats()
    {
        return $this->hasOne('App\ItemStat');
    }

}
