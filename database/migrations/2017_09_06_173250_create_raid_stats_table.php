<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRaidStatsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('raid_stats', function (Blueprint $table) {
            $table->integer('raid_id')->unsigned();
            $table->foreign('raid_id')->references('id')->on('raids');

            $table->integer('attack_cost')->default(50);

            $table->integer('level')->default(1);
            $table->integer('attack')->default(1);
            $table->integer('hp')->default(3);

            $table->integer('critical')->default(1);
            $table->integer('block')->default(1);
            $table->integer('rampage')->default(1);

            $table->integer('block_elemental')->default(0);

            $table->integer('dmg_fire')->default(0);
            $table->integer('dmg_ice')->default(0);
            $table->integer('dmg_dark')->default(0);
            $table->integer('dmg_holy')->default(0);
            $table->integer('dmg_kinetic')->default(0);
            $table->integer('dmg_poison')->default(0);

            $table->integer('res_fire')->default(0);
            $table->integer('res_ice')->default(0);
            $table->integer('res_dark')->default(0);
            $table->integer('res_holy')->default(0);
            $table->integer('res_kinetic')->default(0);
            $table->integer('res_poison')->default(0);

            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('raid_stats');
    }
}
