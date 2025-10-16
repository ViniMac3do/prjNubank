import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [token, setToken] = useState(null); 

  // Função para logar o usuário e salvar dados no estado e AsyncStorage
  const loginContext = async (userData, userToken) => {
    setUser(userData); 
    setToken(userToken); 
    await AsyncStorage.setItem('user_token', userToken); 
    await AsyncStorage.setItem('user_data', JSON.stringify(userData)); 
  };

  // Função para deslogar o usuário, limpando estado e storage
  const signOut = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.multiRemove(['user_token', 'user_data']); 
  };

  // Carrega dados persistidos ao iniciar o app, mantendo o usuário logado se houver
  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('user_token'); 
        const storedUser = await AsyncStorage.getItem('user_data'); 
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

  // Função para buscar os dados mais recentes do usuário na API
  const fetchUser = async () => {
    if (user && token) { 
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/usuarios/${user.id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const updatedUser = response.data;
        setUser(updatedUser); 
        await AsyncStorage.setItem('user_data', JSON.stringify(updatedUser)); 
      } catch (error) {
        console.error("Erro ao recarregar os dados do usuário:", error);
        // Se o token for inválido (erro 401), desloga o usuário
        if (error.response?.status === 401) {
          signOut();
        }
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loginContext, signOut, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para facilitar o uso do contexto em qualquer componente
export const useAuth = () => {
  return useContext(AuthContext);
};
