import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import type { KeyboardTypeOptions } from 'react-native';
import type { TextInputMaskOptionProp, TextInputMaskTypeProp } from 'react-native-masked-text';
import { TextField } from '../TextField/TextField';

interface IFormikTextInput {
  label?: string;
  secureTextEntry?: boolean;
  placeholder?: string;
  maskType?: TextInputMaskTypeProp;
  maskOptions?: TextInputMaskOptionProp;
  height?: number;
  field: string;
  iconRight?: React.ReactNode;
  textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center' | undefined;
  keyboardType?: KeyboardTypeOptions;
  onFocus?: () => void;
}
export function FormikTextInput({
  label,
  textAlignVertical,
  secureTextEntry,
  placeholder,
  maskType,
  maskOptions,
  height,
  field,
  iconRight,
  keyboardType,
  onFocus,
}: IFormikTextInput) {
  const {
    values, handleChange, touched, errors,
  } = useFormikContext<any>();
  const [labelDisplay, setLabelDisplay] = useState(label);

  const changeLabel = async () => (!values[field]
    ? setLabelDisplay(undefined)
    : setLabelDisplay(label));

  useEffect(() => {
    changeLabel();
  }, [values]);

  return (
    <TextField
      label={labelDisplay}
      onFocus={onFocus}
      textAlignVertical={textAlignVertical}
      fontFamily="nunitoRegular"
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
      height={height}
      keyboardType={keyboardType}
      maskType={maskType}
      maskOptions={maskOptions}
      onChangeText={handleChange(field)}
      placeholder={placeholder}
      iconRight={iconRight}
      value={values[field]}
      touched={touched[field]}
      error={errors[field] && touched[field] ? `${errors[field]}` : null}
    />
  );
}
