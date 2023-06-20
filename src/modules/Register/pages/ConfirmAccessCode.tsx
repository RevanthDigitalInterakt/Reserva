import {
  Box, Button, Icon, Typography,
} from '@usereservaapp/reserva-ui';
import Clipboard from '@react-native-community/clipboard';
import type { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Platform, SafeAreaView, ScrollView, TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { images } from '../../../assets';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import HeaderBanner from '../../Forgot/componet/HeaderBanner';
import CodeInput from '../../Login/components/CodeInput';
import UnderlineInput from '../../../components/UnderlineInput';
import { platformType } from '../../../utils/platformType';
import { useSignUpMutation } from '../../../base/graphql/generated';
import { useAuthStore } from '../../../zustand/useAuth/useAuthStore';
import useInitialDito from '../../../hooks/useInitialDito';

export interface ConfirmAccessCodeProps
  extends StackScreenProps<RootStackParamList, 'ConfirmAccessCode'> { }

export const ConfirmAccessCode: React.FC<ConfirmAccessCodeProps> = ({ navigation, route }) => {
  const { email, cookies } = route.params;
  const [showError, setShowError] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwords, setPasswords] = useState({ first: '', confirm: '' });
  const { onSignIn, onUpdateAuthData } = useAuthStore(['onSignIn', 'onUpdateAuthData']);

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
  const { handleDitoRegister } = useInitialDito();

  const pasteCode = useCallback(async () => {
    const content = await Clipboard.getString();
    setCode(content);
  }, []);

  const enabledButton = () => passwordsChecker.equal
    && passwordsChecker.digitsCount
    && passwordsChecker.uppercase
    && passwordsChecker.lowercase
    && passwordsChecker.number;

  const [signUp, { data, error }] = useSignUpMutation({
    context: { clientName: 'gateway' },
    fetchPolicy: 'no-cache',
  });

  const handleCreatePassword = useCallback(async () => {
    try {
      if (loading) return;

      const variables = {
        input: {
          email,
          code,
          password: passwords.confirm,
          cookies,
        },
      };

      setShowError(error != null || code.length < 6);
      setLoading(true);

      const { data: dataSignUp } = await signUp({ variables });

      if (dataSignUp?.signUp?.token && dataSignUp?.signUp?.authCookie) {
        try {
          await onSignIn(email, passwords.confirm, true);
        } catch (err) {
          //
        }

        await onUpdateAuthData(dataSignUp?.signUp?.token, dataSignUp?.signUp?.authCookie);

        handleDitoRegister();
        navigation.navigate('Home');
      }
    } catch (err) {
      if (err.message === 'Request failed with status code 400') {
        setShowError(true);
      }
    } finally {
      setLoading(false);
    }
  }, [
    loading, email, code, passwords.confirm, cookies, error, signUp, onSignIn, navigation,
  ]);

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [data]);

  useEffect(() => {
    setPasswordChecker(passwordCheckHandler());
  }, [passwords]);

  const scrollViewRef = React.useRef<ScrollView>(null);

  return (
    <SafeAreaView style={{ backgroundColor: 'white' }} flex={1}>
      <ScrollView ref={scrollViewRef}>
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
              <Typography fontFamily="reservaSerifRegular" fontSize={22}>
                Confirme seu código
              </Typography>
              <Box mt={10}>
                <Typography fontFamily="nunitoRegular" fontSize={15}>
                  Digite o código enviado para o e-mail:
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
              <Box mt={11}>
                <CodeInput
                  code={code}
                  onChageCode={setCode}
                  showError={showError}
                />
              </Box>
            </Box>

            {code.length > 0 ? (
              <Box mx={20} mt={32}>
                <Box mb={20}>
                  <Typography fontFamily="reservaSerifRegular" fontSize={22}>
                    Agora, crie sua senha
                  </Typography>
                </Box>

                <UnderlineInput
                  isSecureText
                  accessibilityLabel="confirmaccess_input_password"
                  onFocus={(event) => scrollViewRef.current?.scrollToEnd()}
                  onChangeText={(text) => setPasswords({ ...passwords, first: text })}
                  placeholder="Digite sua nova senha"
                />
                <Box mt="sm">
                  <UnderlineInput
                    accessibilityLabel="confirmaccess_input_confirm_password"
                    isSecureText
                    onFocus={(event) => scrollViewRef.current?.scrollToEnd()}
                    onChangeText={(text) => setPasswords({ ...passwords, confirm: text })}
                    placeholder="Confirme sua nova senha"
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
                    title="CRIAR SENHA"
                    onPress={handleCreatePassword}
                    disabled={!enabledButton() || loading}
                    inline
                  />
                </Box>
              </Box>
            ) : (
              <Box alignItems="center" mt="nano" mb="quarck">
                <TouchableOpacity onPress={pasteCode}>
                  <Typography
                    fontFamily="nunitoRegular"
                    fontSize={13}
                    style={{ textDecorationLine: 'underline' }}
                  >
                    Colar código
                  </Typography>
                </TouchableOpacity>
              </Box>
            )}
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
        <Icon name="Check" size={16} color={color} />
      </Box>
      <Typography color={color}>{text}</Typography>
    </Box>
  );
};
