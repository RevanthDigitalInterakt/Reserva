import React, { useEffect, useRef } from 'react';
import {
  View, Animated,
} from 'react-native';
import { SvgUri } from 'react-native-svg';
import styles from './LoadingCheckout.styles';

function LoadingCheckout() {
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const rotation = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, { transform: [{ rotate: rotation }] }]} />
      <SvgUri
        uri="https://produtos-digitais.usereserva.com/icon-reserva-loading.svg"
        style={styles.backgroundImage}
      />
    </View>
  );
}

export default LoadingCheckout;
