import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from './styles';

type DarkButtonProps = {
  onPress: () => void;
  title: string;
  testID?: string;
};

export function DarkButton({ onPress, title, testID }: DarkButtonProps) {
  return (
    <TouchableOpacity
      testID={testID}
      style={styles.container}
      onPress={onPress}
    >
      <Text style={styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
