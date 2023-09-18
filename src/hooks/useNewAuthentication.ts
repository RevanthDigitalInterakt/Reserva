import { useCallback, useState } from 'react';

import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EventProvider from '../utils/EventProvider';
import { useAuthStore } from '../zustand/useAuth/useAuthStore';
import useDitoStore from '../zustand/useDitoStore';
import { getApolloClient } from '../utils/getApolloClient';
import { useBagStore } from '../zustand/useBagStore/useBagStore';
import { ExceptionProvider } from '../base/providers/ExceptionProvider';
import { useNavigationToDelivery } from './useNavigationToDelivery';
import type { ProfileQuery } from '../base/graphql/generated';

interface IParamsHook {
  closeModal?: () => void;
}

export function useNewAuthentication({ closeModal }: IParamsHook) {
  const navigation = useNavigation();
  const [loadingSignIn, setLoadingSignIn] = useState(false);

  const { handleNavigateToDelivery } = useNavigationToDelivery();
  const { onSignIn, onSignOut, errorSignInMessage } = useAuthStore(['onSignIn', 'onSignOut', 'errorSignInMessage']);
  const { actions } = useBagStore(['actions']);

  const checkNavigation = useCallback((navigationOrigin: string, profile: ProfileQuery) => {
    if (navigationOrigin === 'Profile') {
      navigation?.navigate('Home');
      return;
    }

    if (navigationOrigin === 'BagScreen') {
      handleNavigateToDelivery(profile);
      return;
    }

    navigation?.navigate(navigationOrigin);
  }, [handleNavigateToDelivery, navigation]);

  const handleLogin = useCallback(async (
    email: string,
    password: string,
    navigationOrigin: string,
  ) => {
    try {
      setLoadingSignIn(true);
      const response = await onSignIn(email, password);

      if (closeModal) {
        closeModal();
        return;
      }

      checkNavigation(navigationOrigin, response);
    } catch (error) {
      Alert.alert('Erro', errorSignInMessage, [
        {
          onPress: () => {},
          text: 'OK',
        },
        {
          onPress: () => {},
          text: 'Cancelar',
        },
      ]);
      ExceptionProvider.captureException(error);
    } finally {
      setLoadingSignIn(false);
      EventProvider.logEvent('login', {
        custumer_email: email,
      });
    }
  }, [checkNavigation, closeModal, errorSignInMessage, onSignIn]);

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

  return {
    handleLogin,
    handleLogout,
    loadingSignIn,
  };
}
