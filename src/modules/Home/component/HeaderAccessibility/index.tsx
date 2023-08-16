import React from 'react';
import { View } from 'react-native';
import { Typography } from '../../../../components/Typography/Typography';

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
