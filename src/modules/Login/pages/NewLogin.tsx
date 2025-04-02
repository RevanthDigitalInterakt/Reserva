/* eslint-disable @typescript-eslint/no-use-before-define */
import type { StackScreenProps } from '@react-navigation/stack';
import React, {
  useCallback, useEffect,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView, ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Yup from 'yup';
import { ExceptionProvider } from '../../../base/providers/ExceptionProvider';
import images from '../../../base/styles/icons';
import Cancel from '../../../base/svgs/Cancel';
import EyeClose from '../../../base/svgs/EyeClose';
import EyeOpen from '../../../base/svgs/EyeOpen';
import { IconLegacy } from '../../../components/IconLegacy/IconLegacy';
import { useAuthentication } from '../../../hooks/useAuthentication';
import { useNavigationToDelivery } from '../../../hooks/useNavigationToDelivery';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import EventProvider from '../../../utils/EventProvider';
import testProps from '../../../utils/testProps';
import { useAuthStore } from '../../../zustand/useAuth/useAuthStore';
import { useBagStore } from '../../../zustand/useBagStore/useBagStore';
import { usePageLoadingStore } from '../../../zustand/usePageLoadingStore/usePageLoadingStore';
import HeaderBanner from '../../Forgot/componet/HeaderBanner';
import { scale } from '../../../utils/scale';
import { FONTS } from '../../../base/styles';

type IProps = StackScreenProps<RootStackParamList, 'LoginAlternative'>;

export function NewLoginScreen({
  route,
  navigation,
}: IProps) {
  const { comeFrom, previousPage, invalidSession } = route.params || {};
  const skipHomePage = comeFrom === 'BagScreen' ? () => { } : undefined;

  const {
    handleLogin,
    loadingSignIn,
    isLoadingEmail,
    verifyUserEmail,
    setEmailIsValid,
    loginCredentials,
    setPasswordIsValid,
    setLoginCredentials,
    cleanInputs,
    navigateToForgotPassword,
  } = useAuthentication({
    closeModal: skipHomePage,
  });

  const [passwordHidden, setPasswordHidden] = useState(true);

  const togglePasswordHidden = () => {
    setPasswordHidden(!passwordHidden);
  };

  const { actions } = useBagStore(['actions']);

  const { onSignOut } = useAuthStore(['onSignOut']);
  const { onFinishLoad, startLoadingTime } = usePageLoadingStore(['onFinishLoad', 'startLoadingTime']);

  const {
    handleNavigateToDelivery,
    setLoadingDelivery,
    loadingDelivery,
  } = useNavigationToDelivery();

  const afterLogin = useCallback(async (profile) => {
    if (comeFrom === 'Profile') {
      await actions.REFETCH_ORDER_FORM();
      BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.navigate('Home');
        return true;
      });
    }

    if (comeFrom === 'BagScreen') {
      setLoadingDelivery(true);
      return handleNavigateToDelivery(profile);
    }

    if (invalidSession) {
      await actions.REFETCH_ORDER_FORM();
    }
  }, [invalidSession,
    comeFrom,
    actions,
    navigation,
    setLoadingDelivery,
    handleNavigateToDelivery]);

  const doLogin = useCallback(async () => {
    if (loginCredentials.showPasswordError || loginCredentials.showUsernameError) {
      setLoginCredentials((prev) => ({
        ...prev,
        showUsernameError: false,
        showPasswordError: false,
      }));
    }

    try {
      EventProvider.logEvent('login_click', {});
      const profile = await handleLogin();
      if (profile) {
        afterLogin(profile);
      }
    } catch (e) {
      ExceptionProvider.captureException(e, 'doLogin - newLoginScreen');
    }
  }, [afterLogin, handleLogin]);

  useEffect(() => {
    if (comeFrom === 'Profile') {
      BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.navigate('Home');
        return true;
      });
    }
  }, []);

  useEffect(() => {
    if (route?.params?.invalidSession) {
      Alert.alert('Sessão expirada', 'Faça login novamente');
      onSignOut();
    }
  }, [route?.params, onSignOut]);

  const ClientDelivery = useCallback(async () => {
    if (loadingSignIn) {
      return;
    }

    try {
      if (comeFrom === 'Checkout') {
        verifyUserEmail();
      }
    } catch (error) {
      ExceptionProvider.captureException(error, 'ClientDelivery - newLoginScreen');
    }
  }, [comeFrom, loadingSignIn, verifyUserEmail]);

  const handleNavigatePreviousPage = useCallback(() => {
    if (previousPage) {
      navigation.navigate(previousPage);
      return;
    }

    navigation.navigate('Home');
  }, [previousPage, navigation]);

  useEffect(() => {
    ClientDelivery();
  }, []);

  useEffect(() => {
    if (!loadingSignIn && startLoadingTime > 0) {
      onFinishLoad();
    }
  }, [loadingSignIn, startLoadingTime, onFinishLoad]);

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        style={{ flex: 1 }}
      >
        <ScrollView
          {...testProps('com.usereserva:id/login_scrollview')}
          keyboardShouldPersistTaps="always"
        >
          <HeaderBanner
            imageHeader={images.newHeaderLogin}
            onClickGoBack={handleNavigatePreviousPage}
            loading={isLoadingEmail || loadingDelivery}
            newIconGoBack
          />
          <View style={{ position: 'absolute', left: '50%', top: 24 }}><IconLegacy name="Logo" color="vermelhoAlerta" size={24} /></View>

          <View style={styles.headlineContainer}>
            <Text style={styles.headline}>
              Preencha seu dados
            </Text>
            <Text style={styles.subHeadline}>
              Insira seu e-mail e senha para continuar
            </Text>

          </View>
          <View style={{ marginTop: 8 }} />

          <View style={styles.inputContainer}>
            <View style={loginCredentials.showUsernameError
              ? styles.inputContainerWrapperError
              : styles.inputContainerWrapper}
            >
              <TextInput
                style={loginCredentials.showUsernameError
                  ? styles.textInputError
                  : styles.textInput}
                placeholder="email@email.com"
                autoCapitalize="none"
                placeholderTextColor={loginCredentials.showUsernameError ? '#DD3636' : '#A8A8A8'}
                onChangeText={(text) => {
                  try {
                    setLoginCredentials({ ...loginCredentials, username: text });

                    if (loginCredentials.showUsernameError) {
                      setLoginCredentials({
                        ...loginCredentials,
                        username: text,
                        showUsernameError: false,
                        showPasswordError: false,
                      });
                    }

                    setEmailIsValid(
                      Yup.string().required().email().isValidSync(text.trim()),
                    );
                  } catch (error) {
                    ExceptionProvider.captureException(error, 'onChangeText - newLoginScreen');
                  }
                }}
                value={loginCredentials.username}
              />
              {loginCredentials.username?.length > 0 && (
              <TouchableOpacity onPress={cleanInputs} style={styles.iconButton}>
                <Cancel height={scale(12)} width={scale(12)} color={loginCredentials.showUsernameError ? '#DD3636' : '#A8A8A8'} />
              </TouchableOpacity>
              )}
            </View>
            <View style={{ marginTop: 8 }} />
            <View style={loginCredentials.showPasswordError
              ? styles.inputContainerWrapperError
              : styles.inputContainerWrapper}
            >

              <TextInput
                style={loginCredentials.showPasswordError
                  ? styles.textInputError
                  : styles.textInput}
                placeholder="Senha"
                autoCapitalize="none"
                placeholderTextColor={loginCredentials.showPasswordError ? '#DD3636' : '#A8A8A8'}
                secureTextEntry={passwordHidden}
                onChangeText={(text) => {
                  setLoginCredentials({
                    ...loginCredentials,
                    password: text,
                  });

                  if (loginCredentials.showPasswordError) {
                    setLoginCredentials({
                      ...loginCredentials,
                      password: text,
                      showUsernameError: false,
                      showPasswordError: false,
                    });
                  }

                  setPasswordIsValid(
                    Yup.string()
                      .required()
                      .matches(/^(?=.{8,})/)
                      .matches(/^(?=.*[A-Z])/)
                      .matches(/^(?=.*[a-z])/)
                      .matches(/^(?=.*[0-9])/)
                      .isValidSync(text),
                  );
                }}
                value={loginCredentials.password}
              />
              <TouchableOpacity onPress={togglePasswordHidden} style={styles.iconButton}>
                {passwordHidden
                  ? <EyeClose height={scale(13)} width={scale(15)} color={loginCredentials.showPasswordError ? '#DD3636' : '#A8A8A8'} />
                  : <EyeOpen height={scale(11)} width={scale(16)} color={loginCredentials.showPasswordError ? '#DD3636' : '#A8A8A8'} />}
              </TouchableOpacity>
            </View>
            {(loginCredentials.showPasswordError && loginCredentials.showUsernameError)
              && (
                <Text style={{
                  color: '#DD3636', marginTop: -3, marginLeft: 4, fontFamily: FONTS.INTER_MEDIUM,
                }}
                >
                  {loginCredentials.showMessageError}
                </Text>
              )}
            <Text
              style={styles.forgotPassword}
              onPress={navigateToForgotPassword}
            >
              Esqueci minha senha
            </Text>
          </View>

          <View style={styles.container}>
            <TouchableOpacity
              style={styles.loginButton}
              disabled={loadingSignIn || isLoadingEmail || loadingDelivery}
              onPress={doLogin}
            >
              {(loadingSignIn || isLoadingEmail || loadingDelivery)
                ? <ActivityIndicator size="small" color="#FFF2F2" />
                : <Text style={styles.loginText}>Entrar</Text>}

            </TouchableOpacity>

            <View style={styles.separatorContainer}>
              <View style={styles.line} />
              <Text style={styles.orText}>ou</Text>
              <View style={styles.line} />
            </View>

            <Text style={styles.registerText}>
              Não tem uma conta?
              {' '}
              <Text
                disabled={loadingSignIn || isLoadingEmail || loadingDelivery}
                onPress={() => {
                  EventProvider.logEvent('login_register_click', {});
                  navigation.navigate('RegisterEmail', {
                    comeFrom,
                  });
                }}
                style={styles.registerLink}
              >
                Cadastre-se agora.
              </Text>
            </Text>
          </View>

        </ScrollView>

      </KeyboardAvoidingView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  headlineContainer: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  headline: {
    fontSize: scale(20),
    fontFamily: FONTS.INTER_SEMI_BOLD,
  },
  subHeadline: {
    marginTop: 2,
    fontSize: scale(13),
    fontFamily: FONTS.INTER_REGULAR,
  },
  inputContainer: {
    flex: 1,
    marginVertical: 16,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  inputContainerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  inputContainerWrapperError: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF2F2',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DD3636',
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  textInput: {
    flex: 1,
    fontSize: scale(12),
    color: '#282828',
    paddingVertical: scale(10),
    fontFamily: FONTS.INTER_MEDIUM,
  },
  textInputError: {
    flex: 1,
    fontSize: scale(12),
    color: '#DD3636',
    paddingVertical: scale(10),
    fontFamily: FONTS.INTER_MEDIUM,
  },
  usernameError: {
    color: '#DD3636',
    marginTop: 3,
    marginLeft: 4,
    fontFamily: FONTS.INTER_MEDIUM,
  },
  forgotPassword: {
    textAlign: 'right',
    fontFamily: FONTS.INTER_MEDIUM,
    fontSize: scale(12),
    marginVertical: 6,
  },
  iconButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  loginButton: {
    width: '90%',
    height: 46,
    backgroundColor: '#3B9B50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  loginText: {
    fontSize: scale(12),
    color: '#FFF',
    fontFamily: FONTS.INTER_MEDIUM,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#9E9D9C',
  },
  orText: {
    marginHorizontal: 24,
    fontSize: scale(13),
    fontFamily: FONTS.INTER_MEDIUM,
  },
  registerText: {
    fontFamily: FONTS.INTER_REGULAR,
    marginBottom: 32,
    fontSize: scale(12),
    color: '#000000',
    textAlign: 'center',
  },
  registerLink: {
    fontFamily: FONTS.INTER_MEDIUM,
    fontSize: scale(12),
  },
  forgotPasswordTitle: {
    fontSize: scale(20),
    color: '#000000',
    fontFamily: FONTS.INTER_SEMI_BOLD,
  },
  forgotPasswordSubtitle: {
    fontSize: scale(13),
    marginTop: 8,
    color: '#7B7B7B',
    fontFamily: FONTS.INTER_MEDIUM,
    lineHeight: 19.6,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    width: 64,
    height: 64,
    backgroundColor: '#11AB6B',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    marginTop: 34,

  },
  forgotPasswordInputContainer: {
    marginTop: 24,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: scale(12),
    color: '#282828',
    paddingVertical: 10,
    fontFamily: FONTS.INTER_MEDIUM,
  },
  forgotPasswordInputContainerError: {
    marginTop: 24,
    color: '#DD3636',
    borderColor: '#DD3636',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: scale(12),
    paddingVertical: 10,
    fontFamily: FONTS.INTER_MEDIUM,
  },
});
