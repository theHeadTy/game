<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserStatsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_stats', function (Blueprint $table) {

            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')
                ->references('id')->on('users');

            $table->integer('level')->default(1);

            $table->integer('exp')->default(0);
            $table->integer('exp_today')->default(0);
            $table->integer('exp_yesterday')->default(0);
            $table->integer('exp_to_level')->default(5);

            $table->integer('attack')->default(1);
            $table->integer('hp')->default(3);

            $table->integer('critical')->default(1);
            $table->integer('block')->default(1);
            $table->integer('rampage')->default(1);

            $table->integer('rage_hour')->default(10);
            $table->integer('exp_hour')->default(10);
            $table->integer('gold_hour')->default(10);

            $table->integer('rage_max')->default(2000);
            $table->integer('rage_cap')->default(5);

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

            $table->integer('level_points')->default(1);
            $table->integer('skill_points')->default(1);

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
        Schema::dropIfExists('user_stats');
    }
}
