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
      />
      {/* <Box
        width={qrSize}
        height={qrSize}
        backgroundColor='white'
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

        <Box
          position='absolute'
          bottom={-56}
        >
          <Typography
            color='white'
            fontSize={16}
            fontFamily='reservaSansRegular'
            textAlign='center'
            lineHeight={20}
          >
            {`Aponte a câmera do seu celular\npro QR Code da largada.`}
          </Typography>
        </Box>
      </Box>


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
      </Box> */}

    </SafeAreaView>
  )
}