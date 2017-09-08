<?php
namespace App\Repositories;

use Carbon\Carbon;
use App\Models\Raid;
use App\Models\RaidLog;
use App\Models\RaidCrew;
use App\Models\RaidUser;
use App\Repositories\Contracts\RaidInterface;

class RaidRepository implements RaidInterface
{
    protected $raid;
    protected $crew;
    protected $users;
    protected $log;

    public function __construct(Raid $raid, RaidCrew $crew, RaidUser $users, RaidLog $log)
    {
        $this->raid = $raid;
        $this->crew = $crew;
        $this->users = $users;
        $this->log = $log;
    }

    public function find($id)
    {
        return $this->raid->find($id);
    }

    public function findRaidCrew($id)
    {
        return $this->crew->find($id);
    }

    public function findByMap($id)
    {
        return $this->raid->where('map_id', $id)->get();
    }

    public function hasLaunched($id, $crewid)
    {
        return $this->log->where('raids_crew_id', $id)->where('crew_id', $crewid)->exists();
    }

    public function raidUsers($id, $crewid)
    {
        return $this->users->where('raid_id', $id)->where('crew_id', $crewid)->get();
    }

    public function crewInRaid($id)
    {
        return $this->crew
            ->where('crew_id', $id)
            ->where('launch_at', '>', Carbon::now())
            ->count();
    }

    public function userInRaid($id, $userid)
    {
        return $this->users->where('raid_id', $id)->where('user_id', $userid)->exists();
    }
}
