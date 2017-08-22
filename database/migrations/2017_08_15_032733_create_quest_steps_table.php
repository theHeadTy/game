<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateQuestStepsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('quest_steps', function (Blueprint $table) {

            $table->increments('id');

            $table->integer('quest_id')->unsigned();
            $table->foreign('quest_id')
                ->references('id')->on('quests');

            $table->integer('step_id')->default(1);

            $table->text('description')->nullable();

            // Does the quest require the player to talk to a mob
            $table->integer('talk_id')->default(0);

            // Does the quest require the player to kill mobs?
            $table->integer('kill_id')->default(0);
            $table->integer('kill_amount')->default(0);

            // Does the quest require the player to find items?
            $table->integer('item_id')->default(0);
            $table->integer('item_amount')->default(0);

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
        Schema::dropIfExists('quest_steps');
    }
}
