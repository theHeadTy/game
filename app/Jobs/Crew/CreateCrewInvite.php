<?php

namespace App\Jobs\Crew;

use App\Models\CrewInvite;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class CreateCrewInvite implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $userid;

    private $crewid;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($userid, $crewid)
    {
        $this->userid = $userid;
        $this->crewid = $crewid;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $invite = new CrewInvite;
        $invite->user_id = $this->userid;
        $invite->crew_id = $this->crewid;
        $invite->save();
    }
}
