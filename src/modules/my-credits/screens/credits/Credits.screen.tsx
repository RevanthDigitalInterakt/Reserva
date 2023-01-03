import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { BaseScreen } from '../../../../common/components/BaseScreen';
import { MyCreditsScreensRoutes } from '../../navigation/MyCreditsNavigator';
import { CreditsContainer } from './Credits.container';

export const CreditsScreen = () => {
  const navigation = useNavigation();

  const navigateBack = () => {
    navigation.goBack();
  };

  const navigateToCashbackInStore = (isLoyal: boolean, costumerDocument: string) => {
    navigation.navigate(MyCreditsScreensRoutes.CASHBACK_IN_STORE, {
      isLoyal,
      costumerDocument,
    });
  };

  const navigateToError = () => {
    navigation.navigate(MyCreditsScreensRoutes.ERROR);
  };

  return (
    <BaseScreen testID="CreditsScreen">
      <CreditsContainer
        navigateBack={navigateBack}
        navigateToError={navigateToError}
        navigateToCashbackInStore={navigateToCashbackInStore}
      />
    </BaseScreen>
  );
};
