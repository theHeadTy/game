<?php

use Carbon\Carbon;
use App\Traits\CrewTrait;
use Illuminate\Database\Seeder;

class CrewPermissionSeeder extends Seeder
{
    use CrewTrait;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->permissionsArray() as $perm) {
            DB::table('crew_permissions')->insert([
                'name' => $perm,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]);
        }
    }
}
