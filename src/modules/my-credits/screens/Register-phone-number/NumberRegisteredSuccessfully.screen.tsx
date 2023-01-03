import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { BaseScreen } from '../../../../common/components/BaseScreen';
import { MyCreditsParamList, MyCreditsScreensRoutes } from '../../navigation/MyCreditsNavigator';

import { NumberRegisteredSuccessfullyContainer } from './NumberRegisteredSuccessfully.container';

type NumberRegisteredSuccessfullyScreenProps = StackScreenProps<
MyCreditsParamList,
MyCreditsScreensRoutes.NUMBER_REGISTERED_SUCCESSFULLY
>;

export const NumberRegisteredSuccessfullyScreen = (
  {
    route,
    navigation: navigate,
  }: NumberRegisteredSuccessfullyScreenProps,
) => {
  const navigation = useNavigation();

  const navigateBack = () => {
    navigation.goBack();
  };

  const navigateToError = () => {
    navigation.navigate(MyCreditsScreensRoutes.ERROR);
  };

  const navigateToCashbackInStore = () => {
    navigation.navigate('cashbackInStore', {
      isLoyal: true,
      costumerDocument: route.params.costumerDocument,
    });
  };
  return (
    <BaseScreen testID="NumberRegisteredSuccessfullyScreen">
      <NumberRegisteredSuccessfullyContainer
        navigateBack={navigateBack}
        navigateToError={navigateToError}
        navigateToCashbackInStore={navigateToCashbackInStore}
      />
    </BaseScreen>
  );
};
