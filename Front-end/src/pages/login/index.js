import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { Alert } from 'react-native';
import { ImageBackground, View, Text, Pressable, Modal, TextInput, Button } from 'react-native';
import styles from './style.js';
import React, { useState } from 'react';
import { useAuth } from './../../contexts/AuthContext'; 

export default function Login({ navigation }) {
  const { loginContext } = useAuth(); // <<< MUDANÇA AQUI: 2. Obtenha a função de login do contexto

  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);


  const validarDados = () => {
    if (!senha || !email) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return false;
    }
    if (senha.length < 6) {
      Alert.alert('Erro', 'A senha precisa ter pelo menos 6 caracteres.');
      return false;
    }
    return true;
  };

  const verificarLogin = async () => {
    if (!validarDados()) return;

    setCarregando(true);

    try {
      const resposta = await axios.post('http://127.0.0.1:8000/api/login', {
        emailUsuario: email, 
        senhaUsuario: senha, 
      });

      // Pega o usuário e o token da resposta da API
      const { usuario, access_token } = resposta.data;

      if (usuario && access_token) {
        await loginContext(usuario, access_token);

        setModalVisible(false);
        navigation.replace('Home');
      } else {
        throw new Error('Resposta da API inválida');
      }
    } catch (erro) {
      if (erro.response && erro.response.data.erro) {
        Alert.alert('Erro no Login', erro.response.data.erro);
      } else {
        console.error('Erro na requisição:', erro);
        Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
      }
    } finally {
      setCarregando(false);
    }
  };
  
  return (
    <ImageBackground
      source={require('../../../assets/imgback.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.buttonContainer}>
        {!modalVisible && (
          <>
            <Pressable onPress={() => navigation.navigate('Cadastro')} style={styles.buttonPrimary}>
              <Text style={styles.buttonText}>Começar</Text>
            </Pressable>
            <Pressable onPress={() => setModalVisible(true)} style={styles.buttonSecondary}>
              <Text style={styles.buttonTextSecondary}>Entrar na conta</Text>
            </Pressable>
          </>
        )}
        <Modal
          transparent={true}
          animationType="fade"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#8309d0"
              />
              <TextInput
                style={styles.input}
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
                placeholderTextColor="#8309d0"
              />
              <Pressable
                style={styles.loginButton}
                onPress={verificarLogin} 
                disabled={carregando}
              >
                <Button
                  title={carregando ? 'Entrando...' : 'Entrar'}
                  color="#8309d0"
                  onPress={verificarLogin} 
                />
              </Pressable>
              <Pressable onPress={() => setModalVisible(false)}>
                <Text style={styles.closeModalText}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
      <StatusBar style="light" />
    </ImageBackground>
  );
}