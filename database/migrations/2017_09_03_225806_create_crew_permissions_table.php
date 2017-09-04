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
            $table->integer('crew_id')->unsigned();
            $table->integer('rank_id')->unsigned();
            $table->boolean('edit')->default(false);
            $table->boolean('boot')->default(false);
            $table->boolean('invites')->default(false);
            $table->boolean('hitlist')->default(false);
            $table->boolean('ranks')->default(false);
            $table->boolean('bank')->default(false);
            $table->boolean('raids')->default(false);
            $table->boolean('vault')->default(false);
            $table->boolean('shop')->default(false);
            $table->boolean('message')->default(false);
            $table->boolean('permissions')->default(false);
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
    }
}
