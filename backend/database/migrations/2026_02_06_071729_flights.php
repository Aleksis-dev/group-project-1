<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('flights', function (Blueprint $table) {
            $table->id();
            $table->text('from');
            $table->text('to');
            $table->timestamp('departure');
            $table->timestamp('arrival');
            $table->unsignedInteger('price');
            $table->text("airline");
            $table->unsignedInteger('passangers')->default(0);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('flights');
    }
};