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

type Props = StackScreenProps<RootStackParamList, 'LoginAlternative'>;

export function NewLoginScreen({
  route,
  navigation,
}: Props) {
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
      ExceptionProvider.captureException(e);
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
      ExceptionProvider.captureException(error);
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
                    ExceptionProvider.captureException(error, { writtenEmail: text });
                  }
                }}
                value={loginCredentials.username}
              />
              {loginCredentials.username?.length > 0 && (
              <TouchableOpacity onPress={cleanInputs} style={styles.iconButton}>
                <Cancel color={loginCredentials.showUsernameError ? '#DD3636' : '#A8A8A8'} />
              </TouchableOpacity>
              )}
            </View>
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
                  ? <EyeClose color={loginCredentials.showPasswordError ? '#DD3636' : '#A8A8A8'} />
                  : <EyeOpen color={loginCredentials.showPasswordError ? '#DD3636' : '#A8A8A8'} />}
              </TouchableOpacity>
            </View>
            {(loginCredentials.showPasswordError && loginCredentials.showUsernameError)
            && (
            <Text style={{
              color: '#DD3636', marginTop: -3, marginLeft: 4, fontFamily: 'Inter-Medium',
            }}
            >
              {loginCredentials.showMessageError}
            </Text>
            )}
            <Text
              style={styles.forgotPassword}
              onPress={() => {
                EventProvider.logEvent('login_forgot_password_click', {});
                navigation.navigate('ForgotEmail', {});
              }}
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
    marginTop: 24,
    marginHorizontal: 16,
  },
  headline: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    lineHeight: 24,
  },
  subHeadline: {
    marginTop: 2,
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    lineHeight: 18,
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
    fontSize: 12,
    color: '#282828',
    paddingVertical: 10,
    fontFamily: 'Inter-Medium',
  },
  textInputError: {
    flex: 1,
    fontSize: 12,
    color: '#DD3636',
    paddingVertical: 10,
    fontFamily: 'Inter-Medium',
  },
  forgotPassword: {
    textAlign: 'right',
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
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
    fontSize: 12,
    color: '#FFF',
    fontFamily: 'Inter-Medium',
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
    fontSize: 13,
    fontFamily: 'Inter-Medium',
  },
  registerText: {
    marginBottom: 32,
    fontSize: 12,
    color: '#000000',
    textAlign: 'center',
  },
  registerLink: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
  },
});
