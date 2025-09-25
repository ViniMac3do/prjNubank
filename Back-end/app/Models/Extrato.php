<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Extrato extends Model
{
    protected $table = 'extratos';
    
    // Campos permitidos para inserção em massa
    protected $fillable = [
        'remetente_id',
        'destinatario_id',
        'valor',
        'descricao'
    ];

    // Relação para pegar os dados completos do remetente
    public function remetente()
    {
        return $this->belongsTo(Usuario::class, 'remetente_id');
    }

    // Relação para pegar os dados completos do destinatário
    public function destinatario()
    {
        return $this->belongsTo(Usuario::class, 'destinatario_id');
    }
}