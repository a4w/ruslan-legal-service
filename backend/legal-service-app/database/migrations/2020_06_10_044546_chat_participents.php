<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChatParticipents extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::disableForeignKeyConstraints();
        Schema::table('chats', function (Blueprint $table) {
            $table->dropForeign('chats_first_user_id_foreign');
            $table->dropForeign('chats_second_user_id_foreign');
            $table->dropColumn('first_user_id');
            $table->dropColumn('second_user_id');
        });
        Schema::create('chat_participents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('chat_id')->constrained('chats');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::disableForeignKeyConstraints();
        Schema::table('chats', function (Blueprint $table) {
            $table->foreignId('first_user_id')->constrained('users');
            $table->foreignId('second_user_id')->constrained('users');
        });
        Schema::dropIfExists('chat_participents');
    }
}
