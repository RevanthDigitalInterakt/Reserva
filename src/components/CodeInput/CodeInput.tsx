import React, { useRef } from 'react';
import { Pressable, TextInput } from 'react-native';
import testProps from '../../utils/testProps';
import { Box } from '../Box/Box';
import { Typography } from '../Typography/Typography';

export interface CodeInputProps {
  showError: boolean,
  errorMessage?: string
  code: string,
  onChageCode: (code: string) => void
}

function CodeInput({
  code,
  onChageCode,
  showError = true,
  errorMessage = 'Digite um código válido',

}: CodeInputProps) {
  const codeMaxSize = 6;
  const codeDigitsArray = new Array(codeMaxSize).fill(0);
  const refTextInput = useRef<TextInput>(null);

  const handleOnPress = () => {
    refTextInput?.current?.focus();
  };
  return (
    <Box testID="com.usereserva:id/code_input_container">
      <Pressable onPress={handleOnPress} {...testProps('com.usereserva:id/code_input_passable')}>
        <Box flexDirection="row" justifyContent="space-between">
          {codeDigitsArray.map((val, idx) => (
            <Box
              key={`${val + idx}`}
              borderWidth="hairline"
              borderColor={showError ? 'vermelhoAlerta' : 'transparente'}
              alignItems="center"
              justifyContent="center"
              borderRadius="nano"
              width={50}
              height={50}
              backgroundColor="backgoundInput"
            >
              <Typography fontFamily="nunitoBold" fontSize={15}>
                {code[idx] ? code[idx] : ' '}
              </Typography>
            </Box>
          ))}
        </Box>
      </Pressable>

      {showError
        && (
          <Box mt="quarck">
            <Typography testID="com.usereserva:id/code_input_message_error" fontFamily="nunitoRegular" fontSize={13} color="vermelhoAlerta">{errorMessage}</Typography>
          </Box>
        )}
      <TextInput
        {...testProps('com.usereserva:id/code_input')}
        ref={refTextInput}
        value={code}
        onChangeText={(code) => onChageCode(code)}
        keyboardType="number-pad"
        returnKeyType="done"
        textContentType="oneTimeCode"
        maxLength={codeMaxSize}
        style={{
          position: 'absolute',
          height: 0,
          width: 0,
          opacity: 0,
        }}
      />
    </Box>
  );
}

export default CodeInput;
