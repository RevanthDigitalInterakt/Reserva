import React, { useState } from 'react';
import type { KeyboardTypeOptions } from 'react-native';
import type { TextInputMaskOptionProp, TextInputMaskTypeProp } from 'react-native-masked-text';
import LottieView from 'lottie-react-native';
import { loadingSpinner } from '@usereservaapp/reserva-ui/src/assets/animations';
import { Box, theme } from '@usereservaapp/reserva-ui';
import {
  Input,
  InputMask,
  type InputProps,
} from '@usereservaapp/reserva-ui/src/components/TextField/TextField.styles';
import { Button } from '../Button';
import IconComponent from '../IconComponent/IconComponent';

interface OutlineInputProps extends InputProps {
  iconName?: string,
  loading?: boolean,
  maskType?: TextInputMaskTypeProp,
  maskOptions?: TextInputMaskOptionProp,
  keyboardType?: KeyboardTypeOptions
  onPressIcon?: (text: string) => void;
}

// TODO update revisar ICON linha 81
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
    onChangeText: (text: string) => {
      setText(text);
      onChangeText && onChangeText(text);
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

      {/* TODO update */}
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
                  onPressIcon && onPressIcon(text);
                }}
                variant="icone"
                icon={<IconComponent icon={iconName} size={16} />}

              />
            )}
        </Box>
      )}
    </Box>
  );
}
