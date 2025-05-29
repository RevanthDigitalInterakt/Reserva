import { AppState, type AppStateStatus } from 'react-native';
import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useAuthStore } from '../zustand/useAuth/useAuthStore';
import { RefreshTokenError } from '../zustand/useAuth/types/refreshTokenError';
import { navigateUsingRef } from '../utils/navigationRef';

type TAppState = 'active' | 'background' | 'inactive' | 'unknown' | 'extension';

export const handleCheckAppState = async (
  appState: React.MutableRefObject<AppStateStatus>,
  nextAppState: TAppState,
) => !!(
  appState.current.match(/inactive|background/)
    && nextAppState === 'active'
);

export function useRefreshToken() {
  const {
    onInit, onRefreshToken,
  } = useAuthStore(['onInit', 'onRefreshToken']);

  const [loadingRefreshToken, setLoadingRefreshToken] = useState(false);
  const appState = useRef(AppState.currentState);

  const handleGetUserProfile = useCallback(async () => {
    try {
      if (loadingRefreshToken) return;

      setLoadingRefreshToken(true);
      await onRefreshToken();

      onInit();
      setLoadingRefreshToken(false);
    } catch (err) {
      if (err instanceof RefreshTokenError) {
        navigateUsingRef('Login', { invalidSession: true });
      }
    }
  }, [loadingRefreshToken, onInit, onRefreshToken]);

  const handleAppStateChange = useCallback(async (nextAppState: TAppState) => {
    const changeAppState = await handleCheckAppState(appState, nextAppState);

    if (changeAppState && !loadingRefreshToken) {
      setLoadingRefreshToken(true);
      await onRefreshToken();
      setLoadingRefreshToken(false);
    }

    appState.current = nextAppState;
  }, [loadingRefreshToken, appState, onRefreshToken, setLoadingRefreshToken]);

  useEffect(() => {
    handleGetUserProfile();
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);
}
