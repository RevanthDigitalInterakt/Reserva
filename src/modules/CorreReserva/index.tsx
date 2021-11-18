import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Alert } from 'reserva-ui';

import { HeaderCorreReserva } from './components/HeaderCorreReserva';
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

  const [isVisibleAlert, setIsVisibleAlert] = useState(true);

  return (
    <CorreContextProvider>
      <Alert
        isVisible={isVisibleAlert}
        title={
          'Tem certeza que deseja sair da corrida?\n Seus dados não serão salvos!'
        }
        confirmText="SAIR"
        cancelText="CONTINUAR"
        onConfirm={() => {
          setIsVisibleAlert(false);
          navigation.goBack();
        }}
        onClose={() => {
          setIsVisibleAlert(false);
        }}
        onCancel={() => {
          setIsVisibleAlert(false);
        }}
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
