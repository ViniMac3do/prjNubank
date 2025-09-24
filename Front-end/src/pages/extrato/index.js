import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, FlatList, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import styles from './style';

export default function Extrato({ route, navigation }) {
  const [carregando, setCarregando] = useState(false);


  const pegarDados = async () => {
    try {
      const dados = await axios.get(`http://127.0.0.1:8000/extrato/{$id}`);
      console.log('Resposta da API para o get na tela extrato:', dados.data);
      setUsuario(dados.data);

    } catch (erro) {
      console.error('Erro na requisição:', erro);
      Alert.alert('Erro', 'Erro ao conectar com o servidor.');
    }
  };
  const valores = [
    {
        id: '1',
        nome: 'Ricardo',
        data: '25/03/2025',
        valor: '500',
        status: 'recebido'
        
    },
    {
        id: '2',
        nome: 'Milena',
        data: '25/03/2025',
        valor: '1000',
        status: 'enviado'
        
    },
    {
        id: '3',
        nome: 'Leandro',
        data: '25/03/2025',
        valor: '3000',
        status: 'recebido'
        
    }

  ]

  
  const renderExtrato = ({ item }) => (
    <View style={styles.template}>
      <Ionicons name="cash-outline" size={40} color="#555" style={{ marginRight: 12, marginLeft: 12 }} />
      <View style={{ flex: 1 }}>
        <Text style={[styles.valorTexto, { color: item.status === 'recebido' ? 'green' : 'red' }]}>
          R$ {item.valor}
        </Text>
        <Text style={{ fontSize: 16, color: '#fff' }}>{item.nome}</Text>
        <Text style={{ fontSize: 14, color: '#f1f1f1' }}>{item.data}</Text>
      </View>
    </View>
  );
  

  {/* Conexao necessaria quando adicionar sistema de extrato ligado ao banco de dados
    
  const pegarDados = async () => {
    try {
      const dados = await axios.get(`http://127.0.0.1:8000/api/usuarios/email/${emailUsuario}`);
      console.log('Resposta da API para o get na tela home:', dados.data);
      setUsuario(dados.data);

      const respostaCep = await axios.get(`https://viacep.com.br/ws/${dados.data.cep}/json/`);
      setUbs(respostaCep.data);
    } catch (erro) {
      console.error('Erro na requisição:', erro);
      Alert.alert('Erro', 'Erro ao conectar com o servidor.');
    }
  };
    */}

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
            <Pressable onPress={() => navigation.navigate('Home')} >
            <Ionicons name="home-outline"  style={styles.icon} size={24}/>
            </Pressable>
          <Text style={styles.title}>Extrato</Text>
          <Ionicons name="search" size={24} color="#fff" />
        </View>
      </View>

      {/* Seção de extratos */}
      <FlatList
        data={valores} 
        renderItem={renderExtrato}
        keyExtractor={item => item.id}
        />

    </ScrollView>
  );
}
