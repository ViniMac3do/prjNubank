import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Cria o Contexto de Autenticação, que funcionará como um contêiner global para o estado de autenticação.
const AuthContext = createContext();

// O AuthProvider é um componente que envolve partes da aplicação que precisam de acesso ao contexto de autenticação.
export const AuthProvider = ({ children }) => {
  // 'user' armazena os dados do usuário logado (ex: nome, email). Inicia como nulo.
  const [user, setUser] = useState(null);
  // 'token' armazena o token de autenticação JWT. Inicia como nulo.
  const [token, setToken] = useState(null);

  // Função para realizar o login. Armazena os dados do usuário e o token no estado e no AsyncStorage.
  // O AsyncStorage guarda os dados localmente no dispositivo, permitindo que o usuário continue logado mesmo após fechar o app.
  const loginContext = async (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    await AsyncStorage.setItem('user_token', userToken);
    await AsyncStorage.setItem('user_data', JSON.stringify(userData));
  };

  // Função para realizar o logout. Limpa o estado e remove os dados do AsyncStorage.
  const signOut = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem('user_token');
    await AsyncStorage.removeItem('user_data');
  };

  // useEffect é executado uma vez quando o AuthProvider é montado.
  // Ele tenta carregar os dados do usuário e o token do AsyncStorage para restaurar a sessão.
  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('user_token');
        const storedUser = await AsyncStorage.getItem('user_data');
        // Se ambos existirem, o estado é atualizado e o usuário é considerado logado.
        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        console.error("Falha ao carregar dados do AuthContext", e);
      }
    };
    loadStoredData();
  }, []);

  // Função para atualizar os dados do usuário.
  // Ela atualiza o estado 'user' e também o 'user_data' no AsyncStorage para manter a persistência.
  const updateUser = async (newUserData) => {
    setUser(newUserData);
    await AsyncStorage.setItem('user_data', JSON.stringify(newUserData));
  };

  // O Provider expõe os valores (user, token) e as funções (loginContext, signOut, updateUser) para todos os componentes filhos.
  return (
    <AuthContext.Provider value={{ user, token, loginContext, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado 'useAuth' para simplificar o acesso ao contexto em outros componentes.
// Em vez de usar `useContext(AuthContext)` toda vez, podemos apenas chamar `useAuth()`.
export const useAuth = () => {
  return useContext(AuthContext);
};