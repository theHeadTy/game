<?php

namespace App\Jobs\Crew;

use Auth;
use App\Models\Crew;
use Illuminate\Bus\Queueable;
use App\Models\CrewRankPermission;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class CreateCrewPermissions implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $permid;

    private $rankid;

    private $crewid;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($permid, $rankid, $crewid)
    {
        $this->permid = $permid;
        $this->rankid = $rankid;
        $this->crewid = $crewid;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(Crew $crew)
    {
        $crew = $crew->find($this->crewid);

        $perm = new CrewRankPermission;
        $perm->perm_id = $this->permid;
        $perm->crew_id = $this->crewid;
        $perm->rank_id = $this->rankid;
        $perm->auth = ($crew->user_id === Auth::id()) ? true : false;
        $perm->save();
    }
}
