<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AppointmentEditStatus extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('appointments', function (Blueprint $table) {
            $table->dropColumn(['status']);
        });
        Schema::table('appointments', function (Blueprint $table) {
            $table->enum('status', ['ON_HOLD', 'UPCOMING', 'DONE', 'CANCELLED'])->default('ON_HOLD');
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
    }
}
