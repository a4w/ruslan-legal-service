<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class LawyersPracticeAreas extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lawyers_practice_areas', function (Blueprint $table) {
            $table->foreignId('lawyer_id')->constrained('lawyers');
            $table->foreignId('practice_area_id')->constrained('practice_areas');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lawyers_practice_areas');
    }
}
