<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Usuario; // Importe o model de Usuário
use App\Models\Extrato; // Importe o seu model de Extrato
use Carbon\Carbon; // Usaremos para manipular as datas

class ExtratoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Limpa a tabela para evitar duplicatas ao rodar o seeder de novo
        Extrato::truncate();

        // 1. Encontrar os usuários para quem vamos gerar o extrato
        $usuarioAna = Usuario::where('email', 'ana.silva@example.com')->first();
        $usuarioBruno = Usuario::where('email', 'bruno.costa@example.com')->first();

        // Se os usuários não existirem, o seeder para aqui para evitar erros.
        if (!$usuarioAna || !$usuarioBruno) {
            $this->command->info('Usuários de exemplo não encontrados. Rode o UsuarioSeeder primeiro.');
            return;
        }

        // 2. Criar uma lista de transações para a ANA
        $transacoesAna = [
            [
                'usuario_id' => $usuarioAna->id,
                'nome_usuario' => 'Bruno Costa', // Nome da outra pessoa na transação
                'data' => Carbon::now()->subDays(8),
                'valor' => 250.75, // Valor positivo = entrada
                'tipo' => 'PIX Recebido'
            ],
            [
                'usuario_id' => $usuarioAna->id,
                'nome_usuario' => 'Empresa X S.A.',
                'data' => Carbon::now()->subDays(5),
                'valor' => -120.00, // Valor negativo = saída
                'tipo' => 'Pagamento de Boleto'
            ],
            [
                'usuario_id' => $usuarioAna->id,
                'nome_usuario' => 'Bruno Costa',
                'data' => Carbon::now()->subDays(2),
                'valor' => -50.00,
                'tipo' => 'PIX Enviado'
            ],
        ];

        // 3. Criar uma lista de transações para o BRUNO
        $transacoesBruno = [
            [
                'usuario_id' => $usuarioBruno->id,
                'nome_usuario' => 'Ana Silva',
                'data' => Carbon::now()->subDays(8),
                'valor' => -250.75,
                'tipo' => 'Transferência Enviada'
            ],
            [
                'usuario_id' => $usuarioBruno->id,
                'nome_usuario' => 'Restaurante Sabor',
                'data' => Carbon::now()->subDays(3),
                'valor' => -85.50,
                'tipo' => 'Pagamento com Cartão'
            ],
            [
                'usuario_id' => $usuarioBruno->id,
                'nome_usuario' => 'Ana Silva',
                'data' => Carbon::now()->subDays(2),
                'valor' => 50.00,
                'tipo' => 'PIX Recebido'
            ],
        ];

        // 4. Salvar todas as transações no banco de dados
        foreach ($transacoesAna as $transacao) {
            Extrato::create($transacao);
        }

        foreach ($transacoesBruno as $transacao) {
            Extrato::create($transacao);
        }
    }
}