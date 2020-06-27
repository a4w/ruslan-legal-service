<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DropSchedulePropFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('lawyers', function (Blueprint $table) {
            $table->dropColumn('slot_length');
            $table->dropColumn('price_per_slot');
            $table->dropColumn('discount');
            $table->dropColumn('is_percent_discount');
            $table->dropColumn('discount_end');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::table('lawyers', function (Blueprint $table) {
            $table->json('schedule')->nullable();
            $table->unsignedInteger('slot_length')->nullable();
            $table->double('price_per_slot')->nullable();
            $table->double('discount')->nullable();
            $table->boolean('is_percent_discount')->nullable();
            $table->dateTime('discount_end')->nullable();
        });
    }
}
