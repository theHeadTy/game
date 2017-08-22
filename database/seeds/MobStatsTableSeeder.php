<?php

use App\MobStat;
use Illuminate\Database\Seeder;

class MobStatsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $m1 = new MobStat;
        $m1->mob_id = 1;
        $m1->save();

        $m2 = new MobStat;
        $m2->mob_id = 2;
        $m2->save();

        $m3 = new MobStat;
        $m3->mob_id = 3;
        $m3->save();

        $m4 = new MobStat;
        $m4->mob_id = 4;
        $m4->save();

        $m5 = new MobStat;
        $m5->mob_id = 5;
        $m5->save();

    }
}
