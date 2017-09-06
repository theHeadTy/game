<?php
namespace App\Traits;
/**
 * Item Trait - Item specific helper functions that will be used more than once
 */
trait ItemTrait
{
    /**
     * Creates the cost for gemming an item using the blacksmith.
     * The cost is calculated based off the rarity of the item
     * and the total amount of gems currently on the item.
     * Each raritys price range differs.
     *
     * @param int $rarity
     * @param int $gems
     * @param null $cost - Special items can have an override cost.
     * @return int $cost - Cost of the gem.
     */
    public function createGemCost($rarity, $gems, $cost = null): int
    {
        switch ($rarity && !$cost) {
            case 'Common':
                if ($gems === 0): $cost = 5;
                elseif ($gems === 1): $cost = 6;
                elseif ($gems === 2): $cost = 7;
                elseif ($gems === 3): $cost = 8;
                elseif ($gems === 4): $cost = 9;
                endif;
            break;
            case 'Uncommon':
                if ($gems === 0): $cost = 10;
                elseif ($gems === 1): $cost = 12;
                elseif (gems === 2): $cost = 14;
                elseif ($gems === 3): $cost = 16;
                elseif ($gems === 4): $cost = 18;
                endif;
            break;
            case 'Rare':
              if ($gems === 0): $cost = 15;
              elseif ($gems === 1): $cost = 20;
              elseif ($gems === 2): $cost = 25;
              elseif ($gems === 3): $cost = 30;
              elseif ($gems === 4): $cost = 35;
              endif;
            break;
        }
        return $cost;
     }

    public function slotsArray(): array
    {
        return [
            'Head', 'Neck', 'Weapon', 'Shield', 'Body', 'Pants', 'Belt', 'Ring', 'Foot'
        ];
    }

    public function statsArray(): array
    {
        return [
            'attack', 'hp', 'critical', 'block', 'rampage',
            'rage_hour', 'exp_hour', 'gold_hour',
            'rage_cap', 'rage_max', 'elemental_block'
        ];
    }

}
