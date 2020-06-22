<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateAccreditationsRelation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('accreditations_lawyers', function (Blueprint $table) {
            // Drop the fucker
            $table->dropForeign('accreditations_lawyers_lawyer_id_foreign');
            $table->dropForeign('accreditations_lawyers_accreditation_id_foreign');

            $table->foreign('lawyer_id')
                ->references('id')->on('lawyers')
                ->onDelete('cascade');
            $table->foreign('accreditation_id')
                ->references('id')->on('accreditations')
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
        //
    }
}
