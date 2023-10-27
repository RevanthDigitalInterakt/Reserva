import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { BaseScreen } from '../../../../components/BaseScreen';
import { NumberRegisteredSuccessfullyContainer } from './NumberRegisteredSuccessfully.container';

export function NumberRegisteredSuccessfullyScreen({ route }) {
  const navigation = useNavigation();

  const navigateBack = () => {
    navigation.goBack();
  };

  const navigateToCashbackInStore = () => {
    navigation.navigate('cashbackInStore', {
      isLoyal: true,
      costumerDocument: route.params.costumerDocument,
    });
  };
  return (
    <BaseScreen testID="com.usereserva:id/NumberRegisteredSuccessfullyScreen">
      <NumberRegisteredSuccessfullyContainer
        navigateBack={navigateBack}
        navigateToCashbackInStore={navigateToCashbackInStore}
      />
    </BaseScreen>
  );
}
