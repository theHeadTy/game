<?php

use Carbon\Carbon;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRaidsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // types - regular, server, god
        Schema::create('raids', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('map_id');
            $table->integer('x');
            $table->integer('y');
            $table->string('name');
            $table->string('type')->default('regular');
            $table->string('image')->nullable();
            $table->text('description')->nullable();
            $table->timestamp('spawn_at');
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
        Schema::dropIfExists('raids');
    }
}
