<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash; 

class UsuarioController extends Controller
{
   

    private function checkDuplicates(Request $request)
    {
        if (Usuario::where('email', $request->input('emailUsuario'))->exists()) {
            return response()->json(['erro' => 'E-mail já está cadastrado.'], 400);
        }

        if (Usuario::where('cpf', $request->input('cpfUsuario'))->exists()) {
            return response()->json(['erro' => 'CPF já está cadastrado.'], 400);
        }

        return null;
    }

    public function login(Request $request)
    {
        $request->validate([
            'emailUsuario' => 'required|email',
            'senhaUsuario' => 'required',
        ]);

        $email = $request->input('emailUsuario');
        $senha = $request->input('senhaUsuario');

        $usuario = Usuario::where('email', $email)->first();

        if (!$usuario || !Hash::check($senha, $usuario->senha)) {
            return response()->json(['erro' => 'Credenciais inválidas.'], 401); // 401 = Unauthorized
        }

        // Se o login estiver correto, crie e retorne um token de acesso
        $token = $usuario->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'usuario' => [ 
                'id' => $usuario->id,
                'nome' => $usuario->nome,
                'email' => $usuario->email
            ]
        ]);
    }

      public function userProfile(Request $request)
    {
        return response()->json($request->user());
    }

    public function store(Request $request)
    {
        //This function consists of executing verification for duplicated variables
        $check = $this->checkDuplicates($request);
        if($check){
            return $check;
        }

        // Cria um novo usuário com base nos dados recebidos da requisição
        $usuario = Usuario::create([
            'nome' => $request->input('nomeUsuario'),
            'cpf' => $request->input('cpfUsuario'),
            'cep' => $request->input('cepUsuario'),
            'foto' => $request->input('fotoUsuario'),
            'genero' => $request->input('generoUsuario'),
            'email' => $request->input('emailUsuario'),
            'senha' => Hash::make($request->input('senhaUsuario')),
        ]);

        // Retorna o usuário criado em formato JSON com status 201 (Criado)
        return response()->json($usuario, 201);
    }

    // Listar todos os usuários cadastrados
    public function index()
    {
        // Busca todos os registros da tabela 'usuarios'
        $usuarios = Usuario::all();

        // Retorna todos os usuários em JSON
        return response()->json($usuarios);
    }

    // Buscar um único usuário pelo ID
    public function show($id)
    {
        // Procura o usuário com base no ID
        $usuario = Usuario::find($id);

        // Se não encontrar, retorna erro 404 com mensagem
        if (!$usuario) {
            return response()->json(['mensagem' => 'Usuário não encontrado (id)'], 404);
        }

        // Retorna os dados do usuário encontrado
        return response()->json($usuario);
    }

    public function buscarPorEmail($email){

        if (!$email) {
            return response()->json(['error' => 'Parâmetro email é obrigatório '], 400);
        }

        $usuario = Usuario::where('email', $email)->first();

        if (!$usuario) {
            return response()->json(['error' => 'Usuário não encontrado (email)'], 404);
        }

        return response()->json($usuario);
    }

    public function update(Request $request, $id)
    {
        //This function consists of executing verification for duplicated variables
        $check = $this->checkDuplicates($request);
        if($check){
            return $check;
        }

        $usuario = Usuario::find($id);
        if (!$usuario) {
            return response()->json(['mensagem' => 'Usuário não encontrado para atualização'], 404);
        }

            $usuario->nome = $request->input('nomeUsuario', $usuario->nome);
            $usuario->cpf = $request->input('cpfUsuario', $usuario->cpf);
            $usuario->cep = $request->input('cepUsuario', $usuario->cep);
            $usuario->foto = $request->input('fotoUsuario', $usuario->foto);
            $usuario->genero = $request->input('generoUsuario', $usuario->genero);
            $usuario->email = $request->input('emailUsuario', $usuario->email);
            $usuario->senha = $request->input('senhaUsuario', $usuario->senha); 

            $usuario->save(); //save in the database

        
            return response()->json($usuario);
    }

    public function delete($id)
    {
        $usuario = Usuario::find($id);

        if (!$usuario) {
            return response()->json(['mensagem' => 'Usuário não encontrado.'], 404);
        }

        $usuario->delete();

        return response()->json(['mensagem' => "Usuário ({$usuario->nome}) deletado com sucesso."], 200);

    }


}