<?php

namespace App\Jobs;

use App\User;
use Carbon\Carbon;
use App\Models\UserStat;
use App\Models\UserAttack;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Log;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class UserAttackWin implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * @var $user
     */
    protected $user;
    /**
     * @var $target
     */
    protected $target;
    /**
     * @var $gold
     */
    protected $gold;
    /**
     * @var $exp
     */
    protected $exp;
    /**
     * @var $strip
     */
    protected $strip;
    /**
     * @var $attacks
     */
    protected $attacks;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(User $user, User $target, $gold, $exp, $strip, $attacks)
    {
        $this->user = $user;
        $this->target = $target;
        $this->gold = $gold;
        $this->exp = $exp;
        $this->attacks = $attacks;
    }

    protected function updateUser(UserStat $stats)
    {
        $user = $stats->where('user_id', $this->user->id);

        $user->increment('exp', $this->exp);
        $user->increment('gold', $this->gold);
        $user->decrement('rage', $this->attacks);
    }

    protected function updateTarget(UserStat $stats)
    {
        $user = $stats->where('user_id', $this->target->id);

        //$user->decrement('exp', $this->strip);
    }

    protected function completeAttack(UserAttack $attack)
    {
        $attack = $attack->where('user_id', $this->user->id)
            ->where('target_id', $this->target->id)
            ->where('completed', 0)
            ->first();
        $attack->completed = 1;
        $attack->save();
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(UserStat $stats, UserAttack $attack)
    {
        $this->updateUser($stats);
        $this->completeAttack($attack);
        Log::info("{$this->user->name} pvp attack. " . Carbon::now());
    }
}
