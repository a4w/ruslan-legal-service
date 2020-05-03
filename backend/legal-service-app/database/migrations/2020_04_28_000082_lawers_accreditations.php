<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class LawersAccreditations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('accreditations_lawyers', function (Blueprint $table) {
            $table->foreignId('lawyer_id')->constrained('lawyers');
            $table->foreignId('accreditation_id')->constrained('accreditations');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('accreditations_lawyers');
    }
}
