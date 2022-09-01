import React, { useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { StackActions, useNavigation } from '@react-navigation/native';

import { BaseScreen } from '../../../../common/components/BaseScreen';
import {
  MyCreditsParamList,
  MyCreditsScreensRoutes,
} from '../../navigation/MyCreditsNavigator';

import { CashbackInStoreContainer } from './CashbackInStore.container';
import { BackHandler } from 'react-native';

type CashbackInStoreScreenProps = StackScreenProps<
  MyCreditsParamList,
  MyCreditsScreensRoutes.CASHBACK_IN_STORE
>;

export const CashbackInStoreScreen = ({
  route,
  navigation: navigate,
}: CashbackInStoreScreenProps) => {
  const navigation = useNavigation();

  const navigateBack = () => {
    navigation.dispatch(StackActions.popToTop());

    navigation.navigate('Home');
  };

  const navigateToError = () => {
    navigation.navigate(MyCreditsScreensRoutes.ERROR);
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.dispatch(StackActions.popToTop());

      navigation.navigate('Home');
      return true;
    });

    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault()
      //clear setInterval here and go back
    })
  }, []);

  return (
    <BaseScreen testID="CashbackInStoreScreen">
      <CashbackInStoreContainer
        costumerDocument={route.params.costumerDocument}
        navigateBack={navigateBack}
        navigateToError={navigateToError}
      />
    </BaseScreen>
  );
};
