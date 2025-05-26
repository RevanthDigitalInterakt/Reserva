import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import type { NewButtonProps } from './types';

export function NewButton({
  onPress, text, disabled, testID, textColor,
}: NewButtonProps) {
  return (
    <TouchableOpacity
      testID={testID}
      onPress={onPress}
      activeOpacity={1}
      style={styles({
        textColor,
        disabled,
      }).container}
    >
      <Text style={styles({
        textColor,
      }).text}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
