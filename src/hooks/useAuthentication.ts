import { Keyboard } from 'react-native';
import { useCallback, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import EventProvider from '../utils/EventProvider';
import { useAuthStore } from '../zustand/useAuth/useAuthStore';
import useDitoStore from '../zustand/useDitoStore';
import { getApolloClient } from '../utils/getApolloClient';
import { useBagStore } from '../zustand/useBagStore/useBagStore';
import { ExceptionProvider } from '../base/providers/ExceptionProvider';
import { Method } from '../utils/EventProvider/Event';
import { identifyCustomer } from '../zustand/useAuth/methods/identifyCustomer';

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

  const { onSignIn, onSignOut, profile } = useAuthStore(['onSignIn', 'onSignOut', 'profile']);
  const { actions } = useBagStore(['actions']);

  const validateCredentials = () => {
    setLoginCredentials({
      ...loginCredentials,
      showPasswordError: true,
      showUsernameError: true,
      hasError: true,
      showMessageError:
          'Verifique os campos acima e digite um e-mail ou senha válidos',
    });
  };

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
      ExceptionProvider.captureException(err);
      validateCredentials();
    } finally {
      setLoadingSignIn(false);
    }
  }, [navigation, onSignIn, validateCredentials]);

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
      ExceptionProvider.captureException(err);
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
  };
}
