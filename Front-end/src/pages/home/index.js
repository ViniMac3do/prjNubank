import React, { useState, useEffect } from 'react'; 
import { useIsFocused } from '@react-navigation/native';
import { View, Text, Image, Pressable, FlatList, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './style';
import { useAuth } from './../../contexts/AuthContext'; 

export default function Home({ route, navigation }) {

  const [showBalance, setShowBalance] = useState(false);
  const toggleBalance = () => setShowBalance(!showBalance); //Futura funcao de mostrar valor que ha na conta
  const [usuario, setUsuario] = useState(null);
  const { user, token, signOut, fetchUser } = useAuth();
  const isFocused = useIsFocused();

  //Funcao para uma futura aba de logOut
  const handleLogout = () => {
    signOut();
    navigation.replace('Login'); 
  };

  //Funcao puxando o foco e o fetch user da AuthContext para assimilar o token do usuario
  useEffect(() => {
    if (isFocused && fetchUser) {
      console.log("Tela Home em foco, recarregando dados do usuário...");
      fetchUser(); 
    }
  }, [isFocused]);

  //Funcao que verifica se todos os dados assimilados do tokens estao corretos para navegar pra edicao
  const irParaPerfil = () => {
    if (user && user.id && token) {
      navigation.navigate(
        'EditarPerfil', 
        { 
          userId: user.id, 
          token: token 
        }
      );
    } else {
      console.log("Dados do usuário (ID ou Token) faltando. Não é possível navegar.");
      Alert.alert("Erro", "Não foi possível carregar os dados do perfil. Tente fazer login novamente.");
    };
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/*Header*/}
      <View style={styles.header}>
        <Pressable style={styles.headerLeft} onPress={irParaPerfil}>
          <Image
            source={user?.foto ? { uri: user.foto } : require('../../../assets/imagem-do-usuario-com-fundo-preto.png')}
            style={styles.avatar}
          />
          <Text style={styles.username}>Olá, {user?.nome ?? 'Usuário'}</Text>
        </Pressable>
        <View style={styles.headerRight}>
          <Pressable style={styles.headerIcon}>
            <Ionicons name="search" size={24} color="#fff" />
          </Pressable>
          <Pressable style={styles.headerIcon}>
            <Ionicons name="help-circle-outline" size={24} color="#fff" />
          </Pressable>
          <Pressable style={styles.headerIcon}>
            <Ionicons name="shield-checkmark-outline" size={24} color="#fff" />
          </Pressable>
        </View>
      </View>

      {/* Seção de saldo */}
      <Pressable style={styles.balanceContainer}>
        <View style={styles.balanceRow}>
          <Text style={styles.balanceTitle}>Saldo em conta</Text>
          <Ionicons name="chevron-forward-outline" size={22} color="#fff" />
        </View>
        <Text style={styles.balanceValue}>....</Text>
      </Pressable>

      {/* Ações Rápidas */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.actionsContainer}
        contentContainerStyle={{ paddingLeft: 20, paddingRight: 5 }}
      >
        <Pressable style={styles.actionButton}>
          <View style={styles.actionIconContainer}>
            <Ionicons name="server-outline" size={24} color="#fff" />
          </View>
          <Text style={styles.actionLabel}>Área Pix</Text>
        </Pressable>

        <Pressable style={styles.actionButton}>
          <View style={styles.actionIconContainer}>
            <Ionicons name="barcode-outline" size={24} color="#fff" />
          </View>
          <Text style={styles.actionLabel}>Pagar</Text>
        </Pressable>

        <Pressable style={styles.actionButton}>
          <View style={styles.actionIconContainer}>
            <Ionicons name="qr-code-outline" size={24} color="#fff" />
          </View>
          <Text style={styles.actionLabel}>Pagar com QR</Text>
        </Pressable>

        <Pressable style={styles.actionButton}  onPress={() => navigation.navigate('Extrato')} >
          <View style={styles.actionIconContainer}>
          <Ionicons name="cash-outline" size={24} color="#fff" />
          </View>
          <Text style={styles.actionLabel}>Extrato</Text>
        </Pressable>
      </ScrollView>

      {/* Meus Cartões */}
      <Pressable style={styles.myCardsButton}>
        <Ionicons name="card-outline" size={24} color="black" />
        <Text style={styles.myCardsButtonText}>Meus cartões</Text>
      </Pressable>

      {/* Seção Caixinhas */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Total em Caixinhas</Text>
        <Text style={styles.sectionValue}>....</Text>
        <View style={styles.caixinhasContainer}>
          <Pressable style={styles.caixinhaButton}>
            <Text style={styles.caixinhaTitle}>Focar na carreira</Text>
            <Text style={styles.caixinhaValue}>....</Text>
          </Pressable>
          <Pressable style={[styles.caixinhaButton, styles.createCaixinhaButton]}>
            <Ionicons name="add" size={24} color="#fff" />
            <Text style={styles.createCaixinhaText}>Criar caixinha</Text>
          </Pressable>
        </View>
      </View>

      {/* Seção de Promoções */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Compre sem sair do app</Text>
        <Pressable style={styles.promoCard}>
          <Ionicons name="gift-outline" size={24} color="#fff" />
          <View style={styles.promoTextContainer}>
            <Text style={styles.promoTitle}>Gift cards para você</Text>
            <Text style={styles.promoDescription}>
              Compre as marcas que mais curte
            </Text>
          </View>
          <Pressable style={styles.promoButton}>
            <Text style={styles.promoButtonText}>Conhecer</Text>
          </Pressable>
        </Pressable>
      </View>

      {/* Seção Descubra Mais */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Descubra mais</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 20, paddingRight: 5 }}
        >
          <Pressable style={styles.discoverCard}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=4' }}
              style={styles.discoverCardImage}
            />
            <Text style={styles.discoverCardTitle}>Indique o Nu para amigos</Text>
            <Text style={styles.discoverCardDescription}>
              Espalhe como é simples estar no controle.
            </Text>
            <Pressable style={styles.discoverButton}>
              <Text style={styles.discoverButtonText}>Indicar amigos</Text>
            </Pressable>
          </Pressable>

          <Pressable style={styles.discoverCard}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=5' }}
              style={styles.discoverCardImage}
            />
            <Text style={styles.discoverCardTitle}>Portabilidade de salário</Text>
            <Text style={styles.discoverCardDescription}>
              Liberdade é escolher seu dinheiro.
            </Text>
            <Pressable style={styles.discoverButton}>
              <Text style={styles.discoverButtonText}>Conhecer</Text>
            </Pressable>
          </Pressable>
        </ScrollView>
      </View>


    </ScrollView>
  );
}
