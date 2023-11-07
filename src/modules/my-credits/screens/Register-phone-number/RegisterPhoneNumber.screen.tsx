import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { BaseScreen } from '../../../../components/BaseScreen';
import { RegisterPhoneNumberContainer } from './RegisterPhoneNumber.container';

export function RegisterPhoneNumberScreen({ route }) {
  const navigation = useNavigation();

  const navigateBack = () => {
    navigation.goBack();
  };

  const navigateToNumberRegisteredSuccessfully = () => {
    navigation.navigate('numberRegisteredSuccessfully', {
      costumerDocument: route?.params.profile.document,
    });
  };

  return (
    <BaseScreen testID="com.usereserva:id/">
      <RegisterPhoneNumberContainer
        profile={route?.params?.profile}
        isChangeNumber={route?.params?.isChangeNumber}
        confirmPhone={route?.params?.confirmPhone}
        navigateBack={navigateBack}
        navigateToNumberRegisteredSuccessfully={navigateToNumberRegisteredSuccessfully}
      />
    </BaseScreen>
  );
}
