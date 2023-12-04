import { Pressable, TextInput } from 'react-native';
import React from 'react';
import { NewInputProps, NewInputType } from './types';
import styles from './styles';
import { COLORS } from '../../base/styles';
import IconComponent from '../IconComponent/IconComponent';

export function NewInput({
  type, placeholder, onPress, value, onChangeText, ...props
}: NewInputProps) {
  const editable = type === NewInputType.TEXT;

  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
    >
      <TextInput
        placeholder={placeholder}
        autoCapitalize="none"
        onPressIn={onPress}
        editable={editable}
        onChangeText={onChangeText}
        style={value ? styles.textInput : styles.textInputPlaceholder}
        value={value}
        placeholderTextColor={COLORS.TEXT_INPUT_PLACEHOLDER}
        {...props}
      />
      {type === NewInputType.CALL_TO_ACTION && (
        <IconComponent
          icon="arrowRight"
          style={styles.arrowIcon}
        />
      )}
    </Pressable>
  );
}
