import { Alert, Keyboard } from 'react-native';
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';

import { useNavigation } from '@react-navigation/native';
import EventProvider from '../utils/EventProvider';
import { useAuthStore } from '../zustand/useAuth/useAuthStore';
import useDitoStore from '../zustand/useDitoStore';
import { getApolloClient } from '../utils/getApolloClient';
import { useBagStore } from '../zustand/useBagStore/useBagStore';
import { ExceptionProvider } from '../base/providers/ExceptionProvider';
import { Method } from '../utils/EventProvider/Event';
import { identifyCustomer } from '../zustand/useAuth/methods/identifyCustomer';
import { useTimerStore } from '../zustand/useTimerStore';
import { useRemoteConfig } from './useRemoteConfig';
import { useIsTester } from './useIsTester';
import { useRecoverPasswordVerificationCodeMutation } from '../base/graphql/generated';

const initialLoginCredentials = {
  username: '',
  password: '',
  hasError: false,
  passwordError: '',
  usernameError: '',
  showMessageError: '',
  showPasswordError: false,
  showUsernameError: false,
};

interface IParamsHook {
  closeModal?: () => void;
}

export function useAuthentication({ closeModal }: IParamsHook) {
  const navigation = useNavigation();
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [loadingSignIn, setLoadingSignIn] = useState(false);
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState(initialLoginCredentials);
  const [showPassword, setShowPassword] = useState(false);
  const { onSignIn, onSignOut, profile } = useAuthStore(['onSignIn', 'onSignOut', 'profile']);
  const { actions } = useBagStore(['actions']);
  const { cacheUsername, startTimer, timers } = useTimerStore();

  const { getBoolean } = useRemoteConfig();
  const isTester = useIsTester();
  const showNewForgotPassword = useMemo(() => getBoolean(isTester ? 'show_new_forgot_password_layout_tester' : 'show_new_forgot_password_layout'), [getBoolean, isTester]);

  const [sendEmailVerification, { error }] = useRecoverPasswordVerificationCodeMutation({
    context: { clientName: 'gateway' }, fetchPolicy: 'no-cache',
  });

  const navigateToForgotPassword = useCallback(() => {
    EventProvider.logEvent('login_forgot_password_click', {});
    if (showNewForgotPassword) {
      setShowPassword(true);
      return;
    }

    navigation.navigate('ForgotEmail', {});
  }, [showNewForgotPassword]);

  const cleanInputs = () => {
    setLoginCredentials(initialLoginCredentials);
  };

  const validateCredentials = () => {
    setLoginCredentials({
      ...loginCredentials,
      showPasswordError: true,
      showUsernameError: true,
      hasError: true,
      showMessageError:
        'E-mail ou senha incorretos',
    });
  };

  const validateCredentialsForgot = () => {
    setLoginCredentials({
      ...loginCredentials,
      showUsernameError: true,
      showMessageError:
        'E-mail incorreto',
    });
  };

  useEffect(() => {
    setLoginCredentials(initialLoginCredentials);
  }, [showPassword]);

  const doSignIn = useCallback(async (email: string, password: string) => {
    try {
      setLoadingSignIn(true);

      Keyboard.dismiss();

      const profile = await onSignIn(email, password);

      if (closeModal) {
        closeModal();
        return profile;
      }

      navigation?.navigate('Home');
      return profile;
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível realizar o login, tente novamente', [
        {
          onPress: () => { },
          text: 'OK',
        },
        {
          onPress: () => { },
          text: 'Cancelar',
        },
      ]);
      ExceptionProvider.captureException(err, 'doSignIn - useAuthentication', { email });
      validateCredentials();
    } finally {
      setLoadingSignIn(false);
    }
  }, [navigation, onSignIn, validateCredentials]);

  const handleRecoveryPassword = useCallback(async () => {
    if (!emailIsValid) {
      validateCredentialsForgot();
      return;
    }
    Keyboard.dismiss();

    cacheUsername(loginCredentials.username, timers[loginCredentials.username]?.cookies || []);
    if (timers[loginCredentials.username]?.isActive) {
      navigation.navigate(
        'NewForgotAccessCode',
        {
          username: loginCredentials.username,
        },
      );
      return;
    }

    setLoadingSignIn(true);
    try {
      const { data } = await sendEmailVerification({
        variables: {
          input: { email: loginCredentials.username },
        },
      });

      if (data?.recoverPasswordVerificationCode?.cookies) {
        startTimer(loginCredentials.username, data?.recoverPasswordVerificationCode?.cookies);
        navigation.navigate(
          'NewForgotAccessCode',
          {
            username: loginCredentials.username,
            cookies: data?.recoverPasswordVerificationCode?.cookies,
          },
        );
      }
    } catch (e) {
      ExceptionProvider.captureException(e, 'handleRecoveryPassword - useAuthentication');
    } finally {
      setShowPassword(false);
      setLoadingSignIn(false);
    }
  }, [emailIsValid, loginCredentials]);

  const handleLogin = useCallback(async () => {
    if (emailIsValid && passwordIsValid) {
      setIsLoadingEmail(true);
      const email = loginCredentials.username.trim().toLowerCase();
      const { password } = loginCredentials;

      const profile = await doSignIn(email, password);

      EventProvider.logEvent('login', {
        custumer_email: email,
        method: Method.Email,
      });

      setIsLoadingEmail(false);
      return profile;
    }
    return validateCredentials();
  }, [emailIsValid, passwordIsValid, loginCredentials, doSignIn, validateCredentials]);

  const handleLogout = useCallback(async () => {
    try {
      useDitoStore.persist.clearStorage();
      await getApolloClient().clearStore();
    } catch (err) {
      ExceptionProvider.captureException(err, 'handleLogout - useAuthentication.ts');
    } finally {
      actions.RESET_ORDER_FORM();
      onSignOut();
    }
  }, [actions, onSignOut]);

  const verifyUserEmail = useCallback(async () => {
    if (!profile) return;

    if (loginCredentials.username.trim().toLowerCase()) {
      setIsLoadingEmail(true);

      await identifyCustomer({ id: profile.id, email: profile.email, name: profile.firstName || '' })
        .then(() => setIsLoadingEmail(false))
        .then(() => navigation?.navigate('DeliveryScreen', { comeFrom: 'Login' }));
    }
  }, [identifyCustomer, loginCredentials]);

  return {
    handleLogin,
    handleLogout,
    loadingSignIn,
    isLoadingEmail,
    verifyUserEmail,
    setEmailIsValid,
    loginCredentials,
    setPasswordIsValid,
    setLoginCredentials,
    cleanInputs,
    showPassword,
    setShowPassword,
    handleRecoveryPassword,
    navigateToForgotPassword,
  };
}
