import React, { useCallback, useEffect, useRef } from 'react';

import {
  View,
  TextInput,
  Text,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';

import styles from './InputForm.styles';
import type { IInputForm } from './interface/IInputForm';
import IconInfoFill from '../../../assets/icons/IconInfoFill';

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
  maxLength,
  showMessageError = true,
}: Readonly<IInputForm>): JSX.Element {
  const animatedLabel = useRef(new Animated.Value(0)).current;

  const containerStyle = error && touched
    ? [styles.inputContainer, { ...styles.borderErrorActive }] : [styles.inputContainer];

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

  const onFocusField = useCallback(() => {
    inputRef.current?.focus();
    onFocusHandler();
  }, []);

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
      <View style={containerStyle}>
        <Animated.View style={[
          styles.labelStyle, {
            transform: [{ translateY: translateStyleY }],
          }]}
        >
          <TouchableWithoutFeedback onPress={onFocusField}>
            <Text style={styles.inputPlaceholder}>{placeholder}</Text>
          </TouchableWithoutFeedback>
        </Animated.View>
        <TextInput
          style={styles.inputText}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          testID={inputID.testID}
          onChangeText={(text: string) => {
            onTextChange(text);
            if (inputName === 'postalCode' && checkPostalCode && setFieldValue) {
              checkPostalCode(text, setFieldValue);
            }
          }}
          maxLength={maxLength}
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
      {error && touched && showMessageError && (
        <View style={styles.errorContainer}>
          <IconInfoFill />
          <Text style={styles.errorMessage}>{error}</Text>
        </View>
      )}
    </View>
  );
}
