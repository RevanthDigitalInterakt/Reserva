import React from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { BaseScreen } from '../../../../components/BaseScreen';
import type { MyCreditsParamList, MyCreditsScreensRoutes } from '../../navigation/MyCreditsNavigator';

import { ChangePhoneNumberContainer } from './ChangePhoneNumber.container';

type ChangePhoneNumberScreenProps = StackScreenProps<
MyCreditsParamList,
MyCreditsScreensRoutes.CHANGE_PHONE_NUMBER
>;

export function ChangePhoneNumberScreen({ route }: ChangePhoneNumberScreenProps) {
  const navigation = useNavigation();

  const navigateBack = () => {
    navigation.goBack();
  };

  const navigateToRegisterPhoneNumber = () => {
    navigation.navigate('registerPhoneNumber', {
      isChangeNumber: true,
      profile: route?.params.profile,
    });
  };

  const navigateToConfirmPhone = () => {
    navigation.navigate('registerPhoneNumber', {
      confirmPhone: true,
      profile: route?.params.profile,
    });
  };

  return (
    <BaseScreen testID="com.usereserva:id/ChangePhoneNumberScreen">
      <ChangePhoneNumberContainer
        profile={route?.params?.profile}
        navigateBack={navigateBack}
        navigateToRegisterPhoneNumber={navigateToRegisterPhoneNumber}
        navigateToConfirmPhone={navigateToConfirmPhone}
      />
    </BaseScreen>
  );
}
