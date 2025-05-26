import React from 'react';
import {
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { platformType } from '../../../../utils/platformType';
import { Box } from '../../../../components/Box/Box';
import { Typography } from '../../../../components/Typography/Typography';
import { TextField } from '../../../../components/TextField/TextField';
import { theme } from '../../../../base/usereservappLegacy/theme';
import { Button } from '../../../../components/Button';

export interface RegisterCpfViewProps {
  valueCpf: string;
  navigateToVerifyNumber: () => void;
  onChangeText: (value: string) => void;
  cpfInvalid?: boolean;
  disableButton?: boolean;
}

export function RegisterCpfView({
  valueCpf,
  navigateToVerifyNumber,
  onChangeText,
  cpfInvalid,
  disableButton,
}: RegisterCpfViewProps) {
  return (
    <SafeAreaView>
      <ScrollView>
        <KeyboardAvoidingView
          enabled
          keyboardVerticalOffset={15}
          behavior={Platform.OS === platformType.IOS ? 'padding' : undefined}
        >
          <Box mx="xxs" mt="xxs">
            <Box>
              <Box mb="nano" mr="22%">
                <Typography
                  style={{ lineHeight: 30 }}
                  fontFamily="reservaSerifMedium"
                  fontSize={28}
                >
                  Insira seu CPF e ative a sua carteira
                </Typography>
              </Box>

              <Box mb="xxxs" mr={22}>
                <Typography
                  fontFamily="nunitoRegular"
                  fontSize={14}
                  style={{ lineHeight: 19 }}
                >
                  O cashback e sua carteira Reserva precisam ficar atrelada a um
                  número de CPF para você ter direito a todos os benefícios.
                </Typography>
              </Box>
            </Box>
            <Box justifyContent="center" mb="xxs">
              <TextField
                maskType="cpf"
                value={valueCpf}
                onChangeText={onChangeText}
                keyboardType="number-pad"
                placeholder="Digite somente os números do CPF"
                returnKeyType="done"
                textContentType="oneTimeCode"
                style={{
                  fontFamily: theme.fonts.nunitoItalic,
                  backgroundColor: '#f0f0f0',
                  height: 51,
                  width: '100%',
                  textAlign: 'center',
                  fontSize: 15,
                }}
                error="Verifique o CPF digitado."
                touched={cpfInvalid}
              />
            </Box>
            <Box mb="xs">
              <Button
                onPress={navigateToVerifyNumber}
                variant="primarioEstreito"
                inline
                disabled={cpfInvalid || disableButton}
              >
                <Typography
                  color="white"
                  fontFamily="nunitoSemiBold"
                  fontSize={13}
                  style={{ lineHeight: 24, letterSpacing: 1.6 }}
                >
                  CADASTRAR
                </Typography>
              </Button>
            </Box>
          </Box>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}
