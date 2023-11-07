import React from 'react';
import { Text, View } from 'react-native';

import configDeviceSizes from '../../utils/configDeviceSizes';

import { styles } from './FlagDiscount.styles';
import type { IFlagDiscount } from './FlagDiscount.types';

export function FlagDiscount({ discountTag, isDetail }: IFlagDiscount) {
  return (
    <View style={{
      ...styles.box,
      marginLeft: isDetail ? 4 : 14,
      marginTop: 4,
      padding: isDetail ? 6 : 4,
    }}
    >
      <Text style={{
        ...styles.textPercentage,
        fontSize: isDetail ? 20 : configDeviceSizes.DEVICE_WIDTH * 0.040,
      }}
      >
        {discountTag}
        %
      </Text>

      <Text style={{
        ...styles.textOff,
        fontSize: isDetail ? 20 : configDeviceSizes.DEVICE_WIDTH * 0.040,
      }}
      >
        OFF
      </Text>
    </View>
  );
}
