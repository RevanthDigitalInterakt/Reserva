import React, { useState } from 'react';

import {
  Dimensions, KeyboardTypeOptions, NativeSyntheticEvent, Platform, TextInputFocusEventData,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {
  Box,
  Button,
  Icon,
  Typography,
} from '@usereservaapp/reserva-ui';

interface UnderlineInputProps {
  placeholder?: string;
  value?: string;
  errorMsg?: string;
  showError?: boolean;
  isSecureText?: boolean;
  width?: number;
  iconSize?: number;
  onChangeText: (value: string) => void;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  keyboardType?: KeyboardTypeOptions | undefined;
  accessibilityLabel?: string;
}

const screenWidth = Dimensions.get('window').width;

const UnderlineInput: React.FC<UnderlineInputProps> = ({
  placeholder,
  onChangeText,
  onFocus,
  errorMsg,
  value,
  showError,
  isSecureText,
  width,
  iconSize,
  keyboardType,
  accessibilityLabel,
}) => {
  width = width == undefined ? (width = screenWidth - 20 * 2) : width;
  iconSize = iconSize == undefined ? (iconSize = 22) : iconSize;
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <Box width={width}>
      <Box
        flexDirection="row"
        borderBottomWidth="hairline"
        borderBottomColor={showError ? 'vermelhoAlerta' : 'neutroFrio2'}
        justifyContent="space-between"
        style={{ overflow: 'hidden' }}
      >
        <Box flexGrow={4}>
          <TextInput
            onFocus={(e) => onFocus && onFocus(e)}
            secureTextEntry={isSecureText && hidePassword}
            placeholder={placeholder}
            onChangeText={(value) => onChangeText(value.trim())}
            // onEndEditing={() => onChangeText('' + InputValue)}
            keyboardType={
              isSecureText && !hidePassword && Platform.OS === 'android'
                ? 'visible-password'
                : keyboardType
            }
            autoCompleteType="off"
            autoCapitalize="none"
            value={value}
            style={{
              padding: 0,
              margin: 0,
              maxWidth: isSecureText ? width - (iconSize + 4) : width,
            }}
            autoCorrect={!isSecureText}
            accessibilityLabel={accessibilityLabel}
          />
        </Box>
        {isSecureText && (
          <Box justifyContent="center" mr="xxxs">
            <Button
              onPress={() => {
                setHidePassword(!hidePassword);
              }}
            >
              <Icon
                name={hidePassword ? 'EyeOff' : 'EyeOpen'}
                size={iconSize}
              />
            </Button>
          </Box>
        )}
      </Box>
      {showError && (
        <Typography
          color="vermelhoAlerta"
          fontFamily="nunitoRegular"
          fontSize={13}
        >
          {errorMsg}
        </Typography>
      )}
    </Box>
  );
};
export default UnderlineInput;
