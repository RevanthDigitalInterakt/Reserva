import React, { useEffect, useRef, useState } from "react"
import { Box, Button, Icon, theme, Typography } from "reserva-ui"
import Modal from 'react-native-modal'
import { Animated, Dimensions, ImageBackground } from "react-native"
import { images } from "../../../assets"
import Share from 'react-native-share';
import { left, opacity, right } from "styled-system"
import Clipboard from "@react-native-clipboard/clipboard"
import { View } from "react-native-animatable"

interface DiscoutCodeModalProps {
  isVisible: boolean,
  code: string,
  onClose: () => void,
}

const { width: screenWidth } = Dimensions.get('screen')

export const DiscoutCodeModal: React.FC<DiscoutCodeModalProps> = ({
  isVisible,
  code,
  onClose
}) => {

  const [isVisibleModal, setIsVisibleModal] = useState(false)

  const toastOpacity = useRef(new Animated.Value(0)).current

  const modalWidth = screenWidth - (20 * 2)
  const modalHeight = modalWidth - 45
  console.log('ModalImage', images.cupomModalBackground)


  const closeModal = () => {
    setIsVisibleModal(false)
  }

  const onClickCopy = () => {
    Clipboard.setString(code)

    Animated.sequence([
      Animated.timing(toastOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(toastOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => { });
  }
  const onClickShare = () => {
    Share.open({
      title: 'Compartilhar',
      message: `Estou te dando R$ 50 em créditos* na Reserva! Pra resgatar, é só baixar o app e inserir na sacola o meu código ${code}. Eu não ia te deixar de fora dessa, né? 

https://play.google.com/store/apps/details?id=com.usereserva

*Válido apenas na 1ª compra no app, com valor acima de R$ 150.`,

    })
  }


  return isVisible && <>

    <Box position='absolute' zIndex={12} top={50} backgroundColor='verdeSucesso' width='100%' height={37} flexDirection='row'>
      <Box flex={1} justifyContent='center' alignItems='center'>
        <Button onPress={() => setIsVisibleModal(true)}>
          <Typography
            color='white'
            fontFamily='reservaSansRegular'
            fontSize={13}
          >Dê R$ 50 em créditos pra quem você quiser!</Typography>
        </Button>
      </Box>
      <Box width={28} justifyContent='center' alignItems='center'>
        <Button
          onPress={onClose}
          variant='icone'
          icon={<Icon name='Close' size={8} color='white' />}
          hitSlop={{ top: 30, right: 30, bottom: 30, left: 30 }}
        />
      </Box>
    </Box>


    <Modal
      backdropColor={theme.colors.modalBackDropColor}
      isVisible={isVisibleModal}
      onBackdropPress={closeModal}
      avoidKeyboard
    >
      <ImageBackground
        source={images.cupomModalBackground}
        style={{
          width: modalWidth,
          height: modalHeight,
          paddingHorizontal: 15
        }}
      >
        <Animated.View style={{
          opacity: toastOpacity
        }}>
          <Box
            style={
              {
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0,
                shadowRadius: 2,

                elevation: 5,
              }}
            borderRadius='nano'
            backgroundColor='white'
            position='absolute'
            alignSelf='center'
            zIndex={5}
            p={6}
            top={modalHeight / 2} >
            <Typography fontFamily='nunitoRegular' fontSize={13}>Código copiado!</Typography>
          </Box>
        </Animated.View>

        <Box position='absolute' top={13} right={13}>
          <Button
            onPress={closeModal}
            hitSlop={{
              top: 30,
              right: 30,
              left: 30,
              bottom: 30
            }}
            variant='icone'
            icon={
              <Icon name='Close' size={8} color='preto' />
            } />
        </Box>
        <Box mt={25}>
          <Box mx={15}>
            <Typography
              fontFamily='reservaSerifRegular'
              fontSize={18}
              textAlign='center'
              lineHeight={25}
            >
              Divulgue seu código e chame todo mundo para baixar o app
            </Typography>
          </Box>

          <Box
            backgroundColor='backgroundMenuOpened'
            borderRadius={2}
            px={7.5}
            py={10.5}
            mt={15.2}
          >
            <Typography
              color='neutroFrio2'
              fontFamily='nunitoRegular'
              fontSize={13}
              textAlign='center'
              lineHeight={18}
            >
              Para ganhar, o(a) convidado(a) deve inserir o código na sacola no fechamento da sua 1ª compra no app, com valor acima de R$ 150.
            </Typography>
          </Box>
        </Box>

        <Box position='absolute' bottom={13} left={15} width={modalWidth - (15 * 2)} justifyContent='center'>
          <Button
            onPress={onClickCopy}
            inline>
            <Box backgroundColor='backgroundMenuOpened' width='100%' alignItems='center' justifyContent='center' height={50}>
              <Typography
                color='preto'
                fontFamily='reservaSerifBold'
                fontSize={20}
              >
                {code}
              </Typography>
              <Box position='absolute' right={17.5} >
                <Icon name='Copy' size={16} color='neutroFrio2' />
              </Box>
            </Box>
          </Button>

          <Button
            onPress={onClickShare}
            mt={10.3}
            inline>
            <Box backgroundColor='verdeSucesso' width='100%' alignItems='center' justifyContent='center' height={50}>
              <Typography
                color='white'
                fontFamily='nunitoSemiBold'
                fontSize={13}
                letterSpacing={1.6}
              >
                COMPARTILHAR
              </Typography>
            </Box>
          </Button>
        </Box>
      </ImageBackground>

    </Modal>
  </>
}