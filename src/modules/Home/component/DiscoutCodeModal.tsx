import React, { useRef, useState } from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import { Animated, Dimensions, ImageBackground } from 'react-native';
import Modal from 'react-native-modal';
import Share from 'react-native-share';

import images from '../../../base/styles/icons';
import testProps from '../../../utils/testProps';
import { Box } from '../../../components/Box/Box';
import { Button } from '../../../components/Button';
import { Typography } from '../../../components/Typography/Typography';
import { theme } from '../../../base/usereservappLegacy/theme';
import { IconLegacy } from '../../../components/IconLegacy/IconLegacy';

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

const DiscoutCodeModal = ({
  data,
  isVisible,
  onClose,
}: DiscoutCodeModalProps) => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const toastOpacity = useRef(new Animated.Value(0)).current;

  const modalWidth = screenWidth - 20 * 2;

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
          backgroundColor={data.colorBar}
          width="100%"
          height={37}
          flexDirection="row"
          testID="com.usereserva:id/discout_code_modal_container"
        >
          <Box flex={1} justifyContent="center" alignItems="center">
            <Button onPress={() => setIsVisibleModal(true)}>
              <Typography
                testID="com.usereserva:id/discout_code_modal_title"
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
              testID="com.usereserva:id/discout_code_modal_button"
              onPress={onClose}
              variant="icone"
              icon={<IconLegacy name="Close" size={8} color="white" />}
              hitSlop={{
                top: 30, right: 30, bottom: 30, left: 30,
              }}
            />
          </Box>
        </Box>

        <Modal
          backdropColor={theme.colors.modalBackDropColor}
          isVisible={isVisibleModal}
          onBackdropPress={closeModal}
          avoidKeyboard
          testID="com.usereserva:id/discount_code_modal_second_container"
        >
          <ImageBackground
            source={images.cupomModalBackground}
            style={{
              width: modalWidth,
              paddingHorizontal: data.coupon ? 15 : 20,
              paddingBottom: data.coupon ? 0 : 15,
            }}
          >
            <Box position="absolute" top={13} right={13}>
              <Button
                testID="com.usereserva:id/discout_code_modal_button_close_modal"
                onPress={closeModal}
                hitSlop={{
                  top: 30,
                  right: 30,
                  left: 30,
                  bottom: 30,
                }}
                variant="icone"
                icon={<IconLegacy name="Close" size={8} color="preto" />}
              />
            </Box>
            <Box mt={25}>
              <Box mx={15}>
                <Typography
                  testID="com.usereserva:id/discout_code_modal_title_modal"
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
                  testID="com.usereserva:id/discout_code_modal_description_modal"
                >
                  {data.descriptionModal}
                </Typography>
              </Box>
            </Box>
            {!!data.coupon && (
              <>
                <Animated.View
                  {...testProps('com.usereserva:id/discout_code_modal_animated_view')}
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
                  <Button onPress={onClickCopy} inline testID="com.usereserva:id/discout_code_modal_button_copy">
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
                        <IconLegacy name="Copy" size={16} color="neutroFrio2" />
                      </Box>
                    </Box>
                  </Button>

                  <Button onPress={onClickShare} mt={10.3} inline testID="com.usereserva:id/discout_code_modal_button_share">
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
