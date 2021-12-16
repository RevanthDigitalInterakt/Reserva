import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { BaseScreen } from '../../../../common/components/BaseScreen';
import { MyCreditsScreensRoutes } from '../../../../modules/my-credits/navigation/MyCreditsNavigator';
import { CreditsView } from './Credits.view';
import { CreditsContainer } from './Credits.container';

export const CreditsScreen = () => {
  const navigation = useNavigation();

  const navigateBack = () => {
    navigation.goBack();
  };

  const navigateToCashbackInStore = () => {
    navigation.navigate(MyCreditsScreensRoutes.CASHBACK_IN_STORE);
  };

  const navigateToError = () => {
    navigation.navigate(MyCreditsScreensRoutes.ERROR);
  };

  return (
    <BaseScreen testID='CreditsScreen'>
      <CreditsContainer
        navigateBack={navigateBack}
        navigateToError={navigateToError}
        navigateToCashbackInStore={navigateToCashbackInStore}
      />
    </BaseScreen>
  )
}
