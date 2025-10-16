import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, ScrollView, Alert, ActivityIndicator, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import styles from './style';
import { useAuth } from './../../contexts/AuthContext';

const EditarPerfil = ({ navigation }) => {
  const { user, token, fetchUser } = useAuth();
  const API_URL = 'http://127.0.0.1:8000/api';

  const [isLoading, setIsLoading] = useState(true);
  const [newImageInfo, setNewImageInfo] = useState(null);

  const [fotoUrl, setFotoUrl] = useState('');
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [emailUsuario, setEmailUsuario] = useState('');
  const [cepUsuario, setCepUsuario] = useState('');
  const [generoUsuario, setGeneroUsuario] = useState('');
  const [senhaUsuario, setSenhaUsuario] = useState('');


  const api = axios.create({
    baseURL: API_URL,
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    const carregarDadosDoUsuario = async () => {
      try {
        const response = await api.get(`/usuarios/${user.id}`);
        const { nome, email, cep, genero, foto } = response.data;

        setNomeUsuario(nome);
        setEmailUsuario(email);
        setCepUsuario(cep);
        setGeneroUsuario(genero);
        setFotoUrl(foto);
      } catch (error) {
        console.error('Erro ao carregar dados:', error.response?.data || error.message);
        Alert.alert('Erro', 'Não foi possível carregar os dados do perfil.');
      } finally {
        setIsLoading(false);
      }
    };

    if (user && user.id && token) carregarDadosDoUsuario();
    else navigation.goBack();
  }, []);

  const solicitarPermissao = async () => {
    const camera = await ImagePicker.requestCameraPermissionsAsync();
    const galeria = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (camera.status !== 'granted' || galeria.status !== 'granted') {
      Alert.alert('Permissão negada', 'É necessário permitir acesso à câmera e galeria');
      return false;
    }
    return true;
  };

  const tirarFoto = async () => {
    if (!(await solicitarPermissao())) return;
    const resultado = await ImagePicker.launchCameraAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, quality: 1 });
    if (!resultado.canceled) setNewImageInfo(resultado.assets[0].uri);
  };

  const escolherGaleria = async () => {
    if (!(await solicitarPermissao())) return;
    const resultado = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, quality: 1 });
    if (!resultado.canceled) setNewImageInfo(resultado.assets[0].uri);
  };

const atualizar = async () => {
  try {
    setIsLoading(true);

    const dadosUsuario = {
      nomeUsuario,
      emailUsuario,
      cepUsuario,
      generoUsuario,
    };

    if (senhaUsuario) dadosUsuario.senhaUsuario = senhaUsuario;

    const response = await axios.put(
      `http://127.0.0.1:8000/api/usuarios/${user.id}`,
      dadosUsuario,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data && response.data.email) {
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
      fetchUser();
      navigation.goBack();
    } else {
      Alert.alert('Erro', 'Erro ao atualizar perfil. Tente novamente!');
    }
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error.response?.data || error.message);
    Alert.alert('Erro', error.response?.data?.erro || 'Não foi possível atualizar o perfil.');
  } finally {
    setIsLoading(false);
  }
};



  if (isLoading) return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <ActivityIndicator size="large" color="#820AD1" />
      <Text>Carregando dados...</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Pressable style={styles.profileAvatarWrapper} onPress={escolherGaleria} onLongPress={tirarFoto}>
          <Image style={styles.profileAvatar} source={newImageInfo ? { uri: newImageInfo } : fotoUrl ? { uri: fotoUrl } : require('../../../assets/icon.png')} />
          <View style={styles.cameraIconContainer}>
            <Ionicons name="camera" size={20} color="#333" />
          </View>
        </Pressable>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.userName}>{nomeUsuario}</Text>

        <View style={styles.inputRow}>
          <Ionicons name="person-outline" size={22} color="#820AD1" style={styles.inputIcon} />
          <TextInput style={styles.inputValue} value={nomeUsuario} onChangeText={setNomeUsuario} placeholder="Nome completo" />
        </View>

        <View style={styles.inputRow}>
          <Ionicons name="mail-outline" size={22} color="#820AD1" style={styles.inputIcon} />
          <TextInput style={styles.inputValue} value={emailUsuario} onChangeText={setEmailUsuario} placeholder="Email" keyboardType="email-address" />
        </View>

        <View style={styles.inputRow}>
          <Ionicons name="location-outline" size={22} color="#820AD1" style={styles.inputIcon} />
          <TextInput style={styles.inputValue} value={cepUsuario} onChangeText={setCepUsuario} placeholder="CEP" keyboardType="numeric" />
        </View>

        <View style={styles.inputRow}>
          <Ionicons name="transgender-outline" size={22} color="#820AD1" style={styles.inputIcon} />
          <TextInput style={styles.inputValue} value={generoUsuario} onChangeText={setGeneroUsuario} placeholder="Gênero" />
        </View>

        <View style={styles.inputRow}>
          <Ionicons name="lock-closed-outline" size={22} color="#820AD1" style={styles.inputIcon} />
          <TextInput style={styles.inputValue} value={senhaUsuario} onChangeText={setSenhaUsuario} placeholder="Senha" secureTextEntry />
        </View>

        <View style={styles.actionButtonsContainer}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Voltar</Text>
          </Pressable>
          <Pressable style={styles.saveButton} onPress={atualizar}>
            <Text style={styles.saveButtonText}>Salvar Alterações</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditarPerfil;
