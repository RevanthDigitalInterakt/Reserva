
import { useNavigation } from "@react-navigation/core"
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types"

import React from "react"
import { Dimensions, ImageBackground, InteractionManager, TouchableOpacity } from "react-native"
import { View } from "react-native-animatable"
import { TouchableHighlight } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import { Box, Icon, Image, Typography } from "reserva-ui"
import { height } from "styled-system"
import { CorreReservaStackParamList } from "../.."
import { HeaderCorreReserva } from "../../components/HeaderCorreReserva"
// import { ModalityCard } from "./components/ModalityCard"

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window')

export interface RaceDetailProps {

}

type RaceDetailNavigator = StackNavigationProp<CorreReservaStackParamList, 'RaceDetail'>

export const RaceDetail: React.FC = () => {
  const navigation = useNavigation<RaceDetailNavigator>()
  return (
    <SafeAreaView
      style={{
        // justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 111
      }}
    >

      {/* <HeaderCorreReserva /> */}
      <Box backgroundColor='#0F1113' zIndex={0} position='absolute' width='100%' height={DEVICE_HEIGHT / 2} />

      <Box marginTop={34}>
        <Typography
          fontFamily='reservaSerifRegular'
          fontSize={52}
          color='white'
          textAlign='center'
        >
          <Typography fontFamily='reservaSerifBold' color='white'>0</Typography>
          <Typography fontFamily='reservaSerifLight' color="#808080" >h </Typography>
          <Typography fontFamily='reservaSerifBold' color='white'>00</Typography>
          <Typography fontFamily='reservaSerifLight' color="#808080" >m </Typography>
          <Typography fontFamily='reservaSerifBold' color='white'>00</Typography>
          <Typography fontFamily='reservaSerifLight' color="#808080" >s</Typography>
        </Typography>
      </Box>
      <Box>
        <Box>
          <Icon name="Alert" size={20} color="#808080" />
        </Box>
      </Box>
      <Box
        mt={36}
      >
        {/* <ModalityCard
          onPress={() => navigation.navigate('QrCodeScanner')}
          image='https://cdn-sharing.adobecc.com/content/storage/id/urn:aaid:sc:US:e838898b-0bb1-42e3-8486-3ce163ea0cd1;revision=0?component_id=2db6a30d-2a2d-4c16-8f97-cebc405baf28&api_key=CometServer1&access_token=1636693663_urn%3Aaaid%3Asc%3AUS%3Ae838898b-0bb1-42e3-8486-3ce163ea0cd1%3Bpublic_304bb878df72dad1c0113f3e1d8a7e8f08b3b115'
          title='Presencial'
          description={`Estou em um dos pontos de largada no \nRio de Janeiro e quero ler o QR Code.`}
        />
        <ModalityCard
          image='https://cdn-sharing.adobecc.com/content/storage/id/urn:aaid:sc:US:e838898b-0bb1-42e3-8486-3ce163ea0cd1;revision=0?component_id=e66f9669-d9cf-4f0f-b876-71872fe42950&api_key=CometServer1&access_token=1636693663_urn%3Aaaid%3Asc%3AUS%3Ae838898b-0bb1-42e3-8486-3ce163ea0cd1%3Bpublic_304bb878df72dad1c0113f3e1d8a7e8f08b3b115'
          title='Virtual'
          description={`Estou longe do local do evento e \nquero iniciar minha corrida agora.`}
        /> */}
      </Box>
    </SafeAreaView>
  )
}
