import React, { useEffect } from 'react';

import {
  Animated, Easing, View, Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Box } from '@usereservaapp/reserva-ui';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

interface SkeletonProps {
  width?: number;
  height?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({ height, width }) => {
  const animatedValue = new Animated.Value(0);
  const { width: widthScreen, height: heightScreen } = Dimensions.get('screen');

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ).start();
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: width
      ? [-width * 2, width * 2]
      : [-widthScreen * 2, widthScreen * 2],
  });

  return (
    <Box alignItems="flex-start">
      <View
        style={{
          width: width || widthScreen,
          height: height || heightScreen,
          backgroundColor: '#a0a0a0',
          borderColor: '#b0b0b0',
        }}
      >
        <AnimatedLinearGradient
          colors={['#a0a0a0', '#b0b0b0', '#b0b0b0', '#a0a0a0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            transform: [{ translateX }],
          }}
        />
      </View>
    </Box>
  );
};
