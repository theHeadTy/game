<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRaidLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('raid_logs', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('raid_id')->unsigned();
            $table->integer('crew_id');
            $table->integer('attackers');
            $table->string('outcome');
            $table->json('data');
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
        Schema::dropIfExists('raid_logs');
    }
}
