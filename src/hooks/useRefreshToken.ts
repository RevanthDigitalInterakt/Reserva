import { AppState, AppStateStatus } from 'react-native';
import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useAuthStore } from '../zustand/useAuth/useAuthStore';
import { RefreshTokenError } from '../zustand/useAuth/types/refreshTokenError';
import { navigateUsingRef } from '../utils/navigationRef';
import { useRemoteConfig } from './useRemoteConfig';

type TAppState = 'active' | 'background' | 'inactive' | 'unknown' | 'extension';

export const handleCheckAppState = async (appState: React.MutableRefObject<AppStateStatus>, nextAppState: TAppState) => !!(
  appState.current.match(/inactive|background/)
    && nextAppState === 'active'
);

export function useRefreshToken() {
  const {
    onInit, onRefreshToken,
  } = useAuthStore(['onInit', 'onRefreshToken']);

  const { initialized } = useRemoteConfig();

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

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (initialized) {
      handleGetUserProfile();
      AppState.addEventListener('change', handleAppStateChange);

      return () => {
      // TODO: use "remove" method returned by addEventListener when updating react-native to 0.65+
        AppState.removeEventListener('change', handleAppStateChange);
      };
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized]);
}
