import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import { ModalitySelector } from './pages/ModalitySelector'
import { HeaderCorreReserva } from './components/HeaderCorreReserva'
import { QrCodeScanner, QrCodeScannerProps } from './pages/QrCodeScanner'
import { useNavigation } from '@react-navigation/core'

export type CorreReservaStackParamList = {
  ModalitySelector: undefined;
  QrCodeScanner: QrCodeScannerProps;
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
    </CorreReservaStack.Navigator>
  )
}