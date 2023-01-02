import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Platform } from 'react-native';
import { TopBar } from '@usereservaapp/reserva-ui';

export const TopBarBackButton: React.FC<{
  showShadow?: Boolean;
  loading: Boolean;
  backButtonPress?: () => void;
}> = ({ showShadow = true, backButtonPress, loading = false }) => {
  const navigation = useNavigation();
  return (
    <TopBar
      loading={loading}
      paddingX="quarck"
      bg="white"
      showLogo
      style={{ elevation: showShadow ? 10 : 0 }}
      boxShadow={showShadow && Platform.OS === 'ios' ? 'topBarShadow' : null}
      leftButton={{
        name: 'ArrowBack',
        size: 24,
        onPress: () => {
          if (backButtonPress) {
            backButtonPress();
            return;
          }

          navigation.goBack();
        },
      }}
      height={50}
    />
  );
};
