<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddBlogTag extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('blogs', function (Blueprint $table) {
            $table->foreignId('practice_area_id')->constrained('practice_areas');
            $table->string('cover_photo_path', 4096)->default(null)->nullable()->change();
            $table->unsignedInteger('views')->default(0)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('blogs', function (Blueprint $table) {
            $table->dropForeign('blogs_practice_area_id_foreign');
            $table->dropColumn('practice_area_id');
        });
    }
}
