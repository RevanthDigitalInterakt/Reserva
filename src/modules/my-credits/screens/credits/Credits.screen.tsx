import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { BaseScreen } from '../../../../components/BaseScreen';
import { CreditsContainer } from './Credits.container';

export function CreditsScreen() {
  const navigation = useNavigation();

  const navigateBack = () => {
    navigation.goBack();
  };

  return (
    <BaseScreen testID="com.usereserva:id/CreditsScreen">
      <CreditsContainer
        navigateBack={navigateBack}
      />
    </BaseScreen>
  );
}
