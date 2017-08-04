<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->tinyInteger('bound')->default(0);
            $table->tinyInteger('inventory')->default(0);
            $table->tinyInteger('crew')->default(0);
            /**
             *---------------------------------------------------------
             * For selecting which backpack the item will be in.
             *---------------------------------------------------------
             * Regular
             * Quest
             * Orbs
             * Potions
             * Keys
             */
             $table->string('type')->default('Regular');
            /**
             *---------------------------------------------------------
             * Menu Options - display the js dropdown from /backpack
             *---------------------------------------------------------
             * a - Activate
             * e - Equip
             * d - Delete
             * v - View
             * z - Vault
             * c - Crew Vault
             * s - Sell
             * f - Item is already for sale
             * 'edzvs' default
             * 'aedvzcsf' all
             */
            $table->string('options')->default('edzvs')->comment('aedvzcsf');
            /**
             *---------------------------------------------------------
             * Slots Available
             *---------------------------------------------------------
             * Weapon
             * Shield
             * Head
             * Foot
             * Pants
             * Belt
             * Neck
             * Ring
             * Body
             * Orb
             * Other (upgrades ect.)
             */
            $table->string('slot');
            /**
             *---------------------------------------------------------
             * Rarity of an item.(decides what color the name will be)
             *---------------------------------------------------------
             * Common
             * Uncommon
             * Rare
             */
            $table->string('rarity')->default('Common');
            $table->integer('duration')->default(0);
            $table->integer('set_id')->unsigned();
            $table->tinyInteger('augs')->default(0);
            $table->string('image')->default('http://placehold.it/55x55');
            $table->text('description')->nullable();
            $table->text('info')->nullable();
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
        Schema::dropIfExists('items');
    }
}
