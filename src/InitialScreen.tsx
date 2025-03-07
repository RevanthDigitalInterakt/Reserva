import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStatusBar } from './context/StatusBarContext';
import { StorageService } from './shared/services/StorageService';
import { useAuthStore } from './zustand/useAuth/useAuthStore';
import { usePrimeConfig } from './zustand/usePrimeConfig/usePrimeConfig';
import { useRefreshToken } from './hooks/useRefreshToken';
import { useWishlistActions } from './hooks/useWishlistActions';

interface IProps {
  children: React.ReactNode;
}

function InitialScreen({ children }: IProps) {
  const { initialized } = useAuthStore(['initialized']);
  const { onPrimeConfig } = usePrimeConfig(['onPrimeConfig']);
  const { barStyle } = useStatusBar();

  useRefreshToken();
  useWishlistActions();

  useEffect(() => {
    if (initialized) {
      const onAppInit = async () => {
        await onPrimeConfig();
      };
      onAppInit();
    }
  }, [initialized]);

  useEffect(() => {
    StorageService.setInstallationToken();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar animated barStyle={barStyle} />
      {children}
    </SafeAreaView>
  );
}

export default InitialScreen;
