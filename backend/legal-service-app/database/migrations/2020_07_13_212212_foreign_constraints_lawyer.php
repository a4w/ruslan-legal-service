<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ForeignConstraintsLawyer extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('lawyers', function (Blueprint $table) {
            $table->dropForeign('lawyers_lawyer_type_id_foreign');
            $table->foreign('lawyer_type_id')
                ->references('id')->on('lawyer_types')
                ->onDelete('set null')
                ->onUpdate('cascade');
            $table->dropForeign('lawyers_regulator_id_foreign');
            $table->foreign('regulator_id')
                ->references('id')->on('regulators')
                ->onDelete('set null')
                ->onUpdate('cascade');
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
