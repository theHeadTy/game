<?php

namespace App\Classes;

use App\User;
use App\Traits\Attack;
use App\Jobs\UserAttackWin;

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

    public function __construct(User $user, User $target)
    {
        $this->user = $user;
        $this->target = $target;
    }

    public function userAttack($attacksUsed, array $attackArr = [])
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

                $attackArr[] = $this->winner(
                    $user->name, $winner, $target->stats->level, $gold, $exp, $strip
                );

                if ($winner === $user->name) {
                    dispatch(new UserAttackWin(
                        $user, $target, $gold, $exp, $strip, $attacksUsed)
                    );
                }

                break;
            }

        }  while (true);

        return $attackArr;
    }
}
