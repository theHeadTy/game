<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserItem extends Model
{
    use SoftDeletes;

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];

    public function item()
    {
        return $this->belongsTo('App\Models\Item');
    }

    public function stats()
    {
        return $this->belongsTo('App\Models\ItemStat', 'item_id', 'item_id');
    }

    public function scopeFull($query)
    {
        return $query->with('item')->with('stats');
    }
}
