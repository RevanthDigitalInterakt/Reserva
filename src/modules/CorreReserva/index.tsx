import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

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

export const CorreReservaStackScreen = () => (
  <CorreContextProvider>
    <CorreReservaStack.Navigator
      screenOptions={{
        header: () => <HeaderCorreReserva showBackButton />,
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
          header: () => <HeaderCorreReserva showBackButton />,
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
