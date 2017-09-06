<?php

use Carbon\Carbon;
use App\Models\Raid;
use App\Models\RaidStat;
use Illuminate\Database\Seeder;

class RaidTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::transaction(function() {
            $raid = new Raid;
            $raid->map_id = 1;
            $raid->x = 5;
            $raid->y = 5;
            $raid->name = 'Test Raid';
            $raid->created_at = Carbon::now();
            $raid->updated_at = Carbon::now();
            $raid->save();

            $raid->stats()->save(new RaidStat);

        });
    }
}
