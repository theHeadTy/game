<?php

namespace App\Repositories;

use App\Models\Raid;
use App\Repositories\Contracts\RaidInterface;

class RaidRepository implements RaidInterface
{
    protected $raid;

    public function __construct(Raid $raid)
    {
        $this->raid = $raid;
    }

    public function find($id)
    {
        return $this->raid->find($id);
    }

    public function findByMap($id)
    {
        return $this->raid->where('map_id', $id)->get();
    }
}
