<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        // $this->call(MobsTableSeeder::class);
        // $this->call(WorldsTableSeeder::class);
        // $this->call(ItemTableSeeder::class);

        // $this->call(MobStatsTableSeeder::class);

        $this->call(CrewPermissionSeeder::class);
    }
}
