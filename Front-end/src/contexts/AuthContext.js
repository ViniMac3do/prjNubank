import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Esta função será chamada pela tela de Login APÓS o sucesso do Axios
  const loginContext = async (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    await AsyncStorage.setItem('user_token', userToken);
    await AsyncStorage.setItem('user_data', JSON.stringify(userData));
  };

  const signOut = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem('user_token');
    await AsyncStorage.removeItem('user_data');
  };

  // Tenta carregar os dados do usuário quando o app inicia
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

  return (
    <AuthContext.Provider value={{ user, token, loginContext, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado para facilitar o uso
export const useAuth = () => {
  return useContext(AuthContext);
};