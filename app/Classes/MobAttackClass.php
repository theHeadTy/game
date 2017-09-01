<?php

namespace App\Classes;

use Auth;
use App\User;
use App\Models\Mob;
use App\Models\MobKill;
use App\Models\UserStat;
use App\Traits\Attack;
use App\Jobs\MobAttackWin;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MobAttackClass
{
    use Attack;

    /**
     * @var $mob
     */
    protected $mob;
    /**
     * @var $user
     */
    protected $user;

    /**
     * Create a new mob attack instance
     *
     * @return void
     */
    public function __construct(Mob $mob, User $user)
    {
        $this->mob = $mob;
        $this->user = $user;
    }

    public function canAttack()
    {
        return MobKill::where('mob_id', $this->mob->id)
            ->where('user_id', $this->user->id)
            ->where('spawn_at', '>=', $this->mob->spawn_at)
            ->count();
    }

    public function mobAttack(array $attackArr = [])
    {
        $mob = $this->mob;
        $user = $this->user;

        $mobHp = $mob->stats->hp;
        $userHp = $user->stats->hp;

        do {

            static $turn = 'player';

            if ($turn === 'player') {

                $attackArr[] = $this->turn($turn, $user, $mobHp);
                $last = end($attackArr);
                $mobHp = $last['newHp'];
                $turn = ($mobHp <= 0) ? 'winner' : 'target';

            } elseif ($turn === 'target') {

                $attackArr[] = $this->turn($turn, $mob, $userHp);
                $last = end($attackArr);
                $userHp = $last['newHp'];
                $turn = ($userHp <= 0) ? 'winner' : 'player';

            } elseif ($turn === 'winner') {

                $winner = ($userHp <= 0) ? $mob->name : $user->name;
                $gold = $this->goldGain($mob->stats->level);
                $exp = $this->expGain($mob->stats->level);
                $cost = $mob->stats->cost;
                $strip = 0;

                $attackArr[] = $this->winner(
                    $winner, $mob->stats->level, $gold, $exp, $strip
                );

                if ($winner === $user->name) {
                     dispatch(new MobAttackWin(
                        $mob, $user, $gold, $exp, $cost)
                     );
                }

                break;
            }

        }  while (true);

        return $attackArr;
    }

    public function turn($turn, $data, $hp): array
    {
        $damage = $this->generateDamage(
            $data->stats->attack,
            $data->stats->hp,
            $data->stats->level
        );

        $hp -= $damage;

        $hpBar = 228 * (($hp <= 0) ? 0 : ($hp / $data->stats->hp));

        return [
            'turn' => $turn,
            'message' => $this->message($data->name, $damage),
            'damage' => $damage,
            'hp' => $hpBar,
            'newHp' => $hp
        ];
    }

    public function message(string $name, int $damage): string
    {
        return "{$name} hits for {$damage}";
    }

    public function winner($winner, $level, $gold, $exp, $message = null): array
    {
        if ($winner === Auth::user()->name) {
            $message = 'You have won!';
        } else {
            $message = "{$winner} has won!";
        }

        return [
            'turn' => 'winner',
            'message' =>  $message,
            'winner' => $winner,
            'gold' => $gold,
            'exp' => $exp
        ];
    }

}
