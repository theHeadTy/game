<?php

namespace App\Repositories;

use App\Models\Crew;
use App\Models\UserCrew;
use App\Models\CrewRank;
use App\Models\CrewInvite;
use App\Repositories\Contracts\CrewInterface;

class CrewRepository implements CrewInterface
{
    protected $crew;

    protected $invite;

    protected $users;

    public function __construct(Crew $crew, CrewInvite $invite, UserCrew $users)
    {
        $this->crew = $crew;
        $this->invite = $invite;
        $this->users = $users;
    }

    public function find($id)
    {
        return $this->crew->find($id);
    }

    public function findOrFail($id)
    {
        return $this->crew->findOrFail($id);
    }

    public function findOrFailInvite($id)
    {
        return $this->invite->find($id);
    }

    public function users($id)
    {
        return $this->users->with('user')->with('user.stats')->where('crew_id', $id)->get();
    }

    public function ranks($id)
    {
        return $this->crew->find($id)->ranks;
    }

    public function permissions($id)
    {
        return $this->find($id)->permissions;
    }

    public function idByLeader($id)
    {
        return $this->crew->where('user_id', $id)->value('id');
    }

    public function invitesWhereUserId($id)
    {
        return $this->invite->where('user_id', $id);
    }


}
