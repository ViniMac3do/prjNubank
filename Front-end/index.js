import { registerRootComponent } from 'expo';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Loading from './src/pages/loading/index.js';
import Login from './src/pages/login/index.js';
import Cadastro from './src/pages/cadastro/index.js';
import Home from './src/pages/home/index.js';
import Extrato from './src/pages/extrato/index.js';
import EditarPerfil from './src/pages/EditarPerfil/index.js';
import AlterarSenha from './src/pages/AlterarSenha/index.js';

//Auth para englobar o projeto com as informacoes do usuario logado
import { AuthProvider } from './src/contexts/AuthContext';


// Criando o Stack
const Stack = createStackNavigator();

function Main() {
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
          <Stack.Screen name="AlterarSenha" component={AlterarSenha} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

// Registrar o componente raiz
registerRootComponent(Main);
