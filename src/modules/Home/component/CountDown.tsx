
import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import {
  useNavigation,
} from '@react-navigation/native';
import { TouchableOpacity, Dimensions, PixelRatio, Platform } from "react-native"
import { Box, theme, Typography, Button, Icon } from "reserva-ui";
import Modal from "react-native-modal";
import {
  ICountDownClock
} from '../../../graphql/homePage/HomeQuery';
import FlipNumber from './flipcountdoun/FlipNumber'
import { useCountDown } from '../../../context/ChronometerContext';
export interface CountDownProps {
  countDown?: ICountDownClock;
}
const deviceWidth = Dimensions.get('window').width;

const scale = deviceWidth / 320;

export const CountDownBanner: React.FC<CountDownProps> = ({ countDown, }: CountDownProps) => {
  const navigation = useNavigation();
  const [countDownData, setCountDownData] = useState<ICountDownClock>();
  const [ShowModal, setShowModal] = useState<boolean>(false);
  const [showClock, setShowClock] = useState<boolean>(false);
  const { time = '00:00:00' } = useCountDown();

  useEffect(() => {
    if (Date.now() > new Date(countDown?.countdown).getTime()) {
      setShowClock(true)
    } else {
      setShowClock(false)
    }
  }, [countDown]);


  const goToPromotion = () => {
    const facetInput = [];
    const [categoryType, categoryData] = countDown?.reference?.split(':');;
    if (categoryType === 'product') {
      navigation.navigate('ProductDetail', {
        productId: categoryData,
        itemId: categoryData,
        colorSelected: '#FFFFFF',
      })
    } else {
      if (categoryType === 'category') {
        categoryData.split('|').forEach((cat: string) => {
          facetInput.push({
            key: 'c',
            value: cat,
          });
        });
      } else {
        facetInput.push({
          key: 'productClusterIds',
          value: categoryData,
        });
      }
      navigation.navigate('ProductCatalog', {
        // facetInput,
        referenceId: countDown?.reference,
      });
    }
  }
  const textColor = '#FFF'

  function normalize(size) {
    const newSize = size * scale
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 3
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 4
    }
  }

  return (
    !showClock && time !== '00:00:00' ?

      <Box minHeight={149} paddingBottom={5} paddingX={22} alignItems='center' alignSelf='center' backgroundColor={countDown?.colorBanner}>

        <Box width={deviceWidth} paddingX={22}>
          <Box alignItems='center' mb={8} mt={7} >
            <Typography
              color={textColor}
              fontFamily="reservaSerifMedium"
              fontSize={normalize(28)}
            >
              {countDown?.title}
              <Typography
                color={textColor}
                fontFamily="reservaSerifLight"
                fontSize={normalize(28)}
              > {countDown?.subtitle}
              </Typography>
            </Typography>
          </Box>
          <Box
            flexDirection='row'
            alignItems="center"
            justifyContent='space-between'
          >
            <Box
              alignItems='center'
              mr={17}
            >
              <Box>
                <Typography
                  color={textColor}
                  fontFamily="reservaSansRegular"
                  fontSize={13}
                >
                  Acaba em:
                </Typography>
              </Box>
              <Box flexDirection='row' alignItems="center" mt={5}>
                <FlipNumber number={time?.split(':')[0]} size={43} unit="hours" />

                <Box height={14} justifyContent="space-between" marginX={6}>
                  <Box height={3} width={3} borderRadius={3} bg="#FFF" />
                  <Box height={3} width={3} borderRadius={3} bg="#FFF" />
                </Box>

                <FlipNumber number={time?.split(':')[1]} size={43} />

                <Box height={14} justifyContent="space-between" marginX={6}>
                  <Box height={3} width={3} borderRadius={3} bg="#FFF" />
                  <Box height={3} width={3} borderRadius={3} bg="#FFF" />
                </Box>

                <FlipNumber number={time?.split(':')[2]} size={43} />
              </Box>

            </Box>
            <Box alignItems="center" flex={1}  >
              <TouchableOpacity
                style={{ width: '100%' }}
                onPress={goToPromotion}
              >
                <Box bg={countDown?.colorButton}
                  paddingY={12}
                  mb={4}
                >
                  <Typography
                    textAlign='center'
                    color={textColor}
                  >
                    {countDown?.titleButton}
                  </Typography>
                </Box>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowModal(true)}
              >
                <Typography
                  color={textColor}
                  fontFamily="reservaSansRegular"
                  fontSize={13}
                  style={{ textDecorationLine: 'underline' }}
                >
                  Confira as regras.
                </Typography>
              </TouchableOpacity>
            </Box>
          </Box>
          <CheckTheRules
            isVisible={ShowModal}
            setIsVisible={() => setShowModal(false)}
            rulesData={countDown}
          />
        </Box >

      </Box >
      : null
  )
}

interface IcheckTheRules {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  rulesData?: ICountDownClock;
}
const CheckTheRules = ({ isVisible, setIsVisible, rulesData }: IcheckTheRules) => {

  return (
    <Modal
      avoidKeyboard
      onBackdropPress={() => setIsVisible(false)}
      isVisible={isVisible}
    >
      <Box
        bg="white"
        minHeight={184}
        alignItems="center"
        justifyContent="center"
        px={34}
        py={45}
      >
        <Box position="absolute" top={16} right={20} zIndex={4}>
          <Button
            onPress={() => setIsVisible(false)}
            variant="icone"
            icon={<Icon size={17} name="Close" />}
          />
        </Box>
        <Box>
          <Typography fontFamily="reservaSerifBold" fontSize={34}>
            {rulesData?.titleModal}
          </Typography>
        </Box>
        <Box mt={8}>
          <Typography fontFamily="reservaSansRegular" fontSize={18}>
            {rulesData?.descriptionModal}
          </Typography>
        </Box>
        <Box width="100%" mt={38} mb={5}>
          <Button
            variant="primarioEstreito"
            width="100%"
            height={50}
          // onPress={() => setIsVisible(false)}
          >
            <Typography color="white" fontFamily="nunitoExtraBold" fontSize={13}>
              IR PARA A PROMO
            </Typography>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}