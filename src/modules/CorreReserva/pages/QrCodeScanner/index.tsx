import React from "react"
import { Dimensions } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Box } from "reserva-ui"

const DEVICE_WIDTH = Dimensions.get('window').width

export const QrCodeScanner = () => {

  const qrSize = DEVICE_WIDTH - (2 * 70)

  const innerQrDetailSize = qrSize - (28 * 2)

  const edgesSize = innerQrDetailSize / 4.8
  const edgesSpacing = edgesSize * ((innerQrDetailSize / edgesSize) - 2)

  return (
    <SafeAreaView
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        flex: 1
      }}
    >

      <Box
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
            borderTopLeftRadius={10}
            borderTopWidth={3}
            borderLeftWidth={3}
            borderLeftColor='vermelhoRSV'
            borderTopColor='vermelhoRSV'
            width={edgesSize}
            height={edgesSize}

            marginRight={edgesSpacing}
            marginBottom={edgesSpacing}
          />
          <Box
            borderTopRightRadius={10}
            borderTopWidth={3}
            borderRightWidth={3}
            borderRightColor='vermelhoRSV'
            borderTopColor='vermelhoRSV'
            width={edgesSize}
            height={edgesSize}

          />
          <Box
            borderBottomLeftRadius={10}
            borderBottomWidth={3}
            borderLeftWidth={3}
            borderLeftColor='vermelhoRSV'
            borderBottomColor='vermelhoRSV'
            width={edgesSize}
            height={edgesSize}

          />
          <Box
            borderBottomRightRadius={10}
            borderBottomWidth={3}
            borderRightWidth={3}
            borderRightColor='vermelhoRSV'
            borderBottomColor='vermelhoRSV'
            width={edgesSize}
            height={edgesSize}

            marginLeft={edgesSpacing}
          />
        </Box>
      </Box>

    </SafeAreaView>
  )
}