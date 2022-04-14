import React, {
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
} from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  TouchableOpacity,
  Dimensions,
  PixelRatio,
  Platform,
  ScrollView,
} from 'react-native';
import { Box, theme, Typography, Button, Icon } from 'reserva-ui';
import Modal from 'react-native-modal';
import {
  configCollection,
  homeQuery,
  ICountDownClockReservaMini,
} from '../../../../graphql/homePage/HomeQuery';
import FlipNumber from '../flipcountdoun/FlipNumber';

import { useChronometerRsvMini } from './useChronometerRsvMini';

import { intervalToDuration } from 'date-fns';
import { useQuery } from '@apollo/client';
import { useCountDown } from '../../../../context/ChronometerContext';
import { useChronometer } from '../../../../modules/CorreReserva/hooks/useChronometer';

const deviceWidth = Dimensions.get('window').width;

export interface CountDownProps {
  countDownMini?: ICountDownClockReservaMini;
}

const scale = deviceWidth / 320;

export const CountDownRsvMini: React.FC<CountDownProps> = ({
  countDownMini,
}: CountDownProps) => {
  const navigation = useNavigation();
  const [countDownClockRsvMini, setCountDownClockRsvMini] =
    React.useState<ICountDownClockReservaMini>();
  const [ShowModal, setShowModal] = useState<boolean>(false);
  const [showClock, setShowClock] = useState<boolean>(false);
  const [watchType, setWatchType] = useState<number>(0);

  const { currentValue, start } = useChronometerRsvMini({
    initial: countDownMini?.formattedValue,
  });

  useEffect(() => {
    if (countDownMini) {
      if (new Date(countDownMini?.countdown).getTime() > Date.now()) {
        start();
      }
    }
  }, [countDownMini]);

  const colorsReservaMini = [
    {
      colorBanner: '#000000',
      colorButton: '#E40C2B',
      clockBackgroundColor: '#1A1A1A',
    },
    {
      colorBanner: '#e45ee3',
      colorButton: '#000000',
      clockBackgroundColor: '#C23032',
    },
    {
      colorBanner: '#000000',
      colorButton: '#e45ee3',
      clockBackgroundColor: '#1A1A1A',
    },
  ];
  const [clockColor, setClockColor] = useState<
    {
      colorBanner: string;
      colorButton: string;
      clockBackgroundColor: string;
    }[]
  >(colorsReservaMini);

  useEffect(() => {
    if (Date.now() > new Date(countDownMini?.countdown).getTime()) {
      setShowClock(true);
    } else {
      setShowClock(false);
    }
    if (countDownMini) {
      setWatchType(countDownMini?.watchType);
    }
  }, [countDownMini]);

  const goToPromotion = () => {
    const facetInput = [];
    const [categoryType, categoryData] = countDownMini?.reference?.split(':');
    if (categoryType === 'product') {
      navigation.navigate('ProductDetail', {
        productId: categoryData,
        itemId: categoryData,
        colorSelected: '#FFFFFF',
      });
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
        referenceId: countDownMini?.reference,
      });
    }
  };
  const textColor = '#FFF';

  function normalize(size) {
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 3;
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 4;
    }
  }

  return !showClock ? (
    <Box
      mb={5}
      minHeight={90}
      paddingX={22}
      alignItems="center"
      alignSelf="center"
      backgroundColor={clockColor[watchType - 1]?.colorBanner}
    >
      <Box width={deviceWidth} paddingX={22}>
        <Box alignItems="center" mb={8} mt={12}>
          <Typography
            lineHeight={normalize(28)}
            color={textColor}
            fontFamily="reservaSerifMedium"
            fontSize={normalize(26)}
          >
            {countDownMini?.title}{' '}
            {countDownMini?.subtitle && (
              <Typography
                lineHeight={normalize(28)}
                color={textColor}
                fontFamily="reservaSerifLight"
                fontSize={normalize(26)}
              >
                {countDownMini?.subtitle}
              </Typography>
            )}
          </Typography>
        </Box>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          paddingBottom={10}
        >
          <Box alignItems="center" mr={17}>
            <Box>
              <Typography
                color={textColor}
                fontFamily="reservaSansRegular"
                fontSize={14}
              >
                Acaba em:
              </Typography>
            </Box>
            <Box flexDirection="row" alignItems="center" mt={5}>
              <FlipNumber
                clockBackgroundColor={
                  clockColor[watchType - 1]?.clockBackgroundColor
                }
                colorDivider={clockColor[watchType - 1]?.colorBanner}
                number={currentValue?.split(':')[0]}
                size={43}
                unit="hours"
              />

              <Box height={14} justifyContent="space-between" marginX={6}>
                <Box height={3} width={3} borderRadius={3} bg="#FFF" />
                <Box height={3} width={3} borderRadius={3} bg="#FFF" />
              </Box>

              <FlipNumber
                clockBackgroundColor={
                  clockColor[watchType - 1]?.clockBackgroundColor
                }
                colorDivider={clockColor[watchType - 1]?.colorBanner}
                number={currentValue?.split(':')[1]}
                size={43}
              />

              <Box height={14} justifyContent="space-between" marginX={6}>
                <Box height={3} width={3} borderRadius={3} bg="#FFF" />
                <Box height={3} width={3} borderRadius={3} bg="#FFF" />
              </Box>

              <FlipNumber
                clockBackgroundColor={
                  clockColor[watchType - 1]?.clockBackgroundColor
                }
                colorDivider={clockColor[watchType - 1]?.colorBanner}
                number={currentValue?.split(':')[2]}
                size={43}
              />
            </Box>
          </Box>
          <Box alignItems="center" flex={1}>
            <TouchableOpacity style={{ width: '100%' }} onPress={goToPromotion}>
              <Box
                bg={clockColor[watchType - 1]?.colorButton}
                paddingY={12}
                mb={4}
              >
                <Typography textAlign="center" color={textColor}>
                  {countDownMini?.titleButton}
                </Typography>
              </Box>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowModal(true)}>
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
          rulesData={countDownMini}
          goToPromotion={() => {
            goToPromotion();
          }}
        />
      </Box>
    </Box>
  ) : null;
};

interface IcheckTheRules {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  rulesData?: ICountDownClockReservaMini;
  goToPromotion?: () => void;
}
const CheckTheRules = ({
  isVisible,
  setIsVisible,
  rulesData,
  goToPromotion,
}: IcheckTheRules) => {
  return (
    <Modal
      avoidKeyboard
      onBackdropPress={() => setIsVisible(false)}
      isVisible={isVisible}
    >
      {/* <ScrollView bounces={false}> */}
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
          <Typography
            textAlign={'center'}
            fontFamily="reservaSerifBold"
            fontSize={34}
          >
            {rulesData?.titleModal}
          </Typography>
        </Box>
        <Box mt={8}>
          <Typography
            textAlign={'center'}
            lineHeight={23}
            fontFamily="reservaSansRegular"
            fontSize={18}
          >
            {rulesData?.descriptionModal}
          </Typography>
        </Box>
        <Box width="100%" mt={38} mb={5}>
          <Button
            variant="primarioEstreito"
            width="100%"
            height={50}
            onPress={goToPromotion}
          >
            <Typography
              color="white"
              fontFamily="nunitoExtraBold"
              fontSize={13}
            >
              IR PARA A PROMO
            </Typography>
          </Button>
        </Box>
      </Box>
      {/* </ScrollView> */}
    </Modal>
  );
};
