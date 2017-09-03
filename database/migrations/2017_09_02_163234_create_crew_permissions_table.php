<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCrewPermissionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('crew_permissions', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('crew_rank_permissions', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('perm_id')->unsigned();
            $table->integer('crew_id')->unsigned();
            $table->integer('rank_id')->unsigned();
            $table->boolean('auth')->default(false);
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
        Schema::dropIfExists('crew_permissions');
        Schema::dropIfExists('crew_rank_permissions');
    }
}
