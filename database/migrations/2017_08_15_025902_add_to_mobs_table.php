<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddToMobsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('mobs', function (Blueprint $table) {

            $date = Carbon\Carbon::now();

            $table->string('image')->nullable()->after('type');
            $table->text('description')->nullable()->after('image');

            $table->dateTime('spawn_at')
                ->default(Carbon\Carbon::now())
                ->after('image');

            $table->softDeletes();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('mobs', function (Blueprint $table) {
            //
        });
    }
}
