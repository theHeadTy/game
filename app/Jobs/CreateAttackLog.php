<?php

namespace App\Jobs;

use App\Models\AttackLog;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class CreateAttackLog implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $userid;
    private $targetid;
    private $type;
    private $outcome;
    private $gold;
    private $exp;
    private $message;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($userid, $targetid, $type, $outcome, $gold, $exp, $message = null)
    {
        $this->userid = $userid;
        $this->targetid = $targetid;
        $this->type = $type;
        $this->outcome = $outcome;
        $this->gold = $gold;
        $this->exp = $exp;
        $this->message = $message;
    }


    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $log = new AttackLog;
        $log->user_id = $this->userid;
        $log->target_id = $this->targetid;
        $log->type = $this->type;
        $log->outcome = $this->outcome;
        $log->message = $this->message;
        $log->gold = $this->gold;
        $log->exp = $this->exp;
        $log->save();

    }
}
