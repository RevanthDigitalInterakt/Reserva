import LottieView from 'lottie-react-native';
import React, { useState } from 'react';
import type { KeyboardTypeOptions } from 'react-native';
import type { TextInputMaskOptionProp, TextInputMaskTypeProp } from 'react-native-masked-text';
import { Button } from '../Button';
import { theme } from '../../base/usereservappLegacy/theme';
import { Box } from '../Box/Box';
import { Input, InputMask, type InputProps } from '../TextField/TextField.styles';
import { loadingSpinner } from '../../../assets/animations';
import { IconLegacy } from '../IconLegacy/IconLegacy';

interface OutlineInputProps extends InputProps {
  iconName?: string,
  loading?: boolean,
  maskType?: TextInputMaskTypeProp,
  maskOptions?: TextInputMaskOptionProp,
  keyboardType?: KeyboardTypeOptions
  onPressIcon?: (text: string) => void;
}

export function OutlineInput({
  iconName,
  onChangeText,
  loading,
  maskType,
  maskOptions,
  onPressIcon,
  ...props
}: OutlineInputProps) {
  const [text, setText] = useState('');
  const inputProps: InputProps = props;
  const inputDefaultProps: InputProps = {
    flex: 1,
    height: 32,
    style: { paddingVertical: 2 },
    alignItems: 'baseline',
    onChangeText: (value: string) => {
      setText(value);
      if (onChangeText) {
        onChangeText(value);
      }
    },
    fontFamily: 'nunitoRegular',
    fontSize: 13,
    color: 'preto',
    placeholderTextColor: theme.colors.preto,

  };
  return (
    <Box
      pl="micro"
      flexDirection="row"
      borderWidth="hairline"
      borderColor="preto"
      borderRadius="pico"
      flex={1}
      alignItems="center"
    >
      {maskType
        ? (
          <InputMask
            type={maskType}
            options={maskOptions}
            {...{ ...inputDefaultProps, ...inputProps }}
          />
        )
        : <Input {...{ ...inputDefaultProps, ...inputProps }} />}

      {iconName && (
        <Box borderLeftColor="preto" borderLeftWidth="hairline" p="nano">
          {loading
            ? (
              <LottieView
                source={loadingSpinner}
                style={{
                  width: 16,
                  height: 16,
                }}
                autoPlay
                loop
              />
            )
            : (
              <Button
                onPress={() => {
                  if (onPressIcon) {
                    onPressIcon(text);
                  }
                }}
                variant="icone"
                icon={<IconLegacy name={iconName} size={16} />}
              />
            )}
        </Box>
      )}
    </Box>
  );
}
