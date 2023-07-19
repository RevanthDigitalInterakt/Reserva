/* eslint-disable max-len */
import React from 'react';

import { View, TextInput, Image, Text } from 'react-native';

import styles from './InputForm.styles';
import type { IInputForm } from './interfaces/IInputForm';
import icons from '../../../../base/styles/icons';

export default function InputForm({
  onTextChange,
  placeholder,
  inputValue,
  inputRef,
  nextInputRef,
  inputName,
  fieldTouched,
  error,
}: IInputForm): JSX.Element {
  const containerStyle = error ? [styles.inputContainer, styles.borderErrorActive] : [styles.inputContainer];

  return (
    <View>
      <View style={containerStyle}>
        <TextInput
          placeholder={placeholder}
          style={styles.inputText}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          onChangeText={(text: string) => onTextChange(text)}
          value={inputValue}
          ref={inputRef}
          name={inputName}
          onBlur={() => fieldTouched(inputName)}
          onSubmitEditing={() => {
            if (nextInputRef && nextInputRef.current) {
              nextInputRef.current.focus();
            }
          }}
        />
      </View>
      {error && (
        <View style={styles.errorContainer}>
          <Image
            source={icons.infoFill}
            style={styles.errorIcon}
          />
          <Text style={styles.errorMessage}>{error}</Text>
        </View>
      )}
    </View>
  );
}
