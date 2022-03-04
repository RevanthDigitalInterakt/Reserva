import { useSubscription } from "@apollo/client";
import moment from "moment";
import React, { useEffect, useState, Dispatch, SetStateAction, } from "react";
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Dimensions } from "react-native"
import CountDown from "react-native-countdown-component";
import { Box, theme, Typography, Button, Icon } from "reserva-ui";
import { number } from "yup";
import { intervalToDuration } from 'date-fns';
import Modal from "react-native-modal";
import {
  ICountDownClock
} from '../../../graphql/homePage/HomeQuery';
import { useChronometer } from '../../CorreReserva/hooks/useChronometer';
import FlipNumber from './flipcountdoun/FlipNumber'

export interface CountDownProps {
  countDown: ICountDownClock
}
const deviceWidth = Dimensions.get('window').width;

export const CountDownBanner: React.FC<CountDownProps> = ({ countDown }: CountDownProps) => {
  const navigation = useNavigation();
  const [countDownData, setCountDownData] = useState<ICountDownClock>();
  const [ShowModal, setShowModal] = useState<boolean>(false);
  const [showClock, setShowClock] = useState<boolean>(false);
  const limitDate = intervalToDuration({ start: Date.now(), end: new Date(countDown?.countdown) });

  const { currentValue, start, stop, } = useChronometer({
    countDown: true,
    initial: '00:10:10'
    // initial: `${limitDate?.days * 24 + limitDate.hours}:${limitDate.minutes}:${limitDate.seconds}`
  });

  useEffect(() => {
    if (countDown) {
      setCountDownData(countDown);
    }
    if (Date.now() > new Date(countDown?.countdown).getTime()) {
      setShowClock(true)
    } else {
      setShowClock(false)
    }
  }, [countDown]);

  useEffect(() => {
    start();
  }, [])

  const goToPromotion = () => {
    const facetInput = [];
    const [categoryType, categoryData] = countDownData?.reference.split(':');
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
        facetInput,
        referenceId: countDownData?.reference,
      });
    }
  }
  const bgColor = '#000'
  const textColor = '#FFF'

  return (
    // !showClock && currentValue !== '00:00:00' ?

    <Box minHeight={149} paddingBottom={5} paddingX={22} alignItems='center' alignSelf='center' backgroundColor={countDownData?.colorBanner}>

      <Box width={deviceWidth} paddingX={22}>
        <Box alignItems='center' mb={8} mt={7} >
          <Typography
            color={textColor}
            fontFamily="reservaSerifMedium"
            fontSize={28}
          >
            {countDownData?.title}
            <Typography
              color={textColor}
              fontFamily="reservaSerifLight"
              fontSize={28}
            > {countDownData?.subtitle}
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
              <FlipNumber number={120} size={43} unit="hours" />

              <Box height={14} justifyContent="space-between" marginX={6}>
                <Box height={3} width={3} borderRadius={3} bg="#FFF" />
                <Box height={3} width={3} borderRadius={3} bg="#FFF" />
              </Box>

              <FlipNumber number={3} size={43} />

              <Box height={14} justifyContent="space-between" marginX={6}>
                <Box height={3} width={3} borderRadius={3} bg="#FFF" />
                <Box height={3} width={3} borderRadius={3} bg="#FFF" />
              </Box>

              <FlipNumber number={currentValue.split(':')[2]} size={43} />
            </Box>

            {/* <Box
              flexDirection="row"
              alignItems="center"
              mt={5}
            >
              <Box
                minWidth={50}
                height={43}
                borderRadius={5}
                bg="#1A1A1A"
                alignItems="center"
              >
                <Typography
                  color={textColor}
                  fontFamily="reservaSansBold"
                  fontSize={32}
                >
                  {currentValue.split(':')[0]}
                </Typography>
              </Box>
              <Box height={14} justifyContent="space-between" marginX={6}>
                <Box height={3} width={3} borderRadius={3} bg="#FFF" />
                <Box height={3} width={3} borderRadius={3} bg="#FFF" />
              </Box>
              <Box
                width={50}
                height={43}
                borderRadius={5}
                bg="#1A1A1A"
                alignItems="center"
              >
                <Typography
                  color={textColor}
                  fontFamily="reservaSansBold"
                  fontSize={32}
                >
                  {currentValue.split(':')[1]}
                </Typography>
              </Box>
              <Box height={14} justifyContent="space-between" marginX={6}>
                <Box height={3} width={3} borderRadius={3} bg="#FFF" />
                <Box height={3} width={3} borderRadius={3} bg="#FFF" />
              </Box>
              <Box
                width={50}
                height={43}
                borderRadius={5}
                bg="#1A1A1A"
                alignItems="center"
              >
                <Typography
                  color={textColor}
                  fontFamily="reservaSansBold"
                  fontSize={32}
                >
                  {currentValue.split(':')[2]}
                </Typography>
              </Box>
            </Box> */}

          </Box>
          <Box alignItems="center" flex={1}  >
            <TouchableOpacity
              style={{ width: '100%' }}
              onPress={goToPromotion}
            >
              <Box bg={countDownData?.colorButton}
                paddingY={12}
                mb={4}
              >
                <Typography
                  textAlign='center'
                  color={textColor}
                >
                  {countDownData?.titleButton}
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
          rulesData={countDownData}
        />
      </Box >

    </Box >
    // : null
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