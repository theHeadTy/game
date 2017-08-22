<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class QuestStep extends Model
{
    public function quest()
    {
        return $this->belongsTo('App\Quest');
    }
}
