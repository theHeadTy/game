<?php
namespace App\Http\Traits;

trait Attack
{

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
