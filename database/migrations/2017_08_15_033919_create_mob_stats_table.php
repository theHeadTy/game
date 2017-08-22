<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMobStatsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mob_stats', function (Blueprint $table) {

            $table->integer('mob_id')->unsigned();
            $table->foreign('mob_id')
                ->references('id')->on('mobs')
                ->onDelete('cascade');

            $table->integer('cost')->default(5);

            $table->integer('level')->default(1);

            $table->integer('attack')->default(0);
            $table->integer('hp')->default(0);

            $table->integer('critical')->default(0);
            $table->integer('block')->default(0);
            $table->integer('rampage')->default(0);

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
        Schema::dropIfExists('mob_stats');
    }
}
