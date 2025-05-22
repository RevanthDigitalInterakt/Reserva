import * as React from 'react';
import { Platform } from 'react-native';
import { platformType } from '../../../utils/platformType';
import { TopBar } from '../../../components/TopBar';

export const TopBarBackButtonWithoutLogo: React.FC<{
  showShadow?: Boolean;
  loading: Boolean;
  backButtonPress: () => void;
}> = ({ showShadow = true, backButtonPress, loading = false }) => (
  <TopBar
    loading={loading}
    paddingX="quarck"
    bg="white"
    showLogo={false}
    style={{ elevation: showShadow ? 10 : 0 }}
    boxShadow={showShadow && Platform.OS === platformType.IOS ? 'topBarShadow' : null}
    leftButton={{
      testID: 'com.usereserva:id/top_bar_button_logo',
      name: 'ArrowBack',
      size: 24,
      onPress: () => {
        backButtonPress();
      },
    }}
    height={50}
  />
);
