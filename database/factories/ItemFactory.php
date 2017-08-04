<?php

use Carbon\Carbon;

$factory->define(App\Item::class, function (Faker\Generator $faker) {

    return [
        'id' => str_random(10),
        'name' => $faker->name,
        'bound' => 0,
        'inventory' => 0,
        'crew' => 0,
        'type' => 'Regular',
        'options' => 'edzvs',
        'slot' => 'Head',
        'rarity' => 'Common',
        'duration' => 0,
        'set_id' => 0,
        'augs' => str_random(10),
        'about' => $faker->sentence,
        'info' => $faker->sentence,
    ];
});

?>
