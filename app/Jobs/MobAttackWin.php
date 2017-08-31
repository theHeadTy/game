<?php

namespace App\Jobs;

use App\Mob;
use App\User;
use App\MobKill;
use App\UserStat;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;


class MobAttackWin implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * @var $mob
     */
    protected $mob;
    /**
     * @var $user
     */
    protected $user;
    /**
     * @var $gold
     */
    protected $gold;
    /**
     * @var exp
     */
    protected $exp;
    /**
     * @var cost
     */
    protected $cost;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Mob $mob, User $user, $gold, $exp, $cost)
    {
        $this->mob = $mob;
        $this->user = $user;
        $this->gold = $gold;
        $this->exp = $exp;
        $this->cost = $cost;
    }

    protected function updateUser(UserStat $stat)
    {
        $user = $stat->where('user_id', $this->user->id);

        $user->increment('exp', $this->exp);
        $user->increment('gold', $this->gold);
        $user->decrement('rage', $this->cost);
    }

    protected function updateMob()
    {
        $mob = new MobKill;
        $mob->mob_id = $this->mob->id;
        $mob->user_id = $this->user->id;
        $mob->save();
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(UserStat $stat)
    {
        $this->updateMob();

        $this->updateUser($stat);
    }
}
