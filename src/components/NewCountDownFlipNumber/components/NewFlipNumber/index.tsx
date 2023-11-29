import React, { useMemo } from 'react';
import { View } from 'react-native';
import testProps from '../../../../utils/testProps';
import styles from './styles';
import { NewNumberCard } from '../NewNumberCard';

interface NewFlipNumberProps {
  number: string;
  testID: string;
  clockBackgroundColor?: string;
  colorDivider?: string;
}

export function NewFlipNumber({
  number,
  testID,
  clockBackgroundColor,
  colorDivider,
}: NewFlipNumberProps) {
  const { previousNumber, nextNumber } = useMemo(
    () => ({
      previousNumber: number.toString().padStart(2, '0'),
      nextNumber: (Number(number) + 1).toString().padStart(2, '0'),
    }),
    [number],
  );

  return (
    <View style={styles.container} {...testProps(testID)}>
      <NewNumberCard
        number={nextNumber}
        previousNumber={previousNumber}
        perspective={250}
        clockBackgroundColor={clockBackgroundColor}
        colorDivider={colorDivider}
      />
    </View>
  );
}
