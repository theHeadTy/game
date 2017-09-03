<?php

namespace App\Jobs\Crew;

use App\Models\UserCrew;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class CreateUserCrew implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $userid;
    private $crewid;
    private $rankid;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($userid, $crewid, $rankid)
    {
        $this->userid = $userid;
        $this->crewid = $crewid;
        $this->rankid = $rankid;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $user = new UserCrew;
        $user->user_id = $this->userid;
        $user->crew_id = $this->crewid;
        $user->rank_id = $this->rankid;
        $user->save();
    }
}
