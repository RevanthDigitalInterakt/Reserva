import React from "react"
import { Box, Button, Icon, Image, theme, Typography } from "reserva-ui"
import Modal, { ModalProps } from 'react-native-modal';
import { images } from "../../../assets";
import { useCart } from "../../../context/CartContext";

export interface ModalBookProps {
  isVisible: boolean
  onClose: () => void
  onAddBag?: () => void
}

export const ModalBook: React.FC<ModalBookProps> = ({ isVisible, onAddBag, onClose, ...props }) => {

  const { addItem } = useCart()

  const onPressAddToBag = async () => {
    const { message, ok } = await addItem(1, "202207", '1')
    onClose()
  }
  const onPressNoThanks = async () => {
    onClose()
  }
  const onPressClose = async () => {
    onClose()
  }
  const onPressBackdrop = async () => {
    onClose()
  }

  return <Modal
    {...props}
    backdropColor={theme.colors.modalBackDropColor}
    onBackdropPress={onPressBackdrop}
    isVisible={isVisible}
    avoidKeyboard
    style={{
      justifyContent: 'flex-start'
    }}
  >
    <Box
      mt={76}
      mx={16}
      pb={20}
      bg='white'
    // height={520}
    >
      <Box position='absolute' top={16} right={20} zIndex={4}>
        <Button
          onPress={() => { onPressClose }}
          variant='icone'
          icon={
            <Icon size={12} name='Close' />
          }
        />
      </Box>
      <Image source={images.modalLivro} height={172} width='100%' resizeMode='cover' />
      <Box
        alignItems='center'
        paddingTop={25}
        paddingX={20}
      >

        <Typography fontFamily='reservaSerifBold' fontSize={36}>
          Leve também!
        </Typography>
        <Box mt={11}>
          <Typography textAlign='center' fontFamily='reservaSansLight' fontSize={18} lineHeight={29} >
            Aproveite agora a{' '}

            <Typography fontFamily='reservaSansRegular' style={{ textDecorationLine: 'underline' }}>
              {`pré-venda`}
            </Typography>

            {'* da\n'} Edição Especial do livro

            <Typography fontFamily='reservaSerifMedium'>
              {` Rebeldes Têm Asas `}
            </Typography>

            por R$39,90 e ganhe vantagens exclusivas.
          </Typography>
        </Box>
      </Box>

      <Box px={25}>
        <Button mt={11} width='100%'
          onPress={onPressAddToBag}
        >
          <Box
            alignItems='center'
            justifyContent='center'
            bg='verdeSucesso'
            width='100%'
            height={48}
          >
            <Typography
              fontFamily='nunitoBold'
              fontSize={14}
              color='white'
            >
              ADICIONAR À SACOLA
            </Typography>
          </Box>
        </Button>

        <Button onPress={onPressNoThanks} mt={8.5} title='NÃO, OBRIGADO' variant='primarioEstreitoOutline' inline />

      </Box>
      <Box mt={14}>
        <Typography
          textAlign='center'
          fontFamily='reservaSansRegular'
          fontSize={14}
          color='#707070'
        >
          *Entrega prevista a partir de 01/10/2021.
        </Typography>
      </Box>
    </Box>
  </Modal>
}