import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// MUDANÇA 1: Importe sua instância configurada, não o axios puro
import api from '../utils/api'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [token, setToken] = useState(null); 

  const loginContext = async (userData, userToken) => {
    setUser(userData); 
    setToken(userToken); 
    await AsyncStorage.setItem('user_token', userToken); 
    await AsyncStorage.setItem('user_data', JSON.stringify(userData)); 
    
    // Opcional: Atualiza o token no header da api imediatamente
    api.defaults.headers.Authorization = `Bearer ${userToken}`;
  };

  const signOut = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.multiRemove(['user_token', 'user_data']); 
    // Limpa o header
    delete api.defaults.headers.Authorization;
  };

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('user_token'); 
        const storedUser = await AsyncStorage.getItem('user_data'); 
        if (storedToken && storedUser) {
          setToken(storedToken); 
          setUser(JSON.parse(storedUser)); 
          // Restaura o token no Axios também
          api.defaults.headers.Authorization = `Bearer ${storedToken}`;
        }
      } catch (e) {
        console.error("Falha ao carregar dados do AuthContext", e);
      }
    };
    loadStoredData();
  }, []);

  const fetchUser = async () => {
    // Só tenta buscar se tiver usuário e token
    if (user && token) { 
      try {
        // MUDANÇA 2: Use 'api.get' e remova o domínio http://...
        // O 'api' vai usar a URL que você salvou na tela de ConfigIP (Ngrok ou IP Local)
        const response = await api.get(`/usuarios/${user.id}`);
        
        const updatedUser = response.data;
        setUser(updatedUser); 
        await AsyncStorage.setItem('user_data', JSON.stringify(updatedUser)); 
      } catch (error) {
        console.error("Erro ao recarregar os dados do usuário:", error);
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

export const useAuth = () => {
  return useContext(AuthContext);
};