import React, { useEffect, useRef, useState, memo } from 'react';

import Clipboard from '@react-native-community/clipboard';
import { Animated, Dimensions, ImageBackground } from 'react-native';
import { View } from 'react-native-animatable';
import Modal from 'react-native-modal';
import Share from 'react-native-share';
import { Box, Button, Icon, theme, Typography } from 'reserva-ui';
import { left, opacity, padding, paddingBottom, right } from 'styled-system';

import { images } from '../../../assets';

interface IData {
  coupon: string;
  colorButton: string;
  titleButton: string;
  descriptionModal: string;
  shareMessage: string;
  titleModal: string;
  colorBar: string;
  titleBar: string;
}
interface DiscoutCodeModalProps {
  data: IData;
  isVisible: boolean;
  onClose: () => void;
}

const { width: screenWidth } = Dimensions.get('screen');

const DiscoutCodeModal: React.FC<DiscoutCodeModalProps> = ({
  data,
  isVisible,
  onClose,
}) => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const toastOpacity = useRef(new Animated.Value(0)).current;

  const modalWidth = screenWidth - 20 * 2;
  const modalHeight = modalWidth - 45;
  // console.log('ModalImage', images.cupomModalBackground);

  const closeModal = () => {
    setIsVisibleModal(false);
  };

  const onClickCopy = () => {
    Clipboard.setString(data.coupon);

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
  };
  const onClickShare = () => {
    Share.open({
      title: 'Compartilhar',
      message: data.shareMessage,
    });
  };

  return (
    isVisible && (
      <>
        <Box
          // position="absolute"
          // zIndex={12}
          // top={50}
          backgroundColor={data.colorBar}
          width="100%"
          height={37}
          flexDirection="row"
        >
          <Box flex={1} justifyContent="center" alignItems="center">
            <Button onPress={() => setIsVisibleModal(true)}>
              <Typography
                color="white"
                fontFamily="reservaSansRegular"
                fontSize={13}
              >
                {data.titleBar}
              </Typography>
            </Button>
          </Box>
          <Box width={28} justifyContent="center" alignItems="center">
            <Button
              onPress={onClose}
              variant="icone"
              icon={<Icon name="Close" size={8} color="white" />}
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
              // height: modalHeight,
              paddingHorizontal: data.coupon ? 15 : 20,
              paddingBottom: data.coupon ? 0 : 15,
            }}
          >
            <Box position="absolute" top={13} right={13}>
              <Button
                onPress={closeModal}
                hitSlop={{
                  top: 30,
                  right: 30,
                  left: 30,
                  bottom: 30,
                }}
                variant="icone"
                icon={<Icon name="Close" size={8} color="preto" />}
              />
            </Box>
            <Box mt={25}>
              <Box mx={15}>
                <Typography
                  fontFamily="reservaSerifRegular"
                  fontSize={18}
                  textAlign="center"
                  lineHeight={25}
                >
                  {data.titleModal}
                </Typography>
              </Box>

              <Box
                backgroundColor="backgroundMenuOpened"
                borderRadius={2}
                px={7.5}
                py={10.5}
                mt={15.2}
              >
                <Typography
                  color="neutroFrio2"
                  fontFamily="nunitoRegular"
                  fontSize={13}
                  textAlign="center"
                  lineHeight={18}
                >
                  {data.descriptionModal}
                </Typography>
              </Box>
            </Box>
            {!!data.coupon && (
              <>
                <Animated.View
                  style={{
                    opacity: toastOpacity,
                  }}
                >
                  <Box
                    style={{
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0,
                      shadowRadius: 2,

                      elevation: 5,
                    }}
                    borderRadius="nano"
                    backgroundColor="white"
                    position="absolute"
                    alignSelf="center"
                    zIndex={5}
                    p={6}
                    top={-7}
                  >
                    <Typography fontFamily="nunitoRegular" fontSize={13}>
                      Código copiado!
                    </Typography>
                  </Box>
                </Animated.View>
                <Box
                  mb={13}
                  mt={35}
                  width={modalWidth - 15 * 2}
                  justifyContent="center"
                >
                  <Button onPress={onClickCopy} inline>
                    <Box
                      backgroundColor="backgroundMenuOpened"
                      width="100%"
                      alignItems="center"
                      justifyContent="center"
                      height={50}
                    >
                      <Typography
                        color="preto"
                        fontFamily="reservaSerifBold"
                        fontSize={20}
                      >
                        {data.coupon}
                      </Typography>
                      <Box position="absolute" right={17.5}>
                        <Icon name="Copy" size={16} color="neutroFrio2" />
                      </Box>
                    </Box>
                  </Button>

                  <Button onPress={onClickShare} mt={10.3} inline>
                    <Box
                      backgroundColor={data.colorButton}
                      width="100%"
                      alignItems="center"
                      justifyContent="center"
                      height={50}
                    >
                      <Typography
                        color="white"
                        fontFamily="nunitoSemiBold"
                        fontSize={13}
                        letterSpacing={1.6}
                      >
                        {data.titleButton}
                      </Typography>
                    </Box>
                  </Button>
                </Box>
              </>
            )}
          </ImageBackground>
        </Modal>
      </>
    )
  );
};
export default React.memo(DiscoutCodeModal);