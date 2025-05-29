import { useNavigation, CommonActions } from '@react-navigation/native';
import React from 'react';
import { BaseScreen } from '../../../../components/BaseScreen';
import { MyWalletContainer } from './MyWallet.container';

export function MyWalletScreen() {
  const navigation = useNavigation();

  const navigateBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();

      return;
    }

    navigation.dispatch(CommonActions.navigate({ name: 'HomeTabs' }));
  };

  return (
    <BaseScreen testID="com.usereserva:id/MyWalletScreen">
      <MyWalletContainer
        navigateBack={navigateBack}
      />
    </BaseScreen>
  );
}
