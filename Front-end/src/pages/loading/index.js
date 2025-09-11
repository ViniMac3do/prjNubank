import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Animated, ActivityIndicator, Image } from 'react-native';
import styles from './style.js';

export default function Loading({ navigation }) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
  
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500, 
          useNativeDriver: true,
        }).start(() => {
          navigation.replace('Login');
        });
      }, 1000); 
    });
  }, [fadeAnim, navigation]);

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