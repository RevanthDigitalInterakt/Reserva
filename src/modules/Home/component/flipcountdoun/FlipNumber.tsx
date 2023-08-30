import React, { useMemo } from 'react';
import { View } from 'react-native';
import testProps from '../../../../utils/testProps';

import NumberCard from './NumberCard';
import configDeviceSizes from '../../../../utils/configDeviceSizes';

interface IFlipNumber {
  number: string;
  size?: number;
  clockBackgroundColor: string;
  testID: string;
  colorDivider: string;
}

function FlipNumber({
  number,
  size,
  clockBackgroundColor = '#1A1A1A',
  colorDivider = '#1f1f1f',
  testID,
}: IFlipNumber) {
  const {
    previousNumber,
    nextNumber,
  } = useMemo(() => ({
    previousNumber: number.toString().padStart(2, '0'),
    nextNumber: (Number(number) + 1).toString().padStart(2, '0'),
  }), [number]);

  return (
    <View style={{ flexDirection: 'row' }} {...testProps(testID)}>
      <NumberCard
        number={nextNumber}
        previousNumber={previousNumber}
        size={size || (configDeviceSizes.DEVICE_WIDTH / 8)}
        perspective={250}
        clockBackgroundColor={clockBackgroundColor}
        colorDivider={colorDivider}
      />
    </View>
  );
}

export default FlipNumber;
