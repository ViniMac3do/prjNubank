import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { Alert } from 'react-native';
import { ImageBackground, View, Text, Pressable, Modal, TextInput } from 'react-native';
import styles from './style.js';
import React, { useState } from 'react';

export default function Login({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [carregando, setCarregando] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
      const resposta = await axios.get('http://127.0.0.1:8000/api/usuarios'); // ← Substitua pelo seu IP local

      console.log('Resposta da API:', resposta.data);

      const usuarios = resposta.data;

      const usuarioEncontrado = usuarios.find(
        (usuario) =>
          usuario.email === email &&
          usuario.senha === senha
      );

      if (usuarioEncontrado) {
        Alert.alert('Sucesso', 'Login bem-sucedido!');
        setModalVisible(false);
        navigation.navigate('Home', { emailUsuario: email });
      } else {
        Alert.alert('Erro', 'Email ou senha incorretos.');
      }
    } catch (erro) {
      console.error('Erro na requisição:', erro);
      Alert.alert('Erro', 'Erro ao conectar com o servidor.');
    }

    setCarregando(false);
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
                title={carregando ? 'Entrando...' : 'Entrar'}
                
                onPress={() => {
                  console.log('Botão logar pressionado');
                  verificarLogin();
                }}
              >
                <Text style={styles.loginButtonText}>Logar</Text>
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