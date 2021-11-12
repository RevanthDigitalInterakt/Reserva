import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import { ModalitySelector } from './pages/ModalitySelector'
import { HeaderCorreReserva } from './components/HeaderCorreReserva'
import { QrCodeScanner } from './pages/QrCodeScanner'

export type CorreReservaStackParamList = {
  ModalitySelector: undefined;
  QrCodeScanner: undefined;
}

const CorreReservaStack = createStackNavigator<CorreReservaStackParamList>()

export const CorreReservaStackScreen = () => {

  return (
    <CorreReservaStack.Navigator

      screenOptions={{
        header: () => <HeaderCorreReserva onClickBackButton={() => { }} />,
        headerTransparent: true,
      }}
      initialRouteName='ModalitySelector'

    >
      <CorreReservaStack.Screen name='ModalitySelector' component={ModalitySelector} />
      <CorreReservaStack.Screen name='QrCodeScanner' component={QrCodeScanner} />
    </CorreReservaStack.Navigator>
  )
}