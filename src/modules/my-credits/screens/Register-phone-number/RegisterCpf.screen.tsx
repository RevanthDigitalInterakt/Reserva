import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { BaseScreen } from '../../../../components/BaseScreen';
import { RegisterCpfContainer } from './RegisterCpf.container';

export function RegisterCpfScreen({ route }) {
  const navigation = useNavigation();

  const navigateBack = () => {
    navigation.goBack();
  };

  const navigateToVerifyNumber = () => {
    if (route?.params?.profile?.homePhone) {
      navigation.navigate('changePhoneNumber', {
        profile: route?.params?.profile,
      });
    } else {
      navigation.navigate('registerPhoneNumber', {
        profile: route?.params?.profile,
      });
    }
  };

  return (
    <BaseScreen testID="com.usereserva:id/VerifyCpfScreen">
      <RegisterCpfContainer
        profile={route?.params?.profile}
        navigateBack={navigateBack}
        navigateToVerifyNumber={navigateToVerifyNumber}
      />
    </BaseScreen>
  );
}
