import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './style';

export default function Home() {
  const [showBalance, setShowBalance] = useState(false);

  const toggleBalance = () => setShowBalance(!showBalance);

  const renderFlatListItem = ({ item }) => (
    <View style={styles.flatListItem}>
      <Text style={styles.flatListItemText}>{item.title}</Text>
    </View>
  );

  const options = [
    { id: '1', title: 'Área Pix' },
    { id: '2', title: 'Pagar' },
    { id: '3', title: 'Pagar com QR Code' },
    { id: '4', title: 'Recarga do celular' },
  ];

  const statements = [
    { id: '1', title: 'Compra no mercado' },
    { id: '2', title: 'Pagamento de boleto' },
    { id: '3', title: 'Transferência recebida' },
  ];

  return (
    <View style={styles.container}>
      {/* Header com perfil */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
          style={styles.avatar}
        />
        <Text style={styles.username}>Olá, João!</Text>
      </View>

      {/* Seção de saldo */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceTitle}>Saldo disponível</Text>
        <View style={styles.balanceRow}>
          <Text style={styles.balanceValue}>
            {showBalance ? 'R$ 5.600,00' : '••••••••'}
          </Text>
          <TouchableOpacity onPress={toggleBalance} style={styles.eyeButton}>
            <Ionicons
              name={showBalance ? 'eye-off' : 'eye'}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* FlatList Horizontal de Opções */}
      <FlatList
        data={options}
        horizontal
        renderItem={renderFlatListItem}
        keyExtractor={(item) => item.id}
        style={styles.flatListContainer}
      />

      {/* Meus Cartões */}
      <View style={styles.cardsSection}>
        <Text style={styles.sectionTitle}>Meus Cartões</Text>
        {/* Você pode adicionar os dados dos cartões aqui */}
      </View>

      {/* Extrato */}
      <View style={styles.statementsSection}>
        <Text style={styles.sectionTitle}>Extrato</Text>
        <FlatList
          data={statements}
          renderItem={renderFlatListItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}
