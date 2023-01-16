import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Platform } from 'react-native';
import { TopBar } from '@usereservaapp/reserva-ui';
import { platformType } from '../../../utils/platformType';

export const TopBarBackButton: React.FC<{
  showShadow?: Boolean;
  loading: Boolean;
  backButtonPress?: () => void;
}> = ({ showShadow = true, backButtonPress, loading = false }) => {
  const navigation = useNavigation();

  const handleGoBack = useCallback(() => {
    if (backButtonPress) {
      backButtonPress();
      return;
    }

    navigation.goBack();
  }, [backButtonPress]);

  return (
    <TopBar
      loading={loading}
      paddingX="quarck"
      bg="white"
      showLogo
      style={{ elevation: showShadow ? 10 : 0 }}
      boxShadow={showShadow && Platform.OS === platformType.IOS ? 'topBarShadow' : null}
      leftButton={{
        name: 'ArrowBack',
        size: 24,
        testID: 'top_bar_button_go_back',
        onPress: handleGoBack,
      }}
      height={50}
    />
  );
};
