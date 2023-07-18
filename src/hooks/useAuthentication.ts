import { Keyboard } from 'react-native';
import { useCallback, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import EventProvider from '../utils/EventProvider';
import { useAuthStore } from '../zustand/useAuth/useAuthStore';
import useDitoStore from '../zustand/useDitoStore';
import { getApolloClient } from '../utils/getApolloClient';
import { useBagStore } from '../zustand/useBagStore/useBagStore';

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

  const { onSignIn, onSignOut } = useAuthStore(['onSignIn', 'onSignOut']);
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

      await onSignIn(email, password);

      if (closeModal) {
        closeModal();
      } else {
        navigation?.navigate('Home');
      }
    } catch (err) {
      EventProvider.captureException(err);
      validateCredentials();
    } finally {
      setLoadingSignIn(false);
    }
  }, [navigation, onSignIn, validateCredentials]);

  const { identifyCustomer } = useCart();

  const handleLogin = useCallback(async () => {
    if (emailIsValid && passwordIsValid) {
      setIsLoadingEmail(true);
      const email = loginCredentials.username.trim().toLowerCase();
      const { password } = loginCredentials;

      await doSignIn(email, password);

      EventProvider.logEvent('login', {
        custumer_email: email,
      });

      setIsLoadingEmail(false);
    } else {
      validateCredentials();
    }
  }, [emailIsValid, passwordIsValid, loginCredentials, doSignIn, validateCredentials]);

  const handleLogout = useCallback(async () => {
    try {
      useDitoStore.persist.clearStorage();
      await getApolloClient().clearStore();
    } catch (err) {
      EventProvider.captureException(err);
    } finally {
      actions.RESET_ORDER_FORM();
      onSignOut();
    }
  }, [actions, onSignOut]);

  const verifyUserEmail = useCallback(async () => {
    if (loginCredentials.username.trim().toLowerCase()) {
      setIsLoadingEmail(true);

      await identifyCustomer()
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
