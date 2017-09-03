<?php

namespace App\Jobs\Crew;

use App\Models\Crew;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class CreateCrew implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $userid;
    private $name;
    private $description;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($userid, $name, $description)
    {
        $this->userid = $userid;
        $this->name = $name;
        $this->description = $description;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $crew = new Crew;
        $crew->user_id = $this->userid;
        $crew->name = $this->name;
        $crew->description = $this->description;
        $crew->save();
    }
}
