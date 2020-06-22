<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdatePracticeAreaRelation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('lawyers_practice_areas', function (Blueprint $table) {
            // Drop the fucker
            $table->dropForeign('lawyers_practice_areas_lawyer_id_foreign');
            $table->dropForeign('lawyers_practice_areas_practice_area_id_foreign');

            $table->foreign('lawyer_id')
                ->references('id')->on('lawyers')
                ->onDelete('cascade');
            $table->foreign('practice_area_id')
                ->references('id')->on('practice_areas')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Fuck of
    }
}
