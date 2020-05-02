<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLawyersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lawyers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('lawyer_type_id')->constrained('lawyer_types');
            $table->text('biography')->nullable();
            $table->unsignedInteger('years_licenced')->nullable();
            $table->foreignId('regulator_id')->constrained('regulators');
            $table->string('institution', 255)->nullable();
            $table->string('course', 255)->nullable();
            $table->unsignedInteger('graduation_year')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lawyers');
    }
}
