/* eslint-disable @typescript-eslint/no-use-before-define */
import type { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import { Platform, SafeAreaView, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useRecoverPasswordResetMutation } from '../../../base/graphql/generated';
import images from '../../../base/styles/icons';
import { Box } from '../../../components/Box/Box';
import { Button } from '../../../components/Button';
import CodeInput from '../../../components/CodeInput/CodeInput';
import { IconLegacy } from '../../../components/IconLegacy/IconLegacy';
import { Typography } from '../../../components/Typography/Typography';
import UnderlineInput from '../../../components/UnderlineInput';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import { platformType } from '../../../utils/platformType';
import testProps from '../../../utils/testProps';
import HeaderBanner from '../componet/HeaderBanner';
import { ExceptionProvider } from '../../../base/providers/ExceptionProvider';

export interface ForgotAccessCodeProps
  extends StackScreenProps<RootStackParamList, 'ForgotAccessCode'> { }

export const ForgotAccessCode: React.FC<ForgotAccessCodeProps> = ({
  navigation,
  route,
}) => {
  const { email, cookies } = route.params;
  const [showError, setShowError] = useState(false);
  const [code, setCode] = useState('');
  const [passwords, setPasswords] = useState({
    first: '',
    confirm: '',
  });

  const [recoveryPasswordReset, { data, loading, error }] = useRecoverPasswordResetMutation({
    context: { clientName: 'gateway' }, fetchPolicy: 'no-cache',
  });

  const passwordCheckHandler = () => ({
    equal: passwords.first === passwords.confirm,
    digitsCount: passwords.first.length >= 8,
    uppercase: passwords.first.match(/[a-z]/g) != null,
    lowercase: passwords.first.match(/[A-Z]/g) != null,
    number: passwords.first.match(/[0-9]/g) != null,
  });

  const [passwordsChecker, setPasswordChecker] = useState(
    passwordCheckHandler(),
  );
  const enabledButton = () => passwordsChecker.equal
    && passwordsChecker.digitsCount
    && passwordsChecker.uppercase
    && passwordsChecker.lowercase
    && passwordsChecker.number;

  const handleUpdatePassword = useCallback(async () => {
    try {
      const variables = {
        input: {
          email,
          code,
          password: passwords.confirm,
          cookies,
        },
      };

      if (code.length < 6) {
        setShowError(code.length < 6);
      } else {
        setShowError(false);

        const { data: recoveryPasswordData } = await recoveryPasswordReset({
          variables,
        });

        if (!recoveryPasswordData) navigation.navigate('ForgotEmail', {});
        if (recoveryPasswordData?.recoverPasswordReset?.token) {
          navigation.navigate('ForgotEmailSuccess');
        }
      }
    } catch (err) {
      setShowError(true);
      ExceptionProvider.captureException(err, 'handleUpdatePassword - ForgotAccessCode.tsx', { email });
    }
  }, [code, cookies, email, navigation, passwords.confirm, recoveryPasswordReset]);

  useEffect(() => {
    if (!loading && error) {
      setShowError(true);
    }
  }, [data]);

  useEffect(() => {
    setPasswordChecker(passwordCheckHandler());
  }, [passwords]);

  const scrollViewRef = React.useRef<ScrollView>(null);

  return (
    <SafeAreaView style={{ backgroundColor: 'white' }} flex={1}>
      <ScrollView
        ref={scrollViewRef}
      >
        <>
          <KeyboardAwareScrollView
            enableOnAndroid
            enableAutomaticScroll={Platform.OS === platformType.IOS}
            extraScrollHeight={155}
          >
            <HeaderBanner
              imageHeader={images.headerLogin}
              onClickGoBack={() => {
                navigation.goBack();
              }}
            />
            <Box mx={20} mt={13}>
              <Typography
                fontFamily="reservaSerifRegular"
                fontSize={22}
                {...testProps('com.usereserva:id/atualize_sua_senha')}
              >
                Atualize sua senha
              </Typography>
              <Box mt={27}>
                <Typography fontFamily="nunitoRegular" fontSize={15}>
                  Para alterar a senha, digite o código enviado para o e-mail
                  abaixo:
                </Typography>
                {email && (
                  <Typography
                    fontFamily="nunitoRegular"
                    fontSize={15}
                    color="neutroFrio2"
                  >
                    {email}
                  </Typography>
                )}
              </Box>
              <Box mt={17}>
                <CodeInput
                  code={code}
                  onChageCode={setCode}
                  showError={showError}
                />
              </Box>
            </Box>
            <Box mx={20} mt={13}>
              <UnderlineInput
                onChangeText={(text) => setPasswords({ ...passwords, first: text })}
                accessibilityLabel="forgot_input_password"
                onFocus={() => scrollViewRef.current?.scrollToEnd()}
                placeholder="Digite sua nova senha"
                isSecureText
              />
              <Box mt="sm">
                <UnderlineInput
                  onFocus={() => scrollViewRef.current?.scrollToEnd()}
                  onChangeText={(text) => setPasswords({ ...passwords, confirm: text })}
                  accessibilityLabel="forgot_input_confirm_password"
                  placeholder="Confirme sua nova senha"
                  isSecureText
                />
              </Box>
              <Box mt={22}>
                <Typography>Sua senha deve ter pelo menos:</Typography>
              </Box>
              <Box mx={44} flexDirection="row" flexWrap="wrap" pt={2}>
                <PasswordCheck
                  checked={passwordsChecker.digitsCount}
                  text="8 dígitos"
                />
                <PasswordCheck
                  checked={passwordsChecker.lowercase}
                  text="1 letra maiúscula"
                />
                <PasswordCheck
                  checked={passwordsChecker.number}
                  text="1 número"
                />
                <PasswordCheck
                  checked={passwordsChecker.uppercase}
                  text="1 letra minúscula"
                />
              </Box>
              <Box mb={20}>
                <Button
                  mt={28}
                  variant="primarioEstreito"
                  title="ALTERAR SENHA"
                  onPress={handleUpdatePassword}
                  disabled={!enabledButton()}
                  inline
                />
              </Box>
            </Box>
          </KeyboardAwareScrollView>
        </>
      </ScrollView>
    </SafeAreaView>
  );
};

export interface PasswordCheckProps {
  text: string;
  checked: boolean;
}

export const PasswordCheck: React.FC<PasswordCheckProps> = ({
  text,
  checked,
}) => {
  const color = checked ? 'verdeSucesso' : 'neutroFrio2';
  return (
    <Box flexDirection="row" alignItems="center" width="50%" mt={15}>
      <Box mt="nano" mr={2}>
        <IconLegacy name="Check" size={16} color={color} />
      </Box>
      <Typography color={color}>{text}</Typography>
    </Box>
  );
};
