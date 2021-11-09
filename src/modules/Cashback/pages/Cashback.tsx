import { StackScreenProps } from '@react-navigation/stack'
import React, { useState, useRef } from 'react'
import { useEffect } from 'react'
import { TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
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
  const [acceptConditions, setAcceptConditions] = useState(false)
  const modalRef = useRef(false);
  const [showModalTermsAndConditions, setShowModalTermsAndConditions] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const [loadingModal, setLoadingModal] = useState(false);
  const generateToken = async () => {
    const { data } = await GenerateToken();
    setToken(data.access_token)
  }

  return (
    <SafeAreaView flex={1} backgroundColor='white'>
      <TopBarBackButton
        loading={loading}
        showShadow
        backButtonPress={() => navigation.goBack()}
      />
      <ScrollView>
        <Box mx={20} mt='sm'>
          <Box mb='nano'>
            <Typography variant='tituloSessoes'>Ganhe Cashback na Hora</Typography>
          </Box>
          <Box mb="xxs">
            <Typography fontFamily='nunitoRegular' fontSize={14}>
              Ao finalizar sua compra nas lojas físicas, você pode converter parte do valor em cashback!
            </Typography>
          </Box>

          <Box>
            <Typography fontFamily='nunitoRegular' fontSize={14}>
              Confira as regras da promoção atual com o vendedor e gere seu QR Code abaixo.
            </Typography>
          </Box>
          <Box
            mt="xl"
            alignItems="center"
            justifyContent="center"
          >
            <ImageBackground
              source={images.QrcodeBackground}
              style={{ width: 230, height: 230, justifyContent: "center" }}
              resizeMode="contain"
            >
              {token &&
                <Box
                  alignItems="center"
                  justifyContent="center"
                >
                  <QRCode
                    value={token}
                    logo={images.logoQRCode}
                    logoSize={40}
                    size={200}
                  />
                </Box>
              }

            </ImageBackground>
          </Box>

          <Box mt={20}>
            <ModalTermsAndConditions
              isVisible={showModalTermsAndConditions}
              setIsVisible={() => setShowModalTermsAndConditions(false)}
            />
            <Box
              flexDirection='row'
              alignItems='center'
              mt='xxxs'
              justifyContent="center"
            >
              <TouchableOpacity
                onPress={() => setAcceptConditions(!acceptConditions)}
              >
                <Box
                  backgroundColor={acceptConditions ? 'preto' : 'white'}
                  width={14}
                  height={14}
                  border='1px'
                  borderColor='preto'
                  borderRadius='pico'
                  mr='nano'
                  alignItems='center'
                  justifyContent='center'
                >
                  {acceptConditions && <Icon name="Check" size={14} color='white' mt='nano' ml='quarck' />}
                </Box>
              </TouchableOpacity>

              <Box>
                <Box
                  flexDirection='row'
                  alignItems='center'
                >
                  <Typography variant='precoAntigo3' color='preto'>Li e aceito os </Typography>

                  <TouchableOpacity
                    onPress={() => setShowModalTermsAndConditions(true)}
                  >
                    <Typography
                      variant='precoAntigo3'
                      color='preto'
                      fontWeight='bold'
                      style={{ textDecorationLine: 'underline' }}
                    >termos e condições.</Typography>
                  </TouchableOpacity>
                </Box>
              </Box>
            </Box>

            {token ?
              <Box alignItems="center" justifyContent="center" mt="xs" mb="nano">
                <Typography
                  fontFamily="nunitoSemiBold"
                  fontSize={14}
                  color="verdeSucesso"
                >QR Code gerado com sucesso!
                </Typography>
              </Box>
              :
              <Box mt="xs" mb="nano">
                <Button
                  disabled={!acceptConditions}
                  onPress={() => generateToken()}
                  title={"GERAR QR CODE"}
                  variant="primarioMaior"
                />
              </Box>
            }
          </Box>
        </Box>
      </ScrollView>
      <ModalSuccess />

    </SafeAreaView>
  )
}

interface IModal {
  isVisible: boolean;
  setIsVisible: () => void;
}

const ModalTermsAndConditions = ({ isVisible, setIsVisible }: IModal) => {
  return (
    <Modal
      avoidKeyboard
      onBackdropPress={setIsVisible}
      isVisible={isVisible}
    >
      <Box
        bg="white"
        marginY="xxl"
        justifyContent="center"
        px="xxxs"
        py="xxxs"
      >
        <Box position='absolute' top={16} right={20} zIndex={4}>
          <Button
            onPress={setIsVisible}
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
            Termos e condições
          </Typography>
        </Box>
        <ScrollView>
          <Box mt="xxxs">
            <Typography
              fontFamily="nunitoRegular"
              fontSize={15}
            >
              Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero’s De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with.

              The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it’s seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum.
            </Typography>
          </Box>
        </ScrollView>
        <Box width="100%" mt="micro">
          <Button bg="verdeSucesso" width="100%" height={50} onPress={setIsVisible}>
            <Typography color="white" fontFamily="nunitoSemiBold" fontSize={13}>OPA, VALEU!</Typography>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

const ModalSuccess = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <Modal
      avoidKeyboard
      onBackdropPress={() => setShowModal(false)}
      isVisible={showModal}
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
            fontFamily="reservaSerifBold"
            fontSize={24}
          >
            Parabéns!
          </Typography>
        </Box>
        <Box mt="xxxs">
          <Typography
            fontFamily="reservaSerifRegular"
            fontSize={24}
          >
            Você ganhou cashback.
          </Typography>
        </Box>
        <Box width="100%" mt="micro">
          <Button bg="verdeSucesso" width="100%" height={50} onPress={() => setShowModal(false)}>
            <Typography color="white" fontFamily="nunitoSemiBold" fontSize={13}>OPA, VALEU!</Typography>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}