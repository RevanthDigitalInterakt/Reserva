import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import testProps from '../../../../utils/testProps';

import NumberCard from './NumberCard';

interface IFlipNumber {
  number: string;
  unit: 'hours' | 'minutes' | 'seconds';
  size: number;
  perspective: number;
  clockBackgroundColor: string;
  testID: string;
  colorDivider: string;
}
function FlipNumber({
  number,
  unit,
  size,
  perspective,
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
    <View style={style.wrapper} {...testProps(`com.usereserva:id/${testID}`)}>
      <NumberCard
        number={nextNumber}
        previousNumber={previousNumber}
        size={size}
        perspective={perspective}
        clockBackgroundColor={clockBackgroundColor}
        colorDivider={colorDivider}
      />
    </View>
  );
}

export default FlipNumber;

const style = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
  },
});
