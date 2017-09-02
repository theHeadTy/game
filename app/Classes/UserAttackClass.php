<?php

namespace App\Classes;

use App\User;
use App\Traits\Attack;
use App\Jobs\UserAttackWin;
use App\Jobs\CreateAttackLog;

class UserAttackClass
{
    use Attack;

    /**
     * @var $user
     */
    protected $user;
    /**
     * @var $target
     */
    protected $target;

    /**
     * Creates an instance of UserAttackClass
     *
     * @param App\User $user
     * @param App\User $target
     * @return void
     */
    public function __construct(User $user, User $target)
    {
        $this->user = $user;
        $this->target = $target;
    }

    /**
     * Loops & builds the attack into an array.
     *
     * @param int $attacksUsed
     * @param array $attackArr[]
     * @return array
     */
    public function userAttack($attacksUsed, array $attackArr = []): array
    {
        $target = $this->target;
        $user = $this->user;

        $targetHp = $target->stats->hp;
        $userHp = $user->stats->hp;

        do {

            static $turn = 'player';

            if ($turn === 'player') {

                $attackArr[] = $this->turn($turn, $user, $targetHp);
                $last = end($attackArr);
                $targetHp = $last['newHp'];
                $turn = ($targetHp <= 0) ? 'winner' : 'target';

            } elseif ($turn === 'target') {

                $attackArr[] = $this->turn($turn, $target, $userHp);
                $last = end($attackArr);
                $userHp = $last['newHp'];
                $turn = ($userHp <= 0) ? 'winner' : 'player';

            } elseif ($turn === 'winner') {

                $winner = ($userHp <= 0) ? $target->name : $user->name;
                $gold = 0;
                $exp = $this->expGain($target->stats->level);

                $strip = round(($attacksUsed / 100) * $exp);

                if ($winner === $user->name) {

                    $attackArr[] = $this->winner(
                        $user->name, $winner, $target->stats->level, $gold, $exp, $strip
                    );

                    $this->updateWinner($user, $target, 'win', $gold, $exp, $strip, $attacksUsed);

                } else {

                    $attackArr[] = $this->winner($target->name, $winner, 1, 0, 0, 0);

                    $this->updateWinner($user, $target, 'loss', 0, 0, 0, $attacksUsed);

                }

                break;
            }

        }  while (true);

        return $attackArr;
    }


    /**
     * Complete the attack -
     * Updates user, & create attack logs. This will be added to the job queue.
     *
     * @param App\User $user
     * @param App\User $target
     * @param string $outcome
     * @param int $gold
     * @param int $exp
     * @param int $strip
     * @param int $attacks
     */
    private function updateWinner(User $user, User $target, $outcome, $gold, $exp, $strip, $attacks)
    {
        if ($outcome === 'win') {
            dispatch(new UserAttackWin(
                $user, $target, $gold, $exp, $strip, $attacks)
            );
            dispatch(new CreateAttackLog(
                $user->id, $target->id, 'out', 'win', $exp, $gold, null)
            );
            dispatch(new CreateAttackLog(
                $user->id, $target->id, 'in', 'loss', 0, 0, null)
            );
        } else {
            dispatch(new CreateAttackLog(
                $user->id, $target->id, 'out', 'loss', 0, 0, null)
            );
            dispatch(new CreateAttackLog(
                $user->id, $target->id, 'in', 'win', 0, 0, null)
            );
        }
    }
}
