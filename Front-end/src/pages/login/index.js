import { StatusBar } from 'expo-status-bar';
import { ImageBackground, View, Text, Pressable, Modal, TextInput } from 'react-native';
import styles from './style.js';
import React, { useState } from 'react';

export default function Login({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

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
                onPress={() => {
                  // lógica de login aqui
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