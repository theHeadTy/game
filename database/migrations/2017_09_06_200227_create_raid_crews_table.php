<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRaidCrewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('raid_crews', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('raid_id')->unsigned();
            $table->integer('crew_id')->unsigned();
            $table->timestamp('launch_at');
            $table->text('message')->nullable();
            $table->softDeletes();
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
        Schema::dropIfExists('raid_crews');
    }
}
