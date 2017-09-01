<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ItemStat extends Model
{
    public function item()
    {
        return $this->belongsTo('App\Models\Item');
    }
}
