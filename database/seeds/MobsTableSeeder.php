<?php

use App\Mob;
use App\MobStat;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class MobsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('mobs')->insert([
            'name' => 'Mob Test 1',
            'world_id' => 1,
            'x' => 4,
            'y' => 4
        ]);

        DB::table('mobs')->insert([
            'name' => 'Mob Test 2',
            'world_id' => 1,
            'x' => 5,
            'y' => 5
        ]);

        DB::table('mobs')->insert([
            'name' => 'Mob Test 3',
            'world_id' => 1,
            'x' => 5,
            'y' => 5
        ]);

        DB::table('mobs')->insert([
            'name' => 'Mob Test 4',
            'world_id' => 1,
            'x' => 4,
            'y' => 7
        ]);

        DB::table('mobs')->insert([
            'name' => 'Mob Test 5',
            'world_id' => 1,
            'x' => 6,
            'y' => 6
        ]);
        
    }
}
