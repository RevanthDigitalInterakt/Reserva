import React from 'react';

import { View, TextInput } from 'react-native';

import styles from './InputForm.styles';
import type { IInputForm } from './interfaces/IInputForm';

export default function InputForm({
  onTextChange,
  placeholder,
  inputValue,
  inputRef,
  nextInputRef,
}: IInputForm): JSX.Element {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder={placeholder}
        style={styles.inputText}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        onChangeText={(text: string) => onTextChange(text)}
        value={inputValue}
        ref={inputRef}
        onSubmitEditing={() => {
          if (nextInputRef && nextInputRef.current) {
            nextInputRef.current.focus();
          }
        }}
      />
    </View>
  );
}
