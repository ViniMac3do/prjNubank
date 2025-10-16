<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage; // Facade para manipulação de arquivos

class UsuarioController extends Controller
{

    private function checkDuplicates(Request $request, $id = null)
    {
        $email = $request->input('emailUsuario');
        $cpf = $request->input('cpfUsuario');

        // Constrói a query para e-mail
        $queryEmail = Usuario::where('email', $email);
        if ($id) {
            $queryEmail->where('id', '!=', $id);
        }
        if ($queryEmail->exists()) {
            return response()->json(['erro' => 'E-mail já está cadastrado.'], 400);
        }

        // Constrói a query para CPF
        $queryCpf = Usuario::where('cpf', $cpf);
        if ($id) {
            $queryCpf->where('id', '!=', $id);
        }
        if ($queryCpf->exists()) {
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
            return response()->json(['erro' => 'Credenciais inválidas.'], 401);
        }

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
        $check = $this->checkDuplicates($request);
        if($check){
            return $check;
        }

        $usuario = Usuario::create([
            'nome' => $request->input('nomeUsuario'),
            'cpf' => $request->input('cpfUsuario'),
            'cep' => $request->input('cepUsuario'),
            'foto' => $request->input('fotoUsuario'),
            'genero' => $request->input('generoUsuario'),
            'email' => $request->input('emailUsuario'),
            'senha' => Hash::make($request->input('senhaUsuario')),
        ]);

        return response()->json($usuario, 201);
    }

    public function index()
    {
        $usuarios = Usuario::all();
        return response()->json($usuarios);
    }

    public function show($id)
    {
        $usuario = Usuario::find($id);
        if (!$usuario) {
            return response()->json(['mensagem' => 'Usuário não encontrado (id)'], 404);
        }
        return response()->json($usuario);
    }

    public function updateProfilePhoto(Request $request, $id)
    {
        $request->validate([
            'foto' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $usuario = Usuario::find($id);
        if (!$usuario) {
            return response()->json(['mensagem' => 'Usuário não encontrado'], 404);
        }

        // Deleta a foto antiga do storage, se ela existir
        if ($usuario->foto) {
            // Extrai o caminho relativo da URL completa para deletar
            $path = str_replace(url('/storage'), '', $usuario->foto);
            Storage::disk('public')->delete($path);
        }

        // Salva a nova foto e obtém o caminho
        $path = $request->file('foto')->store('fotos_perfil', 'public');

        // Gera a URL completa para a foto ("storage link")
        $url = Storage::disk('public')->url($path);

        // Retorna a URL para o front-end
        return response()->json([
            'mensagem' => 'Foto atualizada com sucesso!',
            'url' => $url
        ]);
    }

    
public function update(Request $request, $id)
{
    $usuario = Usuario::find($id);
    if (!$usuario) {
        return response()->json(['mensagem' => 'Usuário não encontrado'], 404);
    }

    // Validação de email e cpf duplicados
    if ($request->has('emailUsuario') && $request->emailUsuario !== $usuario->email) {
        if (Usuario::where('email', $request->emailUsuario)->where('id', '!=', $id)->exists()) {
            return response()->json(['erro' => 'Este e-mail já está em uso'], 400);
        }
    }
    if ($request->has('cpfUsuario') && $request->cpfUsuario !== $usuario->cpf) {
        if (Usuario::where('cpf', $request->cpfUsuario)->where('id', '!=', $id)->exists()) {
            return response()->json(['erro' => 'Este CPF já está em uso'], 400);
        }
    }

    // Atualiza campos
    $usuario->nome = $request->nomeUsuario ?? $usuario->nome;
    $usuario->cep = $request->cepUsuario ?? $usuario->cep;
    $usuario->genero = $request->generoUsuario ?? $usuario->genero;
    $usuario->email = $request->emailUsuario ?? $usuario->email;

    // Senha
    if ($request->filled('senhaUsuario')) {
        $usuario->senha = Hash::make($request->senhaUsuario);
    }

    // Imagem
    if ($request->hasFile('fotoUsuario')) {
        $arquivo = $request->file('fotoUsuario');
        $nomeArquivo = time() . '_' . $arquivo->getClientOriginalName();
        $arquivo->move(public_path('uploads'), $nomeArquivo);
        $usuario->foto = url('uploads/' . $nomeArquivo);
    }

    $usuario->save();

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