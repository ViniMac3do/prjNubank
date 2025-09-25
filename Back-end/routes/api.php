<?php

use Illuminate\HttpRequest;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\ExtratoController;

// Rotas Públicas (Não precisam de login)
Route::post('/usuarios', [UsuarioController::class, 'store']);
Route::post('/login', [UsuarioController::class, 'login']);
Route::get('/usuarios/{id}', [UsuarioController::class, 'show']);
Route::get('/usuarios/email/{email}', [UsuarioController::class, 'buscarPorEmail']);

// Rotas Protegidas (Precisam de token de autenticação)
Route::middleware('auth:sanctum')->group(function () {
    // Rotas de Usuário
    Route::get('/usuarios', [UsuarioController::class, 'index']);
    Route::put('/usuarios/{id}', [UsuarioController::class, 'update']);
    Route::delete('/usuarios/{id}', [UsuarioController::class, 'delete']);
    Route::get('/user', [UsuarioController::class, 'userProfile']);

    // Rotas de Extrato
    Route::post('/extratos', [ExtratoController::class, 'store']);
    Route::get('/extratos', [ExtratoController::class, 'index']);
    Route::get('/extratos/{id}', [ExtratoController::class, 'show']);
    Route::get('/meu-extrato', [ExtratoController::class, 'meuExtrato']); // Rota recomendada
    Route::put('/extratos/{id}', [ExtratoController::class, 'update']);
    Route::delete('/extratos/{id}', [ExtratoController::class, 'delete']);
});