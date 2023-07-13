import { AppState } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { useAuthStore } from '../zustand/useAuth/useAuthStore';
import { RefreshTokenError } from '../zustand/useAuth/types/refreshTokenError';
import { navigateUsingRef } from '../utils/navigationRef';

type AppStateType = 'active' | 'background' | 'inactive' | 'unknown' | 'extension';

export function useRefreshToken() {
  const {
    onInit, onRefreshToken,
  } = useAuthStore(['onInit', 'onRefreshToken']);
  const [loadingRefreshtoken, setLoadingRefreshToken] = useState(false);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    async function handleGetUserProfile() {
      try {
        setLoadingRefreshToken(true);
        await onRefreshToken();

        onInit();
        setLoadingRefreshToken(false);
      } catch (err) {
        if (err instanceof RefreshTokenError) {
          navigateUsingRef('Login', { invalidSession: true });
        }
      }
    }

    if (!loadingRefreshtoken) {
      handleGetUserProfile();
    }

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      // TODO: use "remove" method returned by addEventListener when updating react-native to 0.65+
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = async (nextAppState: AppStateType) => {
    if (
      appState.current.match(/inactive|background/)
      && nextAppState === 'active' && !loadingRefreshtoken
    ) {
      setLoadingRefreshToken(true);
      await onRefreshToken();
      setLoadingRefreshToken(false);
    }

    appState.current = nextAppState;
  };
}
