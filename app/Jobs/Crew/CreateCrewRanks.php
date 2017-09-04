<?php

namespace App\Jobs\Crew;

use App\Models\CrewRank;
use Illuminate\Bus\Queueable;
use App\Classes\CrewRankClass;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class CreateCrewRanks implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

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

    }
}
