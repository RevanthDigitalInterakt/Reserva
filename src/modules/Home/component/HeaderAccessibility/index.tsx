import { Typography } from '@usereservaapp/reserva-ui';
import React from 'react';
import { View } from 'react-native';

interface IProps {
  title: string;
  onPressTitle: string;
  onPress: () => void;
}

export default function HeaderAccessibility({ title, onPressTitle, onPress }: IProps) {
  return (
    <View style={{
      backgroundColor: '#3A3A3A',
      paddingVertical: 12,
    }}
    >
      <Typography style={{ alignItems: 'center', lineHeight: 20 }} textAlign="center" color="#CFCFCF">
        {title}
        <Typography onPress={onPress} color="white" style={{ textDecorationLine: 'underline' }}>{onPressTitle}</Typography>
      </Typography>

    </View>
  );
}
