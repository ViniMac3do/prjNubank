<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Usuario; // Verifique se o caminho para o seu model está correto
use Illuminate\Support\Facades\Hash;

class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Opcional: Limpa a tabela antes de popular para evitar duplicatas ao rodar o seeder novamente.
        //Usuario::truncate();

        $usuarios = [
            [
                'nome' => 'Ana Silva',
                'cpf' => '11122233344',
                'cep' => '01001000',
                'foto' => 'https://i.pravatar.cc/150?u=ana.silva@example.com',
                'genero' => 'Feminino',
                'email' => 'ana.silva@example.com',
                'senha' => Hash::make('senha123'),
            ],
            [
                'nome' => 'Bruno Costa',
                'cpf' => '22233344455',
                'cep' => '02002000',
                'foto' => 'https://i.pravatar.cc/150?u=bruno.costa@example.com',
                'genero' => 'Masculino',
                'email' => 'bruno.costa@example.com',
                'senha' => Hash::make('senha123'),
            ],
            [
                'nome' => 'Carla Dias',
                'cpf' => '33344455566',
                'cep' => '03003000',
                'foto' => 'https://i.pravatar.cc/150?u=carla.dias@example.com',
                'genero' => 'Feminino',
                'email' => 'carla.dias@example.com',
                'senha' => Hash::make('senha123'),
            ],
            [
                'nome' => 'Daniel Martins',
                'cpf' => '44455566677',
                'cep' => '04004000',
                'foto' => 'https://i.pravatar.cc/150?u=daniel.martins@example.com',
                'genero' => 'Masculino',
                'email' => 'daniel.martins@example.com',
                'senha' => Hash::make('senha123'),
            ],
            [
                'nome' => 'Eduarda Ferreira',
                'cpf' => '55566677788',
                'cep' => '05005000',
                'foto' => 'https://i.pravatar.cc/150?u=eduarda.ferreira@example.com',
                'genero' => 'Feminino',
                'email' => 'eduarda.ferreira@example.com',
                'senha' => Hash::make('senha123'),
            ],
            [
                'nome' => 'Fábio Souza',
                'cpf' => '66677788899',
                'cep' => '06006000',
                'foto' => 'https://i.pravatar.cc/150?u=fabio.souza@example.com',
                'genero' => 'Masculino',
                'email' => 'fabio.souza@example.com',
                'senha' => Hash::make('senha123'),
            ],
            [
                'nome' => 'Gabriela Lima',
                'cpf' => '77788899900',
                'cep' => '07007000',
                'foto' => 'https://i.pravatar.cc/150?u=gabriela.lima@example.com',
                'genero' => 'Feminino',
                'email' => 'gabriela.lima@example.com',
                'senha' => Hash::make('senha123'),
            ],
            [
                'nome' => 'Hugo Pereira',
                'cpf' => '88899900011',
                'cep' => '08008000',
                'foto' => 'https://i.pravatar.cc/150?u=hugo.pereira@example.com',
                'genero' => 'Masculino',
                'email' => 'hugo.pereira@example.com',
                'senha' => Hash::make('senha123'),
            ],
            [
                'nome' => 'Isabela Rocha',
                'cpf' => '99900011122',
                'cep' => '09009000',
                'foto' => 'https://i.pravatar.cc/150?u=isabela.rocha@example.com',
                'genero' => 'Feminino',
                'email' => 'isabela.rocha@example.com',
                'senha' => Hash::make('senha123'),
            ],
            [
                'nome' => 'João Santos',
                'cpf' => '00011122233',
                'cep' => '10010010',
                'foto' => 'https://i.pravatar.cc/150?u=joao.santos@example.com',
                'genero' => 'Masculino',
                'email' => 'joao.santos@example.com',
                'senha' => Hash::make('senha123'),
            ],
        ];

        // Itera sobre o array e cria cada usuário no banco de dados
        foreach ($usuarios as $userData) {
            Usuario::create($userData);
        }
    }
}