<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ItemStat extends Model
{
    public function item()
    {
        return $this->belongsTo('App\Item');
    }
}
