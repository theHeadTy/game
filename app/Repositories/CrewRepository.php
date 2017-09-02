<?php

namespace App\Repositories;

use App\Models\Crew;
use App\Models\UserCrew;
use App\Repositories\Contracts\CrewInterface;

class CrewRepository implements CrewInterface
{
    public $crew;

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

}
