import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import { ModalitySelector } from './pages/ModalitySelector'
import { HeaderCorreReserva } from './components/HeaderCorreReserva'
import { QrCodeScanner } from './pages/QrCodeScanner'
import { RaceDetail } from './pages/RaceDetail'
export type CorreReservaStackParamList = {
  ModalitySelector: undefined;
  QrCodeScanner: undefined;
  RaceDetail: undefined;
}

const CorreReservaStack = createStackNavigator<CorreReservaStackParamList>()

export const CorreReservaStackScreen = () => {

  return (
    <CorreReservaStack.Navigator

      screenOptions={{
        header: () => <HeaderCorreReserva onClickBackButton={() => { }} />,
        headerTransparent: true,
      }}
      initialRouteName='RaceDetail'

    >
      <CorreReservaStack.Screen name='ModalitySelector' component={ModalitySelector} />
      <CorreReservaStack.Screen name='QrCodeScanner' component={QrCodeScanner} />
      <CorreReservaStack.Screen name='RaceDetail' component={RaceDetail} />
    </CorreReservaStack.Navigator>
  )
}