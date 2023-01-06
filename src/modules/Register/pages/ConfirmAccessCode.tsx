import { useMutation } from '@apollo/client';
import {
  Box, Button, Icon, Typography,
} from '@usereservaapp/reserva-ui';
import AsyncStorage from '@react-native-community/async-storage';
import Clipboard from '@react-native-community/clipboard';
import { StackScreenProps } from '@react-navigation/stack';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  Platform, SafeAreaView, ScrollView, TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import OneSignal from 'react-native-onesignal';
import { images } from '../../../assets';
import { useAuth } from '../../../context/AuthContext';
import {
  accessKeySignInMutation,
  recoveryPasswordMutation,
} from '../../../graphql/login/loginMutations';
import { RootStackParamList } from '../../../routes/StackNavigator';
import HeaderBanner from '../../Forgot/componet/HeaderBanner';
import CodeInput from '../../Login/components/CodeInput';
import UnderlineInput from '../../Login/components/UnderlineInput';
import EventProvider from '../../../utils/EventProvider';
import { platformType } from '../../../utils/platformType';

export interface ConfirmAccessCodeProps
  extends StackScreenProps<RootStackParamList, 'ConfirmAccessCode'> { }

export const ConfirmAccessCode: React.FC<ConfirmAccessCodeProps> = ({
  navigation,
  route,
}) => {
  const { email } = route.params;
  const [showError, setShowError] = useState(false);
  const [code, setCode] = useState('');
  const {
    cookie, setCookie, setEmail, saveCredentials,
  } = useAuth();
  const [loginWithCode, { data, loading }] = useMutation(
    accessKeySignInMutation,
  );

  const pasteCode = async () => {
    const content = await Clipboard.getString();
    setCode(content);
  };
  const passwordCheckHandler = () => ({
    equal: passwords.first === passwords.confirm,
    digitsCount: passwords.first.length >= 8,
    uppercase: passwords.first.match(/[a-z]/g) != null,
    lowercase: passwords.first.match(/[A-Z]/g) != null,
    number: passwords.first.match(/[0-9]/g) != null,
  });

  const enabledButton = () => passwordsChecker.equal
    && passwordsChecker.digitsCount
    && passwordsChecker.uppercase
    && passwordsChecker.lowercase
    && passwordsChecker.number;

  const [
    createPassword,
    { data: dataRecoveryPassword, loading: loadingRecoveryPassword, error },
  ] = useMutation(recoveryPasswordMutation);

  const handleCreatePassword = async () => {
    const variables = {
      email,
      code,
      newPassword: passwords.confirm,
    };
    if (error != null || code.length < 6) {
      setShowError(true);
    } else {
      setShowError(false);
    }
    try {
      const { data } = await createPassword({ variables });
      if (data.recoveryPassword === 'Success') {
        saveCredentials({
          email,
          password: passwords.confirm,
        });

        EventProvider.appsFlyer.logEvent(
          'af_login',
          {},
          (res) => { },
          (err) => {
            EventProvider.captureException(err);
          },
        );
        setEmail(email);
        AsyncStorage.setItem('@RNAuth:email', email).then(() => { });
        await AsyncStorage.setItem('@RNAuth:lastLogin', `${moment.now()}`);
        await AsyncStorage.setItem('@RNAuth:typeLogin', 'classic');
        navigation.navigate('Home');
        OneSignal.setExternalUserId(email);
      }
    } catch (error) {
      if (error.message === 'Request failed with status code 400') {
        setShowError(true);
      }
    }
  };

  const [passwords, setPasswords] = useState({
    first: '',
    confirm: '',
  });

  const [passwordsChecker, setPasswordChecker] = useState(
    passwordCheckHandler(),
  );

  const handleReset = () => {
    if (code.length < 6) {
      setShowError(true);
    } else {
      setShowError(false);
    }
    loginWithCode({
      variables: {
        email,
        code: `${code}`,
      },
    });
  };

  useEffect(() => {
    if (!loading && data?.cookie) {
      setShowError(false);
      navigation.navigate('ForgotNewPassword', { email, code });
    }
    if (data?.accessKeySignIn === 'WrongCredentials') {
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
                    disabled={!enabledButton()}
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
