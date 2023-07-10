import { Keyboard } from 'react-native';
import { useCallback, useState } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';

import { useCart } from '../context/CartContext';
import EventProvider from '../utils/EventProvider';
import { useAuthStore } from '../zustand/useAuth/useAuthStore';
import type { RootStackParamList } from '../routes/StackNavigator';

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

type IParamsHook = Partial<StackScreenProps<RootStackParamList, 'LoginAlternative'>> & {
  closeModal?: () => void,
};

export function useAuthentication({ navigation, closeModal }: IParamsHook) {
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [loadingSignIn, setLoadingSignIn] = useState(false);
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState(initialLoginCredentials);

  const { onSignIn } = useAuthStore(['onSignIn']);

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
    loadingSignIn,
    isLoadingEmail,
    verifyUserEmail,
    setEmailIsValid,
    loginCredentials,
    setPasswordIsValid,
    setLoginCredentials,
  };
}
