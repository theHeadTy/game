<?php

namespace App\Jobs;

use App\Models\UserAttack;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class CreateUserAttack implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    /**
     * @var int $userid
     */
    protected $userid;
    /**
     * @var int $targetid
     */
    protected $targetid;
    /**
     * @var string $slug
     */
    protected $slug;
    /**
     * @var int $attacks
     */
    protected $attacks;

    /**
     * Create a new user attack job instance
     *
     * @return void
     */
    public function __construct($userid, $targetid, $slug, $attacks)
    {
        $this->userid = $userid;
        $this->targetid = $targetid;
        $this->slug = $slug;
        $this->attacks = $attacks;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $attack = new UserAttack();
        $attack->user_id = $this->userid;
        $attack->target_id = $this->targetid;
        $attack->slug =  $this->slug;
        $attack->attacks =  $this->attacks;

        $attack->save();

    }
}
