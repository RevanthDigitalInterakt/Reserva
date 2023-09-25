import React, { forwardRef } from 'react';
import { Animated, View, Text } from 'react-native';
import testProps from '../../../../utils/testProps';
import styles from './styles';

interface IFlipCard {
  type: 'front' | 'back';
  number: string;
  testID: string;
}

export const NewFlipCard = forwardRef((props: IFlipCard, ref) => {
  const { type, number, testID } = props;

  return (
    <Animated.View
      {...testProps(testID)}
      ref={ref}
      style={
        styles({
          isFront: type === 'front',
        }).container
      }
    >
      <View style={styles({}).overflowContainer}>
        <Text
          {...testProps(`com.usereserva:id/flip_card_number_${type}`)}
          style={
            styles({
              isFront: type === 'front',
            }).number
          }
        >
          {number}
        </Text>
      </View>
    </Animated.View>
  );
});
