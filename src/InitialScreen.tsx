import React, {
  useCallback, useState, useEffect, useRef,
} from 'react';
import { StatusBar, AppState } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import messaging from '@react-native-firebase/messaging';
import { useStatusBar } from './context/StatusBarContext';
import useInitialDito from './hooks/useInitialDito';
import CodePushModal from './components/CodePushModal/CodePushModal';
import { StorageService } from './shared/services/StorageService';
import OnForegroundEventPush from './utils/Notifee/ForegroundEvents';
import { useAuthStore } from './zustand/useAuth/useAuthStore';
import useCheckAppNewVersion from './hooks/useCheckAppNewVersion';
import { RefreshTokenError } from './zustand/useAuth/types/refreshTokenError';
import { navigateUsingRef } from './utils/navigationRef';

interface IProps {
  children: React.ReactNode;
}

type AppStateType = 'active' | 'background' | 'inactive' | 'unknown' | 'extension';

function InitialScreen({ children }: { children: JSX.Element }) {
  const {
    onInit, onRefreshToken, initialized, isAnonymousUser, profile,
  } = useAuthStore(['onInit', 'onRefreshToken', 'initialized', 'isAnonymousUser', 'profile']);
  const { barStyle } = useStatusBar();
  const [loadingRefreshtoken, setLoadingRefreshToken] = useState(false);
  const appState = useRef(AppState.currentState);

  useCheckAppNewVersion();

  const { handleDitoRegisterAnony, handleDitoRegister } = useInitialDito();

  useCheckAppNewVersion();

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

  const onAppInit = useCallback(async () => {
    if (isAnonymousUser) {
      const deviceToken = await messaging().getToken();
      handleDitoRegisterAnony({ deviceToken });
    }

    if (profile) {
      handleDitoRegister();
    }
  }, [handleDitoRegisterAnony, isAnonymousUser, profile, handleDitoRegister]);

  useEffect(() => {
    if (initialized) {
      onAppInit();
    }
  }, [initialized, isAnonymousUser, onAppInit]);

  useEffect(() => {
    StorageService.setInstallationToken();
  }, []);

  // TODO refactor OnForegroundEventPush to useSubscriberForeground()
  useEffect(() => {
    // TODO check func OnForegroundEventPush for add subscriber
    // useSubscriberForeground()
    OnForegroundEventPush();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar animated barStyle={barStyle} />

      <CodePushModal />

      <Animatable.View animation="fadeIn" style={{ height: '100%' }}>
        {children}
      </Animatable.View>
    </SafeAreaView>
  );
}

export default InitialScreen;
