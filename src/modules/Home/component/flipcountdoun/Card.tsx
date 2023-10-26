import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import { platformType } from '../../../../utils/platformType';
import testProps from '../../../../utils/testProps';
import { theme } from '../../../../base/usereservappLegacy/theme';

interface ICard {
  type: 'upper' | 'lower';
  size: number;
  number: any;
  colorDivider: string;
  testID: string;
}

function Card({
  type, size, number, colorDivider, testID,
}: ICard) {
  return (
    <View
      style={[style.card, { borderColor: colorDivider, borderBottomColor: colorDivider }, type === 'upper' ? { borderBottomWidth: 0.5 } : { borderTopWidth: 0.5 }]}
      {...testProps(testID)}
    >
      <Text
        style={[style.number, {
          transform: [type === 'upper' ? { translateY: size * 0.23 } : { translateY: -size * 0.23 }],
          fontSize: size / 1.8,
          lineHeight: Platform.OS === platformType.ANDROID ? size / 1.85 : size / 1.65,
          fontFamily: theme.fonts.reservaSansBold,
        }]}
        {...testProps('com.usereserva:id/card_number')}
      >
        {number}
      </Text>
    </View>
  );
}

export default Card;
const style = StyleSheet.create({
  card: {
    margin: 0,
    padding: 0,
    flex: 0.5,
    paddingLeft: 4,
    paddingRight: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#1f1f1f',
    borderBottomColor: '#1f1f1f',
    overflow: 'hidden',
  },
  number: {
    color: '#FFF',
  },
});
