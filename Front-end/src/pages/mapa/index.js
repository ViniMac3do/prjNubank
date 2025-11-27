import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Image, Alert } from 'react-native'; // <--- Trocamos TouchableOpacity por Pressable
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { styles, nubankPurple } from './style';

export default function Mapa({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState('');
  const [searchedLocation, setSearchedLocation] = useState(null);

  const [points, setPoints] = useState([
    { id: 1, latitude: -23.542385, longitude: -46.414466, title: 'Caixa 1 - Estação', description: 'Saída principal.' },
    { id: 2, latitude: -23.543000, longitude: -46.415200, title: 'Caixa 2 - Terminal', description: 'Terminal Norte.' },
    { id: 3, latitude: -23.541800, longitude: -46.413800, title: 'Caixa 3 - Mercado', description: 'Mercado Municipal.' },
    { id: 4, latitude: -23.542900, longitude: -46.413500, title: 'Caixa 4 - S. Gianetti', description: 'Rua Salvador Gianetti.' },
    { id: 5, latitude: -23.541500, longitude: -46.415500, title: 'Caixa 5 - Praça', description: 'Praça de eventos.' },
  ]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão negada');
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  const handleSearchLocation = async () => {
    if (address.trim() === '') {
      Alert.alert('Atenção', 'Insira um endereço');
      return;
    }
    try {
      const result = await Location.geocodeAsync(address);
      if (result.length > 0) {
        const { latitude, longitude } = result[0];
        setSearchedLocation({ latitude, longitude });
      } else {
        Alert.alert('Erro', 'Endereço não encontrado');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro na busca');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable 
          onPress={() => navigation.navigate('Home')}
          style={({ pressed }) => [
            styles.backButton, 
            pressed && { opacity: 0.5, backgroundColor: '#f0f0f0', borderRadius: 20 }
          ]}
        >
           <Ionicons name="arrow-back" size={28} color={nubankPurple} />
        </Pressable>
        <Text style={styles.headerTitle}>Caixas Próximos</Text>
      </View>

      {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.nubankInput}
          placeholder="Digite o endereço ou CEP"
          placeholderTextColor="#999"
          value={address}
          onChangeText={setAddress}
        />
        
        <Pressable 
          onPress={handleSearchLocation}
          style={({ pressed }) => [
            styles.nubankButton,
            pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] } 
          ]}
        >
          <Text style={styles.nubankButtonText}>Buscar Localização</Text>
        </Pressable>
      </View>

      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Você está aqui"
            pinColor={nubankPurple}
          />

          {points.map((point) => (
            <Marker
              key={point.id}
              coordinate={{ latitude: point.latitude, longitude: point.longitude }}
              title={point.title}
              description={point.description}
              onPress={() => setSearchedLocation(null)}
            >
              <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2953/2953363.png' }}
                style={{ width: 40, height: 40, tintColor: nubankPurple }}
                resizeMode="contain"
                />
            </Marker>
          ))}

          {searchedLocation && (
            <Marker
              coordinate={searchedLocation}
              title="Endereço Buscado"
              description={address}
              onPress={() => setSearchedLocation(null)}
            >
               <Ionicons name="location" size={40} color="#0099CC" />
            </Marker>
          )}
        </MapView>
      ) : (
        <View style={styles.loadingContainer}>
           <Text style={styles.loadingText}>Carregando mapa...</Text>
        </View>
      )}
    </View>
  );
}