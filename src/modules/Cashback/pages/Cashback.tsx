import { StackScreenProps } from '@react-navigation/stack'
import React, { useState, useRef } from 'react'
import { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Divider, Typography, Alert, Icon } from 'reserva-ui'
import { RootStackParamList } from '../../../routes/StackNavigator'
import { PriceCustom } from '../../Checkout/components/PriceCustom'
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton'
import QRCode from 'react-native-qrcode-svg';
import { images } from '../../../assets'
import { GenerateToken } from '../../../services/unicoService'
import Modal from "react-native-modal";

type Props = StackScreenProps<RootStackParamList, 'Cashback'>

export const Cashback: React.FC<Props> = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false)
  const { credits } = route.params
  const [token, setToken] = useState();
  const modalRef = useRef(false);
  const [successModal, setSuccessModal] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [loadingModal, setLoadingModal] = useState(false);
  const generateToken = async () => {
    const { data } = await GenerateToken();
    setToken(data.access_token)
  }

  useEffect(() => {
    generateToken()
  }, [])

  useEffect(() => {
    console.log('tokenCashback', token)
  }, [token])


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
            value={token}
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
              num={credits}
              sizeDecimal={13}
              sizeInterger={20}
            />
          </Box>
        </Box>
      </Box>

      <Modal
        // style={{ margin: 0 }}
        // animationIn="slideInRight"
        // animationOut="slideOutRight"
        onBackButtonPress={() => {
          // androidCloseButton();
        }}
        avoidKeyboard
        onBackdropPress={() => {
          // onClose();
        }}
        // backdropColor={theme.colors.modalBackDropColor}
        isVisible={true}
      >

        <Box
          bg="white"
          height={184}
          alignItems="center"
          justifyContent="center"
          px="xxxs"
          py="xxxs"
        >
          <Box position='absolute' top={16} right={20} zIndex={4}>
            <Button
              onPress={() => setShowModal(false)}
              variant='icone'
              icon={
                <Icon size={12} name='Close' />
              }
            />
          </Box>
          <Box mt="xxxs">
            <Typography
              fontFamily="reservaSerifRegular"
              fontSize={20}
            >
              Parabéns! Você recebeu
              <Typography
                fontFamily="reservaSerifBold"
                fontSize={20}
              > R$ 10, 00 de
              </Typography> Cashback.
            </Typography>
          </Box>
          <Box width="100%" mt="micro">
            <Button bg="verdeSucesso" width="100%" height={50} onPress={() => setShowModal(false)}>
              <Typography color="white" fontFamily="nunitoSemiBold" fontSize={13}>Ok</Typography>
            </Button>
          </Box>
        </Box>
      </Modal>
    </SafeAreaView>
  )
}
