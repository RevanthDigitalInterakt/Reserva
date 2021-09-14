import { StackScreenProps } from '@react-navigation/stack'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Divider, Typography } from 'reserva-ui'
import { RootStackParamList } from '../../../routes/StackNavigator'
import { ApplicationState } from '../../../store'
import {
  addCashback,
  setCashback,
  subCashback,
} from '../../../store/ducks/cashback/actions'
import { PriceCustom } from '../../Checkout/components/PriceCustom'
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton'
import QRCode from 'react-native-qrcode-svg';
import { images } from '../../../assets'

type Props = StackScreenProps<RootStackParamList, 'Cashback'>

export const Cashback: React.FC<Props> = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false)
  const { cashback } = useSelector((state: ApplicationState) => state)

  return (
    <SafeAreaView flex={1} backgroundColor='white'>
      <TopBarBackButton
        loading={loading}
        showShadow
        backButtonPress={() => navigation.goBack()}
      />
      <Box mx={20} mt='sm'>
        <Box mb='nano'>
          <Typography variant='tituloSessoes'>Cashback em Lojas</Typography>
        </Box>
        <Typography fontFamily='nunitoRegular' fontSize={14}>
          Use o QR Code para gerar cashback nas compras em lojas físicas.
        </Typography>

        <Box
          my="xl"
          width="100%"
          alignItems="center"
        >
          <QRCode
            value="Just some string value"
            logo={images.logoQRCode}
            logoSize={40}
            size={200}
          />
        </Box>


        <Box mt={20}>
          <Divider variant='fullWidth' />
          <Box py={20} flexDirection='row' justifyContent='space-between'>
            <Typography variant='subtituloSessoes'>
              Créditos e cashback
            </Typography>
            <PriceCustom
              fontFamily='nunitoBold'
              num={cashback.value}
              sizeDecimal={13}
              sizeInterger={20}
            />
          </Box>
        </Box>
      </Box>
    </SafeAreaView>
  )
}
