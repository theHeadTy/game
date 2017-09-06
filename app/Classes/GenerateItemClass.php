<?php

namespace App\Classes;

use App\Traits\ItemTrait;

class GenerateItemClass
{
    use ItemTrait;

    /**
     * Generate item stats randomly.
     *
     * @param int $level - Level of the NPC
     * @param int $i
     * @param array $gen
     * @return array
     */
    public function generate($level, $i = 0, $gen = [])
    {
        // Decrese - This is a modifier to keep the items stat
        // on par with the level of the npc dropping the item.
        //$dec = $level / (20 + $level);
        $dec = 100 * ($level / 100);

        // Picks a random slot for the item.
        $slot = $this->slotsArray()[array_rand($this->slotsArray())];

        // Stats array.
        $stats = $this->statsArray();

        // Total rolled number of stats that can be added to this item.
        $total = mt_rand(0, count($stats));

        do {

            // Pick a random stat..
            $stat = $stats[array_rand($stats)];

            // Create a value to each stat.
            // Each amount differs based on the type of stat.
            // Example: Critical, block & rampage have lower amounts.
            // Also, each stat has a different rate/chance of actually
            // hitting the stat generators final set.
            if (empty($gen[$stat]) && mt_rand(1,100) >= mt_rand(1,100)) {
                if ($stat === 'attack' && empty($gen['hp']) && $slot === 'Weapon') {
                    $gen['attack'] = round((rand(1,70) / 2) / $dec);
                } elseif ($stat === 'hp' && empty($gen['attack'])) {
                    $gen['hp'] = round((rand(1,90) / 2) / $dec);
                } elseif ($stat === 'rage_hour') {
                    $gen['rage_hour'] = round((rand(1,49) / 2) / $dec);
                } elseif ($stat === 'exp_hour') {
                    $gen['exp_hour'] = round((rand(1,49) / 2) / $dec);
                } elseif ($stat === 'gold_hour') {
                    $gen['gold_hour'] = round((rand(1,49) / 2) / $dec);
                } elseif ($stat === 'critical') {
                    if (mt_rand(1,100) >= mt_rand(1,200)) {
                        $gen['critical'] = round((rand(1,5) / 2) / $dec);
                    }
                } elseif ($stat === 'block') {
                    if (mt_rand(1,100) >= mt_rand(1,150)) {
                        $gen['block'] = round((rand(1,10) / 2) / $dec);
                    }
                } elseif ($stat === 'rampage') {
                    $gen['rampage'] = round((rand(1,10) / 2) / $dec);
                } elseif ($stat === 'rage_cap') {
                    $gen['rage_cap'] = round((rand(1,20) / 2) / $dec);
                } elseif ($stat === 'rage_max') {
                    $gen['rage_max'] = round((rand(2,100) / 2) / $dec);
                }
            }

        } while (++$i < $total);

        return $gen;

    }

}
