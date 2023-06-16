import * as React from 'react';
import { Platform } from 'react-native';
import { platformType } from '../../../utils/platformType';
import { TopBar } from '../../../components/TopBar';

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
    boxShadow={showShadow && Platform.OS === platformType.IOS ? 'topBarShadow' : null}
    height={50}
  />
);
