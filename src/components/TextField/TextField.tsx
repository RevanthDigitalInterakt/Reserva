import React from 'react';
import { TextInput, type TextInputProps } from 'react-native';
import {
  TextInputMask,
  type TextInputMaskOptionProp,
  type TextInputMaskTypeProp,
} from 'react-native-masked-text';
import { type ColorProps } from 'styled-system';
import { theme } from '../../base/usereservappLegacy/theme';
import { Box } from '../Box/Box';
import { Typography } from '../Typography/Typography';
import { Input, InputMask } from './TextField.styles';

export interface IInput extends ColorProps<typeof theme>, TextInputProps {
  label?: string | null;
  height?: number;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  error?: string | null;
  touched?: boolean;
  value?: string;
  ref?: React.Ref<TextInput> | undefined;
  refMask?: React.Ref<TextInputMask> | undefined;
  placeholder?: string;
  maxLength?: number;
  secureTextEntry?: boolean;
  maskType?: TextInputMaskTypeProp;
  maskOptions?: TextInputMaskOptionProp;
  onChangeText?: (value: string) => void;
  onBlur?: () => void;
}

export function TextField({
  label,
  height,
  iconLeft,
  iconRight,
  error,
  touched,
  value,
  ref,
  refMask,
  placeholder,
  maxLength,
  secureTextEntry,
  maskType,
  maskOptions,
  onChangeText,
  onBlur,
  onFocus,
  ...rest
}: IInput) {
  return (
    <>
      <Box justifyContent="center">
        <Box
          backgroundColor="backgoundInput"
          justifyContent="center"
          flexDirection="row"
          height={height || 60}
          borderWidth="hairline"
          borderColor={touched && error ? 'vermelhoAlerta' : 'transparente'}
        >
          <Box flex={1}>
            {label && (
              <Box marginX="micro">
                <Typography
                  variant="descricaoCampoDePreenchimento"
                  color="neutroFrio2"
                >
                  {label}
                </Typography>
              </Box>
            )}
            {iconLeft && iconLeft}
            {maskType ? (
              <InputMask
                paddingX="xxxs"
                paddingY="nano"
                flex={1}
                placeholderTextColor={theme.colors.neutroFrio2}
                maxLength={maxLength}
                placeholder={placeholder}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                onBlur={onBlur}
                onFocus={onFocus}
                value={value}
                ref={refMask}
                variant="paragraphSmall"
                textContentType="oneTimeCode"
                type={maskType}
                options={maskOptions}
                {...rest}
              />
            ) : (
              <Input
                paddingX="xxxs"
                paddingY="nano"
                flex={1}
                placeholderTextColor={theme.colors.neutroFrio2}
                maxLength={maxLength}
                placeholder={placeholder}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                onBlur={onBlur}
                onFocus={onFocus}
                value={value}
                ref={ref}
                variant="paragraphSmall"
                textContentType="oneTimeCode"
                {...rest}
              />
            )}
          </Box>
          <Box justifyContent="center">{iconRight && iconRight}</Box>
        </Box>
      </Box>
      <Box>
        {touched && error && (
          <Typography
            fontFamily="nunitoRegular"
            fontSize="13px"
            color="vermelhoAlerta"
          >
            {error}
          </Typography>
        )}
      </Box>
    </>
  );
}
