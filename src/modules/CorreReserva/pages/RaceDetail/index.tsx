
import { useNavigation } from "@react-navigation/core"
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types"
import React from "react"
import { Platform, ScrollView } from 'react-native';
import { Dimensions, ImageBackground, InteractionManager, TouchableOpacity } from "react-native"
import { View } from "react-native-animatable"
import { TouchableHighlight } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import { Box, Icon, Image, Typography } from "reserva-ui"
import { height } from "styled-system"
import { CorreReservaStackParamList } from "../.."
import { Counter } from "../../components/Counter"
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window')

type RaceDetailNavigator = StackNavigationProp<CorreReservaStackParamList, 'RaceDetail'>


export const RaceDetail: React.FC = () => {
  const navigation = useNavigation<RaceDetailNavigator>()
  return (
    <SafeAreaView
      style={{
        // justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 111,
        flex: 1
      }}
    >

      {/* <HeaderCorreReserva /> */}
      <Box backgroundColor='#0F1113' zIndex={0} position='absolute' width='100%' height={DEVICE_HEIGHT / 2} mx="micro" />
      <Box width={DEVICE_WIDTH - 96} alignItems="center" >

        <Counter
          hours="0"
          minutes="00"
          seconds="00"
          distance="00.0"
          rhythm="0.0"
          plates="00"
        />
        {/* <Box marginTop={34} >
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
        </Box> */}
        {/* <Box px="micro" width="100%" >
          <Box flexDirection="row" justifyContent="space-evenly">
            <Box flexDirection="row"  >
              <Box mt="quarck">
                <IconDistance />
              </Box>
              <Box marginLeft="quarck">
                <Typography fontFamily='reservaSerifBold' fontSize={27} color='white' >00.0</Typography>
                <Typography fontFamily='reservaSerifLight' fontSize={11} color='white'>Distância</Typography>
              </Box>
            </Box>
            <Box flexDirection="row" >
              <Box mt="quarck">
                <IconRhythm />
              </Box>
              <Box marginLeft="quarck">
                <Typography fontFamily='reservaSerifBold' fontSize={27} color='white' >0.0</Typography>
                <Typography fontFamily='reservaSerifLight' fontSize={11} color='white'>Ritmo</Typography>
              </Box>
            </Box>
            <Box flexDirection="row" >
              <Box mt="quarck">
                <IconDish />
              </Box>
              <Box marginLeft="quarck">
                <Typography fontFamily='reservaSerifBold' fontSize={27} color='white' >+00</Typography>
                <Typography fontFamily='reservaSerifLight' fontSize={11} color='white'>Pratos</Typography>
              </Box>
            </Box>
          </Box>
        </Box> */}
        <Box
          mt={"sm"}
          borderRadius="sm"
          width={263}
          height={302}
          boxShadow={Platform.OS === 'ios' ? 'topBarShadow' : null}
          style={{ elevation: 10, overflow: "hidden" }}
          bg="pink"
        >
          <MapView

            provider={PROVIDER_GOOGLE}
            style={{ flex: 2 }}
          // initialRegion={position}
          >
          </MapView>
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
      </Box>
    </SafeAreaView >
  )
}
