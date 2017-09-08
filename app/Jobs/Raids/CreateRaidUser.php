<?php

namespace App\Jobs\Raids;

use App\Models\RaidUser;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class CreateRaidUser implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $raidid;

    private $userid;

    private $crewid;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($raidid, $userid, $crewid)
    {
        $this->raidid = $raidid;
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
        $user = new RaidUser;
        $user->raid_id = $this->raidid;
        $user->user_id = $this->userid;
        $user->crew_id = $this->crewid;
        $user->save();
    }
}
