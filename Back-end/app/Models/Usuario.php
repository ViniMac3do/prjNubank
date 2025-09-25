<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Model
{
     use HasApiTokens, HasFactory;

    protected $table = 'usuarios'; // nome da tabela
    protected $fillable = [
        'nome',
        'cpf',
        'cep',
        'foto',
        'genero',
        'email',
        'senha'
    ]; // campos permitidos para inserção em massa
}