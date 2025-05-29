import React from 'react';
import { Animated, View } from 'react-native';

import styles from './styles';
import configDeviceSizes from '../../../../utils/configDeviceSizes';

interface IBulletsAnimated {
  data: string[],
  scrollX: Animated.Value,
}

export function BulletsAnimated({ data, scrollX }: IBulletsAnimated) {
  return (
    <View style={styles.boxAnimatedBullets}>
      <Animated.View
        style={[
          styles.slidingIndicatorStyle,
          {
            position: 'absolute',
            transform: [
              {
                translateX: Animated.divide(
                  scrollX,
                  configDeviceSizes.DEVICE_WIDTH * 0.88 + 65,
                ).interpolate({
                  inputRange: [0, 1],
                  outputRange: [6, 25.8],
                }),
              },
            ],
          },
        ]}
      />

      {data?.map((item) => (
        <View key={`cards-item-${item}`} style={styles.bulletsWrapper}>
          <View style={styles.bullet} />
        </View>
      ))}
    </View>
  );
}
