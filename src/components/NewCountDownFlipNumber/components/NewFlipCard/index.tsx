import React, { forwardRef } from 'react';
import { Animated, View, Text } from 'react-native';
import testProps from '../../../../utils/testProps';
import styles from './styles';

interface IFlipCard {
  type: 'front' | 'back';
  number: string;
  testID: string;
  clockBackgroundColor?: string;
  colorDivider?: string;
}

export const NewFlipCard = forwardRef(
  ({
    type, number, testID, clockBackgroundColor, colorDivider,
  }: IFlipCard, ref) => {
    const containerStyle = styles({ isFront: type === 'front' }).container;

    return (
      <Animated.View
        {...testProps(testID)}
        ref={ref}
        style={{
          ...containerStyle,
          backgroundColor: clockBackgroundColor || containerStyle.backgroundColor,
          borderColor: colorDivider || containerStyle.borderColor,
        }}
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
  },
);
