import React, { useState, useCallback } from 'react';
import { View, Text, Pressable, Image, Alert, ScrollView, Modal, TextInput, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../contexts/AuthContext';
import styles from './style';
import { useFocusEffect } from '@react-navigation/native';

// Componente reutilizável para cada linha de informação
const InfoRow = ({ icon, label, value, onPress }) => (
  <Pressable style={styles.inputRow} onPress={onPress}>
    <Ionicons name={icon} size={24} color="#820AD1" style={styles.inputIcon} />
    <Text style={styles.inputLabel}>{label}</Text>
    <Text style={styles.inputValue}>{value}</Text>
    <Ionicons name="chevron-forward-outline" size={22} color="#ccc" />
  </Pressable>
);

export default function EditarPerfil({ navigation }) {
  const { user, updateUser } = useAuth();

  // Estados para os campos do formulário
  const [nome, setNome] = useState(user?.nome || '');
  const [email, setEmail] = useState(user?.email || '');
  const [cep, setCep] = useState(user?.cep || 'Não informado');
  const [genero, setGenero] = useState(user?.genero || 'Não informado');
  const [foto, setFoto] = useState(user?.foto || null);

  // Estados para o controle do Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const [tempValue, setTempValue] = useState('');

  // Hook para resetar o estado do formulário sempre que a tela ganhar foco
  useFocusEffect(
    useCallback(() => {
      setNome(user?.nome || '');
      setEmail(user?.email || '');
      setCep(user?.cep || 'Não informado');
      setGenero(user?.genero || 'Não informado');
      setFoto(user?.foto || null);
    }, [user])
  );

  const handleEdit = (field, value, setter) => {
    setCurrentField({ field, setter });
    setTempValue(value);
    setModalVisible(true);
  };

  const saveFieldChange = () => {
    if (currentField) {
      currentField.setter(tempValue);
    }
    setModalVisible(false);
    setCurrentField(null);
  };

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
    Alert.alert("Alterar Foto de Perfil", "Escolha uma opção:",
      [{ text: "Tirar Foto", onPress: tirarFoto }, { text: "Escolher da Galeria", onPress: escolherDaGaleria }, { text: "Cancelar", style: "cancel" }]
    );
  };

  const handleSaveChanges = async () => {
    const updatedUserData = { ...user, nome, email, cep, genero, foto };
    try {
      await updateUser(updatedUserData);
      Alert.alert('Sucesso', 'Seu perfil foi atualizado.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o perfil.');
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.centeredView}>
            <TouchableWithoutFeedback>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Editar {currentField?.field}</Text>
                <TextInput
                  style={styles.modalInput}
                  onChangeText={setTempValue}
                  value={tempValue}
                  autoFocus={true}
                />
                <View style={styles.modalButtonContainer}>
                  <Pressable
                    style={[styles.modalButton, styles.buttonCancel]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyleCancel}>Cancelar</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.modalButton, styles.buttonSave]}
                    onPress={saveFieldChange}
                  >
                    <Text style={styles.textStyle}>Salvar</Text>
                  </Pressable>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <View style={styles.header} />

      <View style={styles.avatarContainer}>
        <Image source={{ uri: foto || 'https://i.pravatar.cc/150?img=3' }} style={styles.avatar} />
        <Pressable style={styles.cameraIcon} onPress={showImageOptions}>
          <Ionicons name="camera" size={24} color="#820AD1" />
        </Pressable>
      </View>

      <View style={styles.formContainer}>
        <InfoRow icon="person-outline" label="Nome completo" value={nome} onPress={() => handleEdit('Nome', nome, setNome)} />
        <InfoRow icon="mail-outline" label="E-mail" value={email} onPress={() => handleEdit('E-mail', email, setEmail)} />
        <InfoRow icon="location-outline" label="CEP" value={cep} onPress={() => handleEdit('CEP', cep, setCep)} />
        <InfoRow icon="transgender-outline" label="Gênero" value={genero} onPress={() => handleEdit('Gênero', genero, setGenero)} />
        <InfoRow icon="lock-closed-outline" label="Alterar Senha" value="" onPress={() => navigation.navigate('AlterarSenha')} />
      </View>

      <Pressable style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </Pressable>
    </ScrollView>
  );
}