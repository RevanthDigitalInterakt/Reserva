import React from 'react';
import {
  ActivityIndicator,
  type GestureResponderEvent,
  type StyleProp,
  type TextStyle,
} from 'react-native';
import type { TextInputMaskOptionProp, TextInputMaskTypeProp } from 'react-native-masked-text';
import { Box } from '../../../components/Box/Box';
import { TextField } from '../../../components/TextField/TextField';

interface IInputOption {
  label?: string;
  placeholder?: string;
  maskType?: TextInputMaskTypeProp;
  maskOptions?: TextInputMaskOptionProp;
  value?: string;
  height?: number;
  error?: string;
  touch?: string;
  touched?: boolean;
  textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center' | undefined;
  editable?: boolean;
  onChangeText?: (value: string) => void;
  maxLength?: number;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined
  onTouchStart?: ((event: GestureResponderEvent) => void) | undefined
  isLoading?: boolean
  style?: StyleProp<TextStyle>;
}

function InputOption({
  label,
  placeholder,
  maskType,
  maskOptions,
  value,
  height,
  error,
  touch,
  touched,
  textAlignVertical,
  onChangeText,
  editable = true,
  maxLength,
  autoCapitalize,
  onTouchStart,
  isLoading = false,
  style,
  ...rest
}: IInputOption) {
  return (
    <Box mt="xxxs">
      {isLoading ? <ActivityIndicator />
        : (
          <TextField
            {...rest}
            label={value ? label : undefined}
            textAlignVertical={textAlignVertical}
            height={height}
            maskType={maskType}
            maskOptions={maskOptions}
            onChangeText={onChangeText}
            placeholder={placeholder}
            value={value}
            editable={editable}
            maxLength={maxLength}
            autoCapitalize={autoCapitalize}
            style={style}
            touched={touched}
            onTouchStart={onTouchStart}
            error={error && touched ? `${error}` : ''}
          />
        )}
    </Box>
  );
}

export default InputOption;
