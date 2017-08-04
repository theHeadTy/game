<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class ItemTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('items')->insert([
            'id' => 1,
            'name' => 'Steel Plate Helmet',
            'bound' => 0,
            'inventory' => 0,
            'crew' => 0,
            'type' => 'Regular',
            'options' => 'edzvs',
            'slot' => 'Head',
            'rarity' => 'Common',
            'duration' => 0,
            'set_id' => 0,
            'augs' => 4,
            'image' => 'images/items/head-steelhelmet.png',
            'description' => 'This is a test about item.',
            'info' => 'And this is a test information about item.'
        ]);

        DB::table('item_stats')->insert([
            'item_id' => 1,
            'attack' => 0,
            'hp' => 10,
            'critical' => 50,
            'block' => 50,
            'rampage' => 50,
            'rage_max' => 500,
            'rage_cap' => 10,
            'rage_hour' => 1000,
            'exp_hour' => 1000,
            'gold_hour' => 1000
        ]);

        DB::table('user_items')->insert([
            'id' => 1,
            'user_id' => 1,
            'item_id' => 1,
            'equipped' => 0,
            'gems' => 0,
            'aug_slot_1' => 0,
            'aug_slot_2' => 0,
            'aug_slot_3' => 0,
            'aug_slot_4' => 0

        ]);

        DB::table('user_items')->insert([
            'id' => 2,
            'user_id' => 1,
            'item_id' => 1,
            'equipped' => 0,
            'gems' => 0,
            'aug_slot_1' => 0,
            'aug_slot_2' => 0,
            'aug_slot_3' => 0,
            'aug_slot_4' => 0

        ]);
    }
}
