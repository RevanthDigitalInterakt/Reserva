import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import type { BoxProps } from '@usereservaapp/reserva-ui';

interface SkeletonProps extends BoxProps {
  testID?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ children, ...props }) => {
  const skeletonOpacity = useRef(new Animated.Value(1)).current;

  const animationSkeletonLoading = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(skeletonOpacity, {
          useNativeDriver: true,
          toValue: 0.3,
          duration: 300,
        }),
        Animated.timing(skeletonOpacity, {
          useNativeDriver: true,
          toValue: 1,
          duration: 300,
          delay: 300,
        }),
      ]),
      {
        iterations: -1,
      },
    ).start();
  };

  useEffect(() => {
    animationSkeletonLoading();
  }, []);

  return (
    <Animated.View style={{ opacity: skeletonOpacity }} testID={props.testID}>
      {children}
    </Animated.View>
  );
};
