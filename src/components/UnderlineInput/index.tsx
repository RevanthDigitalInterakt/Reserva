import React, { useState } from 'react';
import { Dimensions, Platform, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { platformType } from '../../utils/platformType';
import testProps from '../../utils/testProps';

import { Box } from '../Box/Box';
import { Button } from '../Button';
import { IconLegacy } from '../IconLegacy/IconLegacy';
import { Typography } from '../Typography/Typography';
import type { UnderlineInputProps } from './types';

const screenWidth = Dimensions.get('window').width;

function UnderlineInput({
  width,
  value,
  testID,
  onFocus,
  errorMsg,
  iconSize,
  showError,
  placeholder,
  onChangeText,
  isSecureText,
  keyboardType,
  isModal = false,
}: UnderlineInputProps) {
  // TODO refactor
  width = width == undefined ? (width = screenWidth - 20 * 2) : width;
  iconSize = iconSize == undefined ? (iconSize = 22) : iconSize;

  const [hidePassword, setHidePassword] = useState(true);

  return (
    <Box width={width}>
      <Box
        flexDirection="row"
        borderBottomWidth="hairline"
        justifyContent="space-between"
        style={{ overflow: 'hidden' }}
        borderBottomColor={showError ? 'vermelhoAlerta' : 'neutroFrio2'}
      >
        <Box flexGrow={4}>
          <TextInput
            value={value}
            autoCapitalize="none"
            autoCompleteType="off"
            {...testProps(testID)}
            placeholder={placeholder}
            onFocus={(e) => onFocus && onFocus(e)}
            secureTextEntry={isSecureText && hidePassword}
            onChangeText={(text) => onChangeText(text.trim())}
            keyboardType={
              isSecureText
              && !hidePassword
              && Platform.OS === platformType.ANDROID
                ? 'visible-password'
                : keyboardType
            }
            style={{
              padding: 0,
              margin: 0,
              paddingRight: isModal ? 62 : 0,
              maxWidth: isSecureText ? width - (iconSize + 4) : width,
            }}
            autoCorrect={false}
          />
        </Box>
        {isSecureText && (
          <View style={{
            alignSelf: 'center',
            right: isModal ? 52 : 14,
          }}
          >
            <Button
              testID={`${testID}_button_hide_password`}
              onPress={() => {
                setHidePassword(!hidePassword);
              }}
            >
              <IconLegacy
                size={iconSize}
                name={hidePassword ? 'EyeOff' : 'EyeOpen'}
              />
            </Button>
          </View>
        )}
      </Box>
      {showError && (
        <Typography
          fontSize={13}
          color="vermelhoAlerta"
          fontFamily="nunitoRegular"
          {...testProps('com.usereserva:id/underline_input_msg_show_error')}
        >
          {errorMsg}
        </Typography>
      )}
    </Box>
  );
}
export default UnderlineInput;
