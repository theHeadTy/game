<?php

namespace App\Repositories;

use App\Models\Crew;
use App\Models\UserCrew;
use App\Models\CrewRank;
use App\Repositories\Contracts\CrewInterface;

class CrewRepository implements CrewInterface
{
    protected $crew;

    public function __construct(Crew $crew)
    {
        $this->crew = $crew;
    }

    public function find($id)
    {
        return $this->crew->find($id);
    }

    public function users($id)
    {
        return UserCrew::with('user')
            ->with('user.stats')
            ->where('crew_id', $id)
            ->get();
    }

    public function ranks($id)
    {
        return $this->crew->find($id)->ranks;
    }

    public function permissions($id)
    {
        return $this->crew->find($id)->permissions;
    }

    public function idByLeader($id)
    {
        return $this->crew->where('user_id', $id)->value('id');
    }


}
