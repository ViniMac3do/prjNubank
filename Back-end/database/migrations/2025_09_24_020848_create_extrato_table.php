<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('extratos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('remetente_id')->constrained('usuarios');
            $table->foreignId('destinatario_id')->constrained('usuarios');
            $table->decimal('valor', 10, 2); 
            $table->string('descricao')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('extratos');
    }
};
