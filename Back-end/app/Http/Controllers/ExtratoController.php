<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Extrato;
use App\Models\Usuario;
use Illuminate\Support\Facades\Auth;

class ExtratoController extends Controller
{
    public function meuExtrato(Request $request)
    {
        $usuarioLogado = $request->user(); 

        $transacoes = Extrato::where('remetente_id', $usuarioLogado->id)
                             ->orWhere('destinatario_id', $usuarioLogado->id)
                             ->with(['remetente', 'destinatario']) // Carrega os dados dos usuários
                             ->orderBy('created_at', 'desc') // Ordena da mais nova para a mais antiga
                             ->get();
        
        // Formata a resposta para o frontend
        $extratoFormatado = $transacoes->map(function ($transacao) use ($usuarioLogado) {
            
            $ehEnvio = $transacao->remetente_id === $usuarioLogado->id;

            return [
                'id' => $transacao->id,
                'data' => $transacao->created_at->format('d/m/Y H:i'),
                'descricao' => $transacao->descricao,
                'tipo' => $ehEnvio ? 'PIX Enviado' : 'PIX Recebido',
                'valor' => $ehEnvio ? -$transacao->valor : +$transacao->valor, // Coloca o sinal de - se for envio
                'nome_outra_pessoa' => $ehEnvio ? $transacao->destinatario->nome : $transacao->remetente->nome,
            ];
        });

        return response()->json($extratoFormatado);
    }
}