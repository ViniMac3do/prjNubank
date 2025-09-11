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

  const statements = [
    { id: '1', title: 'Compra no mercado' },
    { id: '2', title: 'Pagamento de boleto' },
    { id: '3', title: 'Transferência recebida' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header com perfil */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
            style={styles.avatar}
          />
          <Text style={styles.username}>Olá, Nicolas</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="search" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="help-circle-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="shield-checkmark-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Seção de saldo */}
      <TouchableOpacity style={styles.balanceContainer}>
        <View style={styles.balanceRow}>
          <Text style={styles.balanceTitle}>Saldo em conta</Text>
          <Ionicons name="chevron-forward-outline" size={22} color="#fff" />
        </View>
        <Text style={styles.balanceValue}>....</Text>
      </TouchableOpacity>

      {/* Ações Rápidas */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.actionsContainer}
        contentContainerStyle={{ paddingLeft: 20, paddingRight: 5 }}
      >
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionIconContainer}>
            <Ionicons name="server-outline" size={24} color="#fff" />
          </View>
          <Text style={styles.actionLabel}>Área Pix</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionIconContainer}>
            <Ionicons name="barcode-outline" size={24} color="#fff" />
          </View>
          <Text style={styles.actionLabel}>Pagar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionIconContainer}>
            <Ionicons name="qr-code-outline" size={24} color="#fff" />
          </View>
          <Text style={styles.actionLabel}>Pagar com QR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionIconContainer}>
            <Ionicons name="phone-portrait-outline" size={24} color="#fff" />
          </View>
          <Text style={styles.actionLabel}>Recarga</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Meus Cartões */}
      <TouchableOpacity style={styles.myCardsButton}>
        <Ionicons name="card-outline" size={24} color="black" />
        <Text style={styles.myCardsButtonText}>Meus cartões</Text>
      </TouchableOpacity>

      {/* Seção Caixinhas */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Total em Caixinhas</Text>
        <Text style={styles.sectionValue}>....</Text>
        <View style={styles.caixinhasContainer}>
          <TouchableOpacity style={styles.caixinhaButton}>
            <Text style={styles.caixinhaTitle}>Focar na carreira</Text>
            <Text style={styles.caixinhaValue}>....</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.caixinhaButton, styles.createCaixinhaButton]}>
            <Ionicons name="add" size={24} color="#fff" />
            <Text style={styles.createCaixinhaText}>Criar caixinha</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Seção de Promoções */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Compre sem sair do app</Text>
        <TouchableOpacity style={styles.promoCard}>
          <Ionicons name="gift-outline" size={24} color="#fff" />
          <View style={styles.promoTextContainer}>
            <Text style={styles.promoTitle}>Gift cards para você</Text>
            <Text style={styles.promoDescription}>
              Compre as marcas que mais curte
            </Text>
          </View>
          <TouchableOpacity style={styles.promoButton}>
            <Text style={styles.promoButtonText}>Conhecer</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      {/* Seção Descubra Mais */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Descubra mais</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 20, paddingRight: 5 }}
        >
          <TouchableOpacity style={styles.discoverCard}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=4' }}
              style={styles.discoverCardImage}
            />
            <Text style={styles.discoverCardTitle}>Indique o Nu para amigos</Text>
            <Text style={styles.discoverCardDescription}>
              Espalhe como é simples estar no controle.
            </Text>
            <TouchableOpacity style={styles.discoverButton}>
              <Text style={styles.discoverButtonText}>Indicar amigos</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity style={styles.discoverCard}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=5' }}
              style={styles.discoverCardImage}
            />
            <Text style={styles.discoverCardTitle}>Portabilidade de salário</Text>
            <Text style={styles.discoverCardDescription}>
              Liberdade é escolher seu dinheiro.
            </Text>
            <TouchableOpacity style={styles.discoverButton}>
              <Text style={styles.discoverButtonText}>Conhecer</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Extrato (removido por enquanto para simplificar) */}
      {/* <View style={styles.statementsSection}>
        <Text style={styles.sectionTitle}>Extrato</Text>
        <FlatList
          data={statements}
          renderItem={renderFlatListItem}
          keyExtractor={(item) => item.id}
        />
      </View> */}

      {/* Botão de Avaliação */}
      <TouchableOpacity style={styles.rateButton}>
        <Ionicons name="heart-outline" size={24} color="#fff" />
        <Text style={styles.rateButtonText}>Avalie esta tela</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
