import React from 'react';
import { useState } from 'react';
import { Dimensions, KeyboardTypeOptions } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Box, Button, Icon, neutroFrio2, theme, Typography } from 'reserva-ui';

interface UnderlineInputProps {
  placeholder?: string;
  value?: string;
  errorMsg?: string;
  showError?: boolean;
  isSecureText?: boolean;
  width?: number;
  iconSize?: number;
  onChangeText: (value: string) => void;
  keyboardType?: KeyboardTypeOptions | undefined;
}

const screenWidth = Dimensions.get('window').width;

const UnderlineInput: React.FC<UnderlineInputProps> = ({
  placeholder,
  onChangeText,
  errorMsg,
  value,
  showError,
  isSecureText,
  width,
  iconSize,
  keyboardType,
}) => {
  width = width == undefined ? (width = screenWidth - 20 * 2) : width;
  iconSize = iconSize == undefined ? (iconSize = 22) : iconSize;
  const [revelPassword, setRevelPassword] = useState(false);
  return (
    <Box width={width}>
      <Box
        flexDirection="row"
        borderBottomWidth="hairline"
        borderBottomColor={showError ? 'vermelhoAlerta' : 'neutroFrio2'}
        justifyContent="space-between"
        style={{ overflow: 'hidden' }}
      >
        <Box flexGrow={4} >
          <TextInput
            secureTextEntry={isSecureText && revelPassword}
            placeholder={placeholder}
            onChangeText={(value) => onChangeText(value)}
            keyboardType={keyboardType}
            autoCompleteType="off"
            autoCapitalize="none"
            value={value}
            style={{
              padding: 0,
              margin: 0,
              maxWidth: isSecureText ? width - (iconSize + 4) : width,
            }}
            autoCorrect={isSecureText ? false : true}
          />
        </Box>
        {isSecureText && (
          <Box justifyContent="center" mr="xxxs">
            <Button
              onPress={() => {
                setRevelPassword(!revelPassword);
              }}
            >
              <Icon
                name={!revelPassword ? 'EyeOpen' : 'EyeOff'}
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
