import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { registerRootComponent } from 'expo';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/AuthContext';
import { loadApiUrl } from './src/utils/api';

import Loading from './src/pages/loading/index.js';
import Login from './src/pages/login/index.js';
import Cadastro from './src/pages/cadastro/index.js';
import Home from './src/pages/home/index.js';
import Extrato from './src/pages/extrato/index.js';
import EditarPerfil from './src/pages/EditarPerfil/index.js';
import ConfigIP from './src/pages/ConfigIp/index.js';
import Mapa from './src/pages/mapa/index.js'

const Stack = createStackNavigator();

function Main() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await loadApiUrl();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <ActivityIndicator size="large" color="#8309d0" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Loading" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Loading" component={Loading} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Extrato" component={Extrato} />
          <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
          <Stack.Screen name="ConfigIP" component={ConfigIP} />
          <Stack.Screen name="Mapa" component={Mapa} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

registerRootComponent(Main);