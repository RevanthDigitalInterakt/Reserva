import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import { ModalitySelector, ModalitySelectorProps } from './pages/ModalitySelector'
import { HeaderCorreReserva } from './components/HeaderCorreReserva'
import { QrCodeScanner, QrCodeScannerProps } from './pages/QrCodeScanner'
import { RaceDetail, RaceDetailProps } from './pages/RaceDetail'
import { useNavigation } from '@react-navigation/core'
import { RaceFinalized, RaceFinalizedProps } from './pages/RaceFinalized'
export type CorreReservaStackParamList = {
  ModalitySelector?: ModalitySelectorProps;
  QrCodeScanner?: QrCodeScannerProps;
  RaceDetail?: RaceDetailProps;
  RaceFinalized?: RaceFinalizedProps;
}

const CorreReservaStack = createStackNavigator<CorreReservaStackParamList>()

export const CorreReservaStackScreen = () => {
  const navigation = useNavigation()
  return (
    <CorreReservaStack.Navigator

      screenOptions={{
        header: () => <HeaderCorreReserva onClickBackButton={() => { navigation.goBack() }} />,
        headerTransparent: true,
      }}
      initialRouteName='ModalitySelector'

    >
      <CorreReservaStack.Screen name='ModalitySelector' component={ModalitySelector} />
      <CorreReservaStack.Screen name='QrCodeScanner' component={QrCodeScanner} />
      <CorreReservaStack.Screen name='RaceDetail' component={RaceDetail} />
      <CorreReservaStack.Screen
        name='RaceFinalized'
        component={RaceFinalized}
        options={{
          headerShown: false
        }}
      />
    </CorreReservaStack.Navigator>
  )
}