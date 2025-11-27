import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    // Esse header evita a tela de bloqueio do Ngrok
    "ngrok-skip-browser-warning": "true" 
  }
});

// --- NOVO: Interceptor de Requisição (O Colador de Crachá) ---
api.interceptors.request.use(async (config) => {
  try {
    // Tenta pegar o token salvo na memória
    // OBS: Verifique se no seu AuthContext você salva com esse nome '@access_token' ou apenas 'token'
    const token = await AsyncStorage.getItem('user_token'); 
    
    if (token) {
      // Se tiver token, adiciona no cabeçalho Authorization
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.log("Erro ao recuperar token:", error);
  }
  return config;
});
// -----------------------------------------------------------

// Função para atualizar a URL (ConfigIP)
export const updateApiUrl = async (newUrl) => {
  api.defaults.baseURL = newUrl;
  await AsyncStorage.setItem('@api_url', newUrl);
};

// Função para carregar a URL salva quando o app abre
export const loadApiUrl = async () => {
  const savedUrl = await AsyncStorage.getItem('@api_url');
  if (savedUrl) {
    api.defaults.baseURL = savedUrl;
  }
};

export default api;