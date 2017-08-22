<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateQuestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('quests', function (Blueprint $table) {

            $table->increments('id');
            $table->integer('mob_id')->unsigned();
            $table->string('name');

            $table->integer('level')->default(1);

            $table->integer('required_id')->default(0);

            $table->text('before');
            $table->text('accepted');
            $table->text('complete');

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
        Schema::dropIfExists('quests');
    }
}
