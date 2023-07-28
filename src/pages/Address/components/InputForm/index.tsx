import React, { useCallback, useEffect, useRef } from 'react';

import {
  View,
  TextInput,
  Image,
  Text,
  Animated,
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
  touched,
}: IInputForm): JSX.Element {
  const animatedLabel = useRef(new Animated.Value(0)).current;

  const containerStyle = error && touched
    ? [styles.inputContainer, { ...styles.borderErrorActive }] : [styles.inputContainer];

  const editableFieldStyle = !isEditable && { containerStyle, backgroundColor: '#f0f0f0' };

  const inputStyle = [...containerStyle, editableFieldStyle];

  const moveLabelToTop = useCallback(() => {
    Animated.timing(animatedLabel, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [animatedLabel]);

  const moveLabelToInitalPosition = useCallback(() => {
    Animated.timing(animatedLabel, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [animatedLabel]);

  const onFocusHandler = useCallback(() => {
    moveLabelToTop();
  }, [moveLabelToTop]);

  const onBlurHandler = useCallback(() => {
    fieldTouched(inputName);

    if (inputValue === '') {
      moveLabelToInitalPosition();
    }
  }, [fieldTouched, inputName, inputValue, moveLabelToInitalPosition]);

  const translateStyleY = animatedLabel.interpolate({
    inputRange: [0, 1],
    outputRange: [4, -20],
  });

  useEffect(() => {
    if (inputValue !== '') {
      onFocusHandler();
    }
  }, [inputValue, onFocusHandler]);

  return (
    <View>
      <View style={inputStyle}>
        <Animated.View style={[
          isEditable ? styles.labelStyle : styles.labelNoEditableFieldStyle, {
            transform: [{ translateY: translateStyleY }],
          }]}
        >
          <Text style={{ fontFamily: 'Nunito-Regular', color: '#a3a3a3' }}>{placeholder}</Text>
        </Animated.View>
        <TextInput
          placeholder=""
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
          onBlur={onBlurHandler}
          onFocus={onFocusHandler}
          onSubmitEditing={() => {
            if (nextInputRef && nextInputRef.current) {
              nextInputRef.current.focus();
            }
          }}
        />
      </View>
      {error && touched && (
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
