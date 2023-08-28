import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Platform } from 'react-native';
import { platformType } from '../../../utils/platformType';
import { TopBar } from '../../../components/TopBar';

interface ITopBarBackButton {
  showShadow?: Boolean;
  loading?: Boolean;
  backButtonPress?: () => void;
}

export function TopBarBackButton({
  showShadow = true,
  backButtonPress,
  loading = false,
}: ITopBarBackButton) {
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
        testID: 'com.usereserva:id/top_bar_button_go_back',
        onPress: handleGoBack,
      }}
      height={50}
    />
  );
}
