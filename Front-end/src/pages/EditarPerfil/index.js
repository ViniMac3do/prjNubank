import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Image, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../contexts/AuthContext';
import styles from './style';

export default function EditarPerfil({ navigation }) {
  const { user, updateUser } = useAuth();

  const [nome, setNome] = useState(user?.nome || '');
  const [email, setEmail] = useState(user?.email || '');
  const [telefone, setTelefone] = useState(user?.telefone || '');
  const [foto, setFoto] = useState(user?.foto || null);
  const cpf = user?.cpf || 'Não informado';

  useEffect(() => {
    // Solicitar permissões ao montar a tela
    (async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (cameraStatus.status !== 'granted' || galleryStatus.status !== 'granted') {
        Alert.alert('Permissão necessária', 'É necessário permitir o acesso à câmera e à galeria para alterar a foto.');
      }
    })();
  }, []);

  const escolherDaGaleria = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  };

  const tirarFoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  };

  const showImageOptions = () => {
    Alert.alert(
      "Alterar Foto",
      "Escolha uma opção",
      [
        { text: "Tirar Foto", onPress: tirarFoto },
        { text: "Escolher da Galeria", onPress: escolherDaGaleria },
        { text: "Cancelar", style: "cancel" }
      ]
    );
  };

  const handleSaveChanges = async () => {
    const updatedUserData = {
      ...user,
      nome,
      email,
      telefone,
      foto,
    };

    // Simula uma chamada de API para o backend
    // Em um app real, você faria a chamada aqui e esperaria a confirmação
    try {
      // Sucesso simulado
      await updateUser(updatedUserData);
      Alert.alert('Sucesso', 'Seu perfil foi atualizado.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o perfil. Tente novamente.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.avatarContainer}>
        <Pressable onPress={showImageOptions}>
          <Image
            source={{ uri: foto || 'https://i.pravatar.cc/150?img=3' }}
            style={styles.avatar}
          />
          <View style={styles.changeAvatarButton}>
            <Ionicons name="camera" size={24} color="#fff" />
          </View>
        </Pressable>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome Completo</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={styles.input}
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>CPF</Text>
        <TextInput
          style={[styles.input, styles.disabledInput]}
          value={cpf}
          editable={false}
        />
      </View>

      <Pressable style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </Pressable>
    </ScrollView>
  );
}