import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';

import { BaseScreen } from '../../../../components/BaseScreen';
import { CashbackInStoreContainer } from './CashbackInStore.container';

export function CashbackInStoreScreen() {
  const navigation = useNavigation();

  const navigateBack = () => {
    navigation.dispatch(StackActions.popToTop());

    navigation.navigate('Profile');
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.dispatch(StackActions.popToTop());

      navigation.navigate('Home');
      return true;
    });

    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    });
  }, []);

  return (
    <BaseScreen testID="com.usereserva:id/CashbackInStoreScreen">
      <CashbackInStoreContainer
        navigateBack={navigateBack}
      />
    </BaseScreen>
  );
}
