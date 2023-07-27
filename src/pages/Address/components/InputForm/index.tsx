import React from 'react';

import {
  View,
  TextInput,
  Image,
  Text,
} from 'react-native';

import styles from './InputForm.styles';
import type { IInputForm } from './types/IInputForm';
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
  isEditable,
  textInputType,
  checkPostalCode,
  setFieldValue,
  inputID,
}: IInputForm): JSX.Element {
  const containerStyle = error
    ? [styles.inputContainer, { ...styles.borderErrorActive }] : [styles.inputContainer];

  const editableFieldStyle = !isEditable && { containerStyle, backgroundColor: '#f0f0f0' };

  const inputStyle = [...containerStyle, editableFieldStyle];

  return (
    <View>
      <View style={inputStyle}>
        <TextInput
          placeholder={placeholder}
          style={styles.inputText}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          placeholderTextColor="#A3A3A3"
          testID={inputID}
          onChangeText={(text: string) => {
            onTextChange(text);
            if (inputName === 'postalCode' && checkPostalCode && setFieldValue) {
              checkPostalCode(text, setFieldValue);
            }
          }}
          value={inputValue}
          ref={inputRef}
          editable={isEditable}
          keyboardType={textInputType}
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
