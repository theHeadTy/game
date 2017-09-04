<?php

namespace App\Jobs\Crew;

use Auth;
use App\Models\Crew;
use App\Models\CrewPermission;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class CreateCrewPermission implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * @var $crewid - Crew id
     */
    private $crewid;
    /**
     * @var $id - Rank id
     */
    private $rankid;
    /**
     * @var $name - Rank name
     */
    private $name;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($crewid, $rankid, $name)
    {
        $this->crewid = $crewid;
        $this->rankid = $rankid;
        $this->name = $name;
    }

    private function isAdmin(Crew $crew): bool
    {
        $leader = $crew->find($this->crewid)->value('user_id');
        return ((int) $leader === (int) Auth::id()) ? true : false;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(Crew $crew)
    {
        $perm = new CrewPermission;
        $perm->crew_id = $this->crewid;
        $perm->rank_id = $this->rankid;
        $perm->rank_name = $this->name;
        $perm->edit = $this->isAdmin($crew);
        $perm->boot = $this->isAdmin($crew);
        $perm->invites = $this->isAdmin($crew);
        $perm->hitlist = $this->isAdmin($crew);
        $perm->ranks = $this->isAdmin($crew);
        $perm->bank = $this->isAdmin($crew);
        $perm->raids = $this->isAdmin($crew);
        $perm->vault = $this->isAdmin($crew);
        $perm->shop = $this->isAdmin($crew);
        $perm->message = $this->isAdmin($crew);
        $perm->permissions = $this->isAdmin($crew);
        $perm->save();
    }
}
