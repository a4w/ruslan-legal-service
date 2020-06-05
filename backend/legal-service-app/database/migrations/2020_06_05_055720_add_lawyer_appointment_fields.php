<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddLawyerAppointmentFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('lawyers', function (Blueprint $table) {
            $table->double('price_per_slot')->nullable();
            $table->double('discount')->nullable();
            $table->boolean('is_percent_discount')->nullable();
            $table->dateTime('discount_end')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('lawyers', function (Blueprint $table) {
            $table->dropColumn(['price_per_slot', 'discount', 'is_percent_discount', 'discount_end']);
        });
    }
}
