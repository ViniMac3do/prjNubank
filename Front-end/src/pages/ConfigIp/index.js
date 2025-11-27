import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateApiUrl } from '../../utils/api';

export default function ConfigIP({ navigation }) {
  const [url, setUrl] = useState('');

  // Ao abrir a tela, mostra a URL que já está salva
  useEffect(() => {
    async function loadCurrent() {
      const saved = await AsyncStorage.getItem('@api_url');
      if (saved) setUrl(saved);
    }
    loadCurrent();
  }, []);

  const handleSave = async () => {
    if (!url) return;
    
    // Atualiza o Axios e o Storage
    await updateApiUrl(url);
    
    Alert.alert('Sucesso', `IP alterado para: ${url}`);
    
    // Volta para a tela de Login ou Home
    navigation.goBack(); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Digite o endereço da API:</Text>
      <Text style={styles.hint}>(Ex: http://192.168.0.15:8000/api)</Text>
      
      <TextInput
        style={styles.input}
        value={url}
        onChangeText={setUrl}
        autoCapitalize="none"
        placeholder="http://..."
      />
      
      <Button title="Salvar Configuração" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  label: { fontSize: 18, marginBottom: 10, fontWeight: 'bold' },
  hint: { fontSize: 12, color: '#666', marginBottom: 10 },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 10, 
    marginBottom: 20, 
    borderRadius: 5 
  }
});