<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_items', function (Blueprint $table) {
            $table->increments('id');
            // ID of the item.
            $table->integer('item_id')->unsigned();
            // ID of the user who owns the item.
            $table->integer('user_id')->unsigned();
            // Equipped (0, 1)
            $table->tinyInteger('equipped')->default(0);
            // Gems (max)
            $table->tinyInteger('gems')->default(0);
            // Augs - slots 1 - 4.
            $table->integer('aug_slot_1')->default(0);
            $table->integer('aug_slot_2')->default(0);
            $table->integer('aug_slot_3')->default(0);
            $table->integer('aug_slot_4')->default(0);

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
        Schema::dropIfExists('user_items');
    }
}
