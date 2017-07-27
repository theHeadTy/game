<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddWorldIdToMobsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('mobs', function (Blueprint $table) {
            $table->integer('world_id')->unsigned()->after('id');
            $table->string('type')->default('regular')->after('y');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('mobs', function (Blueprint $table) {
            //
        });
    }
}
