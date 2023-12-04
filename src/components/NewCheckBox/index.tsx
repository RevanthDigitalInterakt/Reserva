import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import type { NewCheckBoxProps } from './types';
import IconComponent from '../IconComponent/IconComponent';
import styles from './styles';

export function NewCheckBox({ checked, onPress }: NewCheckBoxProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <IconComponent icon={checked ? 'checkedBox' : 'uncheckedBox'} style={styles.checkIcon} />
      <Text style={styles.label}>Li e aceito os termos e condições de uso.</Text>
    </TouchableOpacity>
  );
}
