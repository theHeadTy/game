<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMobKillsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mob_kills', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('mob_id')->unsigned();
            $table->integer('user_id');
            $table->dateTime('spawn_at')
                ->default(Carbon\Carbon::now()->addMinutes(5));
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
        Schema::dropIfExists('mob_kills');
    }
}
