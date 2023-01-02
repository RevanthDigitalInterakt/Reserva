import * as React from 'react';
import { Platform } from 'react-native';
import { TopBar } from '@usereservaapp/reserva-ui';

export const TopBarCheckoutCompleted: React.FC<{
  showShadow?: Boolean;
  loading: Boolean;
}> = ({ showShadow = true, loading = false }) => (
  <TopBar
    loading={loading}
    paddingX="quarck"
    bg="white"
    showLogo
    style={{ elevation: showShadow ? 10 : 0 }}
    boxShadow={showShadow && Platform.OS === 'ios' ? 'topBarShadow' : null}
    height={50}
  />
);
