import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

import { HeaderCorreReserva } from './components/HeaderCorreReserva';
import { ModalGetOutCorre } from './components/ModalGetOutCorre';
import CorreContextProvider from './context';
import {
  ModalitySelector,
  ModalitySelectorProps,
} from './pages/ModalitySelector';
import { QrCodeScanner, QrCodeScannerProps } from './pages/QrCodeScanner';
import { RaceDetail, RaceDetailProps } from './pages/RaceDetail';
import { RaceFinalized, RaceFinalizedProps } from './pages/RaceFinalized';

export type CorreReservaStackParamList = {
  ModalitySelector?: ModalitySelectorProps;
  QrCodeScanner?: QrCodeScannerProps;
  RaceDetail?: RaceDetailProps;
  RaceFinalized?: RaceFinalizedProps;
};

const CorreReservaStack = createStackNavigator<CorreReservaStackParamList>();

export const CorreReservaStackScreen = () => {
  const navigation = useNavigation();

  const [isVisibleAlert, setIsVisibleAlert] = useState(false);

  return (
    <CorreContextProvider>
      <StatusBar backgroundColor="#000" />
      <ModalGetOutCorre
        isVisible={isVisibleAlert}
        onClickBackdrop={() => setIsVisibleAlert(false)}
        onCloseButtonPress={() => setIsVisibleAlert(false)}
        onCancelButtonPress={() => {
          setIsVisibleAlert(false);
          navigation.navigate('ModalitySelector');
        }}
        onConfirmButtonPress={() => setIsVisibleAlert(false)}
      />
      <CorreReservaStack.Navigator
        screenOptions={{
          header: () => (
            <HeaderCorreReserva
              onClickBackButton={() => {
                navigation.goBack();
              }}
            />
          ),
          headerTransparent: true,
        }}
        initialRouteName="ModalitySelector"
      >
        <CorreReservaStack.Screen
          name="ModalitySelector"
          component={ModalitySelector}
        />
        <CorreReservaStack.Screen
          name="QrCodeScanner"
          component={QrCodeScanner}
        />
        <CorreReservaStack.Screen
          name="RaceDetail"
          component={RaceDetail}
          options={{
            header: () => (
              <HeaderCorreReserva
                onClickBackButton={() => {
                  setIsVisibleAlert(true);
                }}
              />
            ),
          }}
        />
        <CorreReservaStack.Screen
          name="RaceFinalized"
          component={RaceFinalized}
          options={{
            headerShown: false,
          }}
        />
      </CorreReservaStack.Navigator>
    </CorreContextProvider>
  );
};
