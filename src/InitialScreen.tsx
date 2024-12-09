import React, {
  useCallback, useEffect,
} from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import messaging from '@react-native-firebase/messaging';
import { useStatusBar } from './context/StatusBarContext';
import useInitialDito from './hooks/useInitialDito';
import CodePushModal from './components/CodePushModal/CodePushModal';
import { StorageService } from './shared/services/StorageService';
import { useAuthStore } from './zustand/useAuth/useAuthStore';
import { usePrimeConfig } from './zustand/usePrimeConfig/usePrimeConfig';
import useCheckAppNewVersion from './hooks/useCheckAppNewVersion';
import { useRefreshToken } from './hooks/useRefreshToken';
import { useWishlistActions } from './hooks/useWishlistActions';
import { useOncePerDayEvent } from './utils/useOncePerDayEvent';

interface IProps {
  children: React.ReactNode;
}

function InitialScreen({ children }: IProps) {
  const {
    initialized, isAnonymousUser, profile,
  } = useAuthStore(['initialized', 'isAnonymousUser', 'profile']);

  const { onPrimeConfig } = usePrimeConfig(['onPrimeConfig']);

  const { barStyle } = useStatusBar();

  const { handleDitoRegisterAnony, handleDitoRegister } = useInitialDito();

  const { triggerEvent } = useOncePerDayEvent('@Dito:lastEventDate');

  useCheckAppNewVersion();
  useRefreshToken();

  useWishlistActions();

  const onAppInit = useCallback(async () => {
    if (isAnonymousUser) {
      const deviceToken = await messaging().getToken();
      handleDitoRegisterAnony({ deviceToken });
    }

    if (profile) {
      handleDitoRegister();
    }

    await onPrimeConfig();
  }, [
    isAnonymousUser,
    profile,
    onPrimeConfig,
    handleDitoRegisterAnony,
    handleDitoRegister,
  ]);

  useEffect(() => {
    if (initialized) {
      onAppInit();
    }
  }, [initialized, isAnonymousUser, onAppInit]);

  useEffect(() => {
    StorageService.setInstallationToken();
  }, []);

  useEffect(() => {
    triggerEvent();
  }, [triggerEvent]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar animated barStyle={barStyle} />

      <CodePushModal />

      {children}
    </SafeAreaView>
  );
}

export default InitialScreen;
