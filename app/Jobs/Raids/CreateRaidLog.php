<?php

namespace App\Jobs\Raids;

use App\Models\RaidLog;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class CreateRaidLog implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $raidid;

    private $id;

    private $crewid;

    private $data;

    private $raiders;

    private $outcome;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($raidid, $id,  $crewid, $data, $raiders, $outcome)
    {
        $this->raidid = $raidid;
        $this->id = $id;
        $this->crewid = $crewid;
        $this->data = $data;
        $this->raiders = $raiders;
        $this->outcome = $outcome;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $log = new RaidLog;
        $log->raid_id = $this->raidid;
        $log->raids_crew_id = $this->id;
        $log->crew_id = $this->crewid;
        $log->data = json_encode($this->data);
        $log->attackers = $this->raiders;
        $log->outcome = $this->outcome;
        $log->save();

    }

}
