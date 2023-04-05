import React from 'react';
import { View, StyleSheet } from 'react-native';
import testProps from '../../../../utils/testProps';

import NumberCard from './NumberCard';

interface IFlipNumber {
  number: any;
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
  number = parseInt(number) + 1;
  let previousNumber;
  previousNumber = number - 1;
  if (unit !== 'hours') {
    previousNumber = previousNumber === -1 ? 0 : previousNumber;
  } else {
    previousNumber = previousNumber === -1 ? 0 : previousNumber;
  }
  number = number < 10 ? `0${number}` : number;
  previousNumber = previousNumber < 10 ? `0${previousNumber}` : previousNumber;

  const numberSplit = number.toString();
  const previousNumberSplit = previousNumber.toString();
  return (
    <View style={style.wrapper} {...testProps(`com.usereserva:id/${testID}`)}>
      <NumberCard
        number={numberSplit}
        previousNumber={previousNumberSplit}
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
