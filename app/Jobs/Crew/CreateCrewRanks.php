<?php

namespace App\Jobs\Crew;

use App\Models\CrewRank;
use App\Models\CrewPermission;
use App\Traits\CrewTrait;
use Illuminate\Bus\Queueable;
use App\Classes\CrewRankClass;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

use App\Jobs\Crew\CreateCrewPermissions;

class CreateCrewRanks implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, CrewTrait;

    private $crewid;
    private $ranks;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($crewid, $ranks)
    {
        $this->crewid = $crewid;
        $this->ranks = $ranks;
    }

    public function buildRoles()
    {
        $perms = CrewPermission::all();
        $ranks = CrewRank::where('crew_id', $this->crewid)->get();
        foreach ($perms as $perm) {
            foreach ($ranks as $rank) {
                dispatch(new CreateCrewPermissions($perm->id, $rank->rank, $this->crewid));
            }
        }
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $crew = new CrewRankClass();
        $ranks = $crew->buildRanks($this->crewid, $this->ranks);

        CrewRank::insert($ranks);

        $this->buildRoles();
    }
}
