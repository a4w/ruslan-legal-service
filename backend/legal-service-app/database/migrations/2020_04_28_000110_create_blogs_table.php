<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lawyer_id')->constrained('lawyers');
            $table->string('title', 255);
            $table->mediumText('body');
            $table->string('cover_photo_path', 4096);
            $table->enum('status', ['UNDER_REVIEW', 'PUBLISHED']);
            $table->timestamp('publish_date');
            $table->unsignedInteger('views');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('blogs');
    }
}
