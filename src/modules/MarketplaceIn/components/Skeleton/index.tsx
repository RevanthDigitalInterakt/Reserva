import { Box } from '@usereservaapp/reserva-ui';
import React, { useEffect } from 'react';
import {
  View, Dimensions, Animated, StyleSheet, Easing,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');
const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);

const Skeleton = () => {
  const animatedValue = new Animated.Value(0);
  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear.inOut,
        useNativeDriver: true,
      }),
    ).start();
  });
  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });
  return (
    <Box>
      <View
        style={{
          backgroundColor: '#a0a0a0',
          borderColor: '#b0b0b0',
          height: 540,
          width,
        }}
      >
        <AnimatedLG
          colors={['#a0a0a0', '#b0b0b0', '#b0b0b0', '#a0a0a0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            ...StyleSheet.absoluteFill,
            transform: [{ translateX }],
          }}
        />
      </View>
      <Box
        style={{
          marginTop: 50,
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {[0, 1, 2, 3, 4].map((k) => (
          <View
            key={k}
            style={{
              marginLeft: 20,
              backgroundColor: '#a0a0a0',
              borderColor: '#b0b0b0',
              height: 63,
              width: 63,
              borderRadius: 108 / 2,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};
export default Skeleton;
