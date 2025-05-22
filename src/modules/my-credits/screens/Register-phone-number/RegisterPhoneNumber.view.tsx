import React from 'react';
import {
  ScrollView,
} from 'react-native';

import type { ProfileVars } from '../../../../graphql/profile/profileQuery';
import CodeInput from '../../../../components/CodeInput/CodeInput';
import { Box } from '../../../../components/Box/Box';
import { Typography } from '../../../../components/Typography/Typography';
import { TextField } from '../../../../components/TextField/TextField';
import { Button } from '../../../../components/Button';
import { theme } from '../../../../base/usereservappLegacy/theme';

export interface RegisterPhoneNumberViewProps {
  profile: ProfileVars;
  isChangeNumber?: boolean;
  confirmPhone?: boolean;
  openConfirmCodeSection?: boolean;
  showCodeError?: boolean;
  valuePhone?: string;
  valueCode?: string;
  timerCode: string;
  confirmCodeSection: () => void;
  registerPhoneNumber?: () => void;
  onChangeText?: (value: string) => void;
  onChageCode?: (value: string) => void;
  resendNewCode: () => void;
  phoneInvalid?: boolean;
  disableButton?: boolean;
}

export function RegisterPhoneNumberView({
  profile,
  isChangeNumber = false,
  confirmPhone = false,
  showCodeError = false,
  valuePhone,
  openConfirmCodeSection,
  valueCode,
  timerCode,
  confirmCodeSection,
  registerPhoneNumber,
  onChangeText,
  onChageCode,
  resendNewCode,
  phoneInvalid,
  disableButton,
}: RegisterPhoneNumberViewProps) {
  return (
    <Box flex={1}>
      <ScrollView
        style={{ height: '100%' }}
      >
        <Box mx="xxs" mt="xxs" mb={30}>
          {!confirmPhone ? (
            <>
              {isChangeNumber ? (
                <Box>
                  <Box mb="nano">
                    <Typography
                      fontFamily="reservaSerifMedium"
                      fontSize={28}
                    >
                      Atualizar telefone
                    </Typography>
                  </Box>

                  <Box mb="xxs">
                    <Typography fontFamily="nunitoRegular" fontSize={14}>
                      Digite seu número novo abaixo e continue para gerar seu
                      QR Code.
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box>
                  <Box mb="nano">
                    <Typography
                      fontFamily="reservaSerifMedium"
                      fontSize={28}
                    >
                      Cashback em Lojas
                    </Typography>
                  </Box>

                  <Box mb={13}>
                    <Typography fontFamily="nunitoRegular" fontSize={14}>
                      Para utilizar o cashback em loja precisamos que mantenha
                      o número de telefone atualizado.
                    </Typography>
                  </Box>

                  <Box mb={13}>
                    <Typography fontFamily="nunitoRegular" fontSize={14}>
                      Digite seu número abaixo e continue para gerar seu QR
                      Code.
                    </Typography>
                  </Box>
                </Box>
              )}

              <Box justifyContent="center">
                <TextField
                  maskType="cel-phone"
                  value={valuePhone}
                  onChangeText={onChangeText}
                  keyboardType="number-pad"
                  placeholder="(00) 00000-0000"
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
                  error="Verifique o número de telefone digitado."
                  touched={phoneInvalid}
                />
              </Box>
              <Box mb="xs" mt={16}>
                <Button
                  onPress={registerPhoneNumber}
                  variant="primarioEstreito"
                  inline
                  disabled={phoneInvalid || disableButton}
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

              {openConfirmCodeSection && (
              <Box>
                {!isChangeNumber && (
                <Box mb="nano">
                  <Typography
                    fontFamily="reservaSerifMedium"
                    fontSize={28}
                  >
                    Confirme seu código
                  </Typography>
                </Box>
                )}

                <Box mb="nano">
                  <Typography
                    fontFamily="nunitoRegular"
                    fontSize={14}
                    style={{ lineHeight: 18 }}
                  >
                    Digite abaixo o código que acabamos de enviar para o
                    número informado:
                  </Typography>
                </Box>
                <CodeInput
                  code={valueCode || ''}
                  onChageCode={onChageCode}
                  showError={showCodeError}
                />
                <Box mt={20}>
                  <Button
                    onPress={confirmCodeSection}
                    height={50}
                    inline
                    disabled={valueCode?.length < 6 || disableButton}
                    bg="verdeSucesso"
                  >
                    <Typography
                      color="white"
                      fontFamily="nunitoSemiBold"
                      fontSize={13}
                      style={{ lineHeight: 24, letterSpacing: 1.6 }}
                    >
                      CONFIRMAR
                    </Typography>
                  </Button>

                  <Box mt={19} alignSelf="center">
                    {timerCode === '00:00' ? (
                      <Button onPress={resendNewCode}>
                        <Typography
                          style={{
                            textDecorationLine: 'underline',
                            lineHeight: 24,
                            letterSpacing: 1.6,
                          }}
                          fontFamily="nunitoSemiBold"
                          fontSize={13}
                          color="preto"
                        >
                          REENVIAR NOVO CÓDIGO
                        </Typography>
                      </Button>
                    ) : (
                      <Typography
                        style={{
                          lineHeight: 24,
                          letterSpacing: 1.6,
                        }}
                        fontFamily="nunitoSemiBold"
                        fontSize={13}
                        opacity={0.5}
                      >
                        REENVIAR CÓDIGO EM
                        {' '}
                        {timerCode}
                        s
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>
              )}
            </>
          ) : (
            <>
              <Box mb="nano">
                <Typography
                  fontFamily="reservaSerifMedium"
                  fontSize={28}
                >
                  Confirmar telefone
                </Typography>
              </Box>

              <Box mb={19}>
                <Typography
                  fontFamily="nunitoRegular"
                  fontSize={14}
                  style={{ lineHeight: 18 }}
                >
                  Digite abaixo o código que acabamos de enviar para seu
                  telefone:
                </Typography>
              </Box>
              <Box justifyContent="center" mb="xxs">
                <Box alignItems="center">
                  <Typography
                    testID="com.usereserva:id/phoneNumber"
                    fontFamily="reservaSerifBold"
                    fontSize={22}
                    color="preto"
                  >
                    {profile?.homePhone
                      ?.slice(3)
                      .replace(/(\d{2})(\d{5})(\d{4})/, '($1) *****-$3')}
                  </Typography>
                </Box>
              </Box>
              <CodeInput
                code={valueCode || ''}
                onChageCode={onChageCode}
                showError={showCodeError}
              />
              <Box mt={20}>
                <Button
                  onPress={confirmCodeSection}
                  height={50}
                  inline
                  disabled={valueCode?.length < 6 || disableButton}
                  bg="verdeSucesso"
                >
                  <Typography
                    color="white"
                    fontFamily="nunitoSemiBold"
                    fontSize={13}
                    style={{ lineHeight: 24, letterSpacing: 1.6 }}
                  >
                    CONFIRMAR
                  </Typography>
                </Button>

                <Box mt={19} alignSelf="center">
                  {timerCode === '00:00' ? (
                    <Button onPress={resendNewCode}>
                      <Typography
                        style={{ textDecorationLine: 'underline' }}
                        letterSpacing={1.6}
                        fontFamily="nunitoSemiBold"
                        fontSize={13}
                      >
                        REENVIAR NOVO CÓDIGO
                      </Typography>
                    </Button>
                  ) : (
                    <Typography
                      letterSpacing={1.6}
                      fontFamily="nunitoSemiBold"
                      fontSize={13}
                      opacity={0.5}
                    >
                      REENVIAR CÓDIGO EM
                      {' '}
                      {timerCode}
                      s
                    </Typography>
                  )}
                </Box>
              </Box>
            </>
          )}
        </Box>
      </ScrollView>
    </Box>
  );
}
