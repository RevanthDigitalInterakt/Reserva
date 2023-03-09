import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { BaseScreen } from '../../../../common/components/BaseScreen';
import {
  MyCreditsParamList,
  MyCreditsScreensRoutes,
} from '../../navigation/MyCreditsNavigator';

import { RegisterCpfContainer } from './RegisterCpf.container';

type RegisterCpfScreenProps = StackScreenProps<
MyCreditsParamList,
MyCreditsScreensRoutes.REGISTER_CPF
>;

export const RegisterCpfScreen = ({
  route,
  navigation: navigate,
}: RegisterCpfScreenProps) => {
  const navigation = useNavigation();

  const navigateBack = () => {
    navigation.goBack();
  };

  const navigateToError = () => {
    navigation.navigate(MyCreditsScreensRoutes.ERROR);
  };

  const navigateToVerifyNumber = () => {
    if (route?.params?.profile?.homePhone) {
      navigation.navigate('changePhoneNumber', {
        profile: route?.params.profile,
      });
    } else {
      navigation.navigate('registerPhoneNumber', {
        profile: route?.params.profile,
      });
    }
  };

  return (
    <BaseScreen testID="com.usereserva:id/VerifyCpfScreen">
      <RegisterCpfContainer
        profile={route?.params.profile}
        navigateBack={navigateBack}
        navigateToError={navigateToError}
        navigateToVerifyNumber={navigateToVerifyNumber}
      />
    </BaseScreen>
  );
};
