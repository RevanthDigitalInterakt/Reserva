import { useNavigation } from "@react-navigation/core"
import { StackNavigationProp } from "@react-navigation/stack"
import React from "react"
import { Dimensions } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import { backgroundApp, Box, theme, Typography } from "reserva-ui"
import { CorreReservaStackParamList } from "../.."
import QRCodeScanner from 'react-native-qrcode-scanner';

const DEVICE_WIDTH = Dimensions.get('window').width
const DEVICE_HEIGHT = Dimensions.get('window').height

export interface QrCodeScannerProps {
  isFinalizingRace?: boolean,
}

type QrCodeScannerNavigator = StackNavigationProp<CorreReservaStackParamList, 'QrCodeScanner'>

export const QrCodeScanner: React.FC<QrCodeScannerProps> = ({
  isFinalizingRace
}) => {

  const navigation = useNavigation<QrCodeScannerNavigator>()

  const qrSize = DEVICE_WIDTH - (2 * 70)

  const innerQrDetailSize = qrSize - (28 * 2)

  const edgesSize = innerQrDetailSize / 4.8
  const edgesSpacing = edgesSize * ((innerQrDetailSize / edgesSize) - 2)

  const HandleOnPressBottom = () => {
    navigation.navigate('RaceDetail')
  }

  const onSuccess = (e) => {
    console.log(e)
    if (e.data == "teste")
      navigation.navigate('RaceDetail')
  }

  return (
    <SafeAreaView
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        flex: 1
      }}
    >

      <QRCodeScanner
        onRead={onSuccess}
        showMarker
        customMarker={<QrCodeMarker qrSize={qrSize} />}
        cameraType='front'
        cameraStyle={{
          height: '100%',
          width: DEVICE_WIDTH,
        }}
      />

      <Box
        position='absolute'
        bottom={49}
        paddingLeft={28}
        paddingRight={28}
        width='100%'
      >

        <TouchableOpacity
          onPress={HandleOnPressBottom}
        >
          {
            isFinalizingRace ?
              <Box
                style={{
                  // marginHorizontal: 28,
                  height: 50,
                  width: '100%',
                  backgroundColor: '#555555',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Typography
                  fontSize={13}
                  fontFamily='nunitoSemiBold'
                  lineHeight={24}
                  color='white'
                  letterSpacing={1.6}
                  style={{ textTransform: 'uppercase' }}
                >
                  Finalize sem LER o QR CODE
                </Typography>
              </Box>
              :

              <Typography
                fontFamily='reservaSansRegular'
                fontSize={16}
                color='white'
                textAlign='center'
              >
                Não deu pra ler o QR Code?
                <Typography
                  fontFamily='reservaSansBold'
                >{`\nClique aqui`} </Typography>
                e inicie agora mesmo.
              </Typography>
          }
        </TouchableOpacity>
      </Box>

    </SafeAreaView>
  )
}

interface QrCodeMarkerProps {
  qrSize: number
}

const QrCodeMarker: React.FC<QrCodeMarkerProps> = ({ qrSize }) => {

  const innerQrDetailSize = qrSize - (28 * 2)

  const edgesSize = innerQrDetailSize / 4.8
  const edgesSpacing = edgesSize * ((innerQrDetailSize / edgesSize) - 2)

  const sidingHeight = (DEVICE_HEIGHT - qrSize) / 2
  const sidingWidth = (DEVICE_WIDTH - qrSize) / 2

  return (
    <Box
      // backgroundColor='#000'
      width={DEVICE_WIDTH}
      justifyContent='center'
      alignItems='center'
      flex={1}
    >
      <Box
        backgroundColor='#000'
        height={sidingHeight}
        width={DEVICE_WIDTH}
      />
      <Box flexDirection='row'>
        <Box
          width={sidingWidth}
          height={qrSize}
          backgroundColor='#000'
        />
        <Box
          width={qrSize}
          height={qrSize}
          borderWidth={1}
          borderColor='neutroQuente2'
          justifyContent='center'
          alignItems='center'
        >

          <Box
            width={innerQrDetailSize}
            height={innerQrDetailSize}
            flexDirection='row'
            flexWrap='wrap'
          >
            <Box
              style={{
                borderTopLeftRadius: 10,
                borderTopWidth: 3,
                borderLeftWidth: 3,
                borderLeftColor: theme.colors.vermelhoAlerta,
                borderTopColor: theme.colors.vermelhoAlerta,
                width: edgesSize,
                height: edgesSize,
                marginRight: edgesSpacing,
                marginBottom: edgesSpacing,
              }}

            />
            <Box
              style={{
                borderTopRightRadius: 10,
                borderTopWidth: 3,
                borderRightWidth: 3,
                borderRightColor: theme.colors.vermelhoAlerta,
                borderTopColor: theme.colors.vermelhoAlerta,
                width: edgesSize,
                height: edgesSize,
              }}

            />
            <Box
              style={{
                borderBottomLeftRadius: 10,
                borderBottomWidth: 3,
                borderLeftWidth: 3,
                borderLeftColor: theme.colors.vermelhoAlerta,
                borderBottomColor: theme.colors.vermelhoAlerta,
                width: edgesSize,
                height: edgesSize,
              }}

            />
            <Box
              style={{
                borderBottomRightRadius: 10,
                borderBottomWidth: 3,
                borderRightWidth: 3,
                borderRightColor: theme.colors.vermelhoAlerta,
                borderBottomColor: theme.colors.vermelhoAlerta,
                width: edgesSize,
                height: edgesSize,
                marginLeft: edgesSpacing,
              }}
            />
          </Box>
        </Box>
        <Box
          width={sidingWidth}
          height={qrSize}
          backgroundColor='#000'
        />
      </Box>
      <Box
        backgroundColor='#000'
        height={sidingHeight}
        width={DEVICE_WIDTH}
      />
    </Box>
  )
}