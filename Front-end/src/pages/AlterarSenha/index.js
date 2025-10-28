import React from 'react';
import { View, Text, Pressable } from 'react-native';
import styles from './style';

export default function AlterarSenha({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Alterar Senha</Text>
      <Text style={{ textAlign: 'center', marginBottom: 20, color: '#666' }}>
        Esta funcionalidade ainda será implementada.
      </Text>
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </Pressable>
    </View>
  );
}