# Nubank Clone - React Native + Laravel

Este projeto é um clone simplificado do app Nubank, desenvolvido em **React Native** para o front-end e **Laravel (PHP)** para o back-end.

## Funcionalidades

- Tela de loading animada
- Autenticação de usuário (login)
- Navegação entre telas usando Stack Navigator
- Consumo de API RESTful (Laravel)
- Interface inspirada no Nubank

## Estrutura do Projeto

```
Front-end/
  └── src/
      ├── pages/
      │   ├── loading/
      │   ├── login/
      └── utils/
Back-end/
  └── (Laravel app)
```

## Tecnologias Utilizadas

- **React Native** (Expo)
- **React Navigation**
- **Laravel** (PHP)
- **Axios** (para requisições HTTP)
- **Animated API** (animações)

## Como rodar o projeto

### Front-end

1. Instale as dependências:
   ```
   npm install
   ```
2. Inicie o projeto:
   ```
   npx expo start
   ```
3. Abra no emulador ou dispositivo físico.

### Back-end

1. Instale as dependências do Laravel:
   ```
   composer install
   ```
2. Configure o `.env` com suas credenciais de banco de dados.
3. Rode as migrations:
   ```
   php artisan migrate
   ```
4. Inicie o servidor:
   ```
   php artisan serve
   ```

## Configuração de API

- Altere a URL base das requisições no front-end para apontar para o endereço do seu back-end Laravel.

## Observações

- O projeto é apenas para fins de estudo e não possui integração real com o Nubank.
-
