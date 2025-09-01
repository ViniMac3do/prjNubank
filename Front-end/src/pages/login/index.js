import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Animated, ActivityIndicator,  Text, View, Image } from 'react-native';
import styles from './style.js';

export default function Login() {

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Image
        source={require('../../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="#FFF" />
    </Animated.View>
  );
}

