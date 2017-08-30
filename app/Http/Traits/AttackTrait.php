<?php

namespace App\Http\Traits;

use Auth;
use App\Mob;
use App\User;

trait AttackTrait
{

    public function mobAttack(int $id, array $attackArr = []): array
    {
        $mob = Mob::with('stats')->find($id);

        $user = User::with('stats')->find(Auth::id());

        $mobHp = $mob->stats->hp;
        $userHp = $user->stats->hp;

        do {

            static $turn = 'player';

            if ($turn === 'player') {

                /*
                $damage = $this->generateDamage(
                    $user->stats->attack,
                    $user->stats->hp,
                    $user->stats->level
                );

                $mobHp -= $damage;

                $userBar = 228 * (($mobHp <= 0) ? 0 : $mobHp / $mob->stats->hp);

                $attackArr[] = $this->turn(
                    $turn,
                    $this->message($user->name, $damage),
                    $damage,
                    $userBar
                );
                */

                $attackArr[] = $this->turn($turn, $user, $mobHp);

                $last = end($attackArr);

                $mobHp = $last['newHp'];

                $turn = ($mobHp <= 0) ? 'winner' : 'mob';

            } elseif ($turn === 'mob') {

                /*
                $damage = $this->generateDamage(
                    $mob->stats->attack,
                    $mob->stats->hp,
                    $mob->stats->level
                );

                $userHp -= $damage;

                $mobBar = 228 * (($userHp <= 0) ? 0 : $userHp / $user->stats->hp);

                $attackArr[] = $this->turn(
                    $turn,
                    $this->message($mob->name, $damage),
                    $damage,
                    $mobBar
                );
                */

                $attackArr[] = $this->turn($turn, $mob, $userHp);

                $last = end($attackArr);
                $userHp = $last['newHp'];

                $turn = ($userHp <= 0) ? 'winner' : 'player';


            } elseif ($turn === 'winner') {

                $winner = ($userHp <= 0) ? $mob->name : $user->name;

                $attackArr[] = [
                    'turn' => $turn,
                    'message' => $this->winner($winner),
                    'winner' => $winner,
                    'gold' => $this->goldGain($mob->stats->level),
                    'exp' => $this->expGain($mob->stats->level)
                ];

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

        $hpBar = 228 * (($hp <= 0) ? 0 : $hp / $data->stats->hp);

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
        return $name . ' hits for ' . $damage;
    }

    public function winner(string $winner, $message = null): string
    {
        if ($winner === Auth::user()->name) {
            $message = 'You have won!';
        } else {
            $message = $winner . ' has won!';
        }
        return $message;
    }

    public function generateDamage($attack, $hp, $level): int
    {
        $level = mt_rand(1, $level);
        $damage = round(($attack * $attack) / ($attack + $hp) * $level);

        return $damage + 1;
    }

    public function goldGain($level = 1): int
    {
        $lean = mt_rand(0, 2);
        return round(
            $lean * pow(1.055, $level) + 8 + pow(1.055, pow($level, 1.085)));
     }

     public function expGain($level = 1): int
     {
         return round(2 * 3 * (pow(1.055, $level)) + 8
             + pow(1.055, pow($level, 1.085) - 3 * $this->goldGain($level))
         );
     }
}
