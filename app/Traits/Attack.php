<?php
namespace App\Traits;

trait Attack
{

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

    public function winner($username, $winner, $level, $gold, $exp, $strip): array
    {
        $message = null;
        
        if ($winner === $username) {
            $message = 'You have won!';
        } else {
            $message = "{$winner} has won!";
        }

        return [
            'turn' => 'winner',
            'message' =>  $message,
            'winner' => $winner,
            'gold' => $gold,
            'exp' => $exp,
            'strip' => $strip
        ];
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
            + pow(1.055, pow($level, 1.085) - 3 * $level)
        );
     }

 }
