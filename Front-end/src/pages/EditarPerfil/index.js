import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  Pressable, 
  ScrollView, 
  Alert, 
  ActivityIndicator, 
  TextInput 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import api from '../../utils/api'; 
import styles from './style';
import { useAuth } from './../../contexts/AuthContext';

const EditarPerfil = ({ navigation }) => {
  const { user, fetchUser } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [newImageInfo, setNewImageInfo] = useState(null);

  const [fotoUrl, setFotoUrl] = useState('');
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [emailUsuario, setEmailUsuario] = useState('');
  const [cepUsuario, setCepUsuario] = useState('');
  const [generoUsuario, setGeneroUsuario] = useState('');
  const [senhaUsuario, setSenhaUsuario] = useState('');

  // --- FUNÇÃO SEGURA PARA VOLTAR ---
  const handleVoltar = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      // Se não tiver histórico (deu reload), vai pra Home
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }
  };

  useEffect(() => {
    const carregarDadosDoUsuario = async () => {
      try {
        if (!user || !user.id) {
          // Se perdeu o usuário, manda pro login
          navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
          return;
        }

        const response = await api.get(`/usuarios/${user.id}`);
        const { nome, email, cep, genero, foto } = response.data;

        // Garante que os valores não sejam null (input trava com null)
        setNomeUsuario(nome || '');
        setEmailUsuario(email || '');
        setCepUsuario(cep || '');
        setGeneroUsuario(genero || '');
        setFotoUrl(foto);
      } catch (error) {
        console.error('Erro ao carregar:', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados.');
      } finally {
        setIsLoading(false);
      }
    };

    carregarDadosDoUsuario();
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
    const resultado = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!resultado.canceled) setNewImageInfo(resultado.assets[0].uri);
  };

  const escolherGaleria = async () => {
    if (!(await solicitarPermissao())) return;
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
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

      const response = await api.put(`/usuarios/${user.id}`, dadosUsuario);

      if (response.data && response.data.email) {
        Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
        await fetchUser(); // Atualiza o contexto
        handleVoltar(); // Usa a função segura de voltar
      } else {
        Alert.alert('Erro', 'Erro ao atualizar perfil.');
      }
    } catch (error) {
      console.error('Erro update:', error);
      Alert.alert('Erro', 'Não foi possível atualizar.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <ActivityIndicator size="large" color="#820AD1" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <Pressable 
          style={styles.profileAvatarWrapper} 
          onPress={escolherGaleria} 
          onLongPress={tirarFoto}
        >
          <Image 
            style={styles.profileAvatar} 
            source={
              newImageInfo
                ? { uri: newImageInfo }
                : fotoUrl
                ? { uri: fotoUrl }
                : require('../../../assets/icon.png')
            } 
          />
          <View style={styles.cameraIconContainer}>
            <Ionicons name="camera" size={20} color="#333" />
          </View>
        </Pressable>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.userName}>{nomeUsuario}</Text>

        <View style={styles.inputRow}>
          <Ionicons name="person-outline" size={22} color="#820AD1" style={styles.inputIcon} />
          <TextInput
            style={[styles.inputValue, { color: '#000' }]} // FORÇA A COR PRETA
            value={nomeUsuario}
            onChangeText={setNomeUsuario}
            placeholder="Nome completo"
            placeholderTextColor="#999"
            editable={true} // FORÇA SER EDITAVEL
          />
        </View>

        <View style={styles.inputRow}>
          <Ionicons name="mail-outline" size={22} color="#820AD1" style={styles.inputIcon} />
          <TextInput
            style={[styles.inputValue, { color: '#000' }]}
            value={emailUsuario}
            onChangeText={setEmailUsuario}
            placeholder="Email"
            placeholderTextColor="#999"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputRow}>
          <Ionicons name="location-outline" size={22} color="#820AD1" style={styles.inputIcon} />
          <TextInput
            style={[styles.inputValue, { color: '#000' }]}
            value={cepUsuario}
            onChangeText={setCepUsuario}
            placeholder="CEP"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputRow}>
          <Ionicons name="transgender-outline" size={22} color="#820AD1" style={styles.inputIcon} />
          <TextInput
            style={[styles.inputValue, { color: '#000' }]}
            value={generoUsuario}
            onChangeText={setGeneroUsuario}
            placeholder="Gênero"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputRow}>
          <Ionicons name="lock-closed-outline" size={22} color="#820AD1" style={styles.inputIcon} />
          <TextInput
            style={[styles.inputValue, { color: '#000' }]}
            value={senhaUsuario}
            onChangeText={setSenhaUsuario}
            placeholder="Nova Senha (opcional)"
            placeholderTextColor="#999"
            secureTextEntry
          />
        </View>

        <View style={styles.actionButtonsContainer}>
          {/* BOTÃO VOLTAR SEGURO */}
          <Pressable style={styles.backButton} onPress={handleVoltar}>
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