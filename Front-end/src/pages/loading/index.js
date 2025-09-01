import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Animated, ActivityIndicator, Text, View, Image } from 'react-native';
import styles from './style.js';

export default function Loading() {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    // Fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    // Fade out after 2s, then navigate (replace with your navigation logic)
    const timeout = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          navigation.replace('Login');
        }, 4000);
        timeout; // Limpa o timeout após a navegação
      });
    }, 2000);

    return () => clearTimeout(timeout);
  }, [fadeAnim]);

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

