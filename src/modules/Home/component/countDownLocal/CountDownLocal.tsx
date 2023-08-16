import { useNavigation } from '@react-navigation/native';
import React, {
  type Dispatch,
  type SetStateAction, useEffect,
  useState,
} from 'react';
import {
  Dimensions,
  PixelRatio,
  Platform, TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import type { ICountDownClock } from '../../../../graphql/countDownClock/countdownClockQuery';
import FlipNumber from '../flipcountdoun/FlipNumber';
import { useChronometerLocal } from './useChronometerLocal';
import { platformType } from '../../../../utils/platformType';
import testProps from '../../../../utils/testProps';
import { Box } from '../../../../components/Box/Box';
import { Typography } from '../../../../components/Typography/Typography';
import { Button } from '../../../../components/Button';
import { IconLegacy } from '../../../../components/IconLegacy/IconLegacy';

const deviceWidth = Dimensions.get('window').width;

export interface CountDownProps {
  countDownLocal?: ICountDownClock;
}

const scale = deviceWidth / 320;

export const CountDownLocal: React.FC<CountDownProps> = ({
  countDownLocal,
}: CountDownProps) => {
  const navigation = useNavigation();

  const [ShowModal, setShowModal] = useState<boolean>(false);
  const [showClock, setShowClock] = useState<boolean>(false);
  const [watchType, setWatchType] = useState<number>(0);

  const { currentValue, start } = useChronometerLocal({
    initial: countDownLocal?.formattedValue,
  });

  useEffect(() => {
    if (countDownLocal) {
      if (new Date(countDownLocal?.countdown).getTime() > Date.now()) {
        start();
      }
    }
  }, [countDownLocal]);

  const colorsReservaLocal = [
    {
      colorBanner: '#000000',
      colorButton: '#E40C2B',
      clockBackgroundColor: '#1A1A1A',
    },
    {
      colorBanner: '#BB181B',
      colorButton: '#000000',
      clockBackgroundColor: '#C23032',
    },
    {
      colorBanner: '#000000',
      colorButton: '#4A4A4A',
      clockBackgroundColor: '#1A1A1A',
    },
    {
      colorBanner: '#0B243B',
      colorButton: '#B40404',
      clockBackgroundColor: '#243A4F',
    },
  ];
  const [clockColor, setClockColor] = useState<
  {
    colorBanner: string;
    colorButton: string;
    clockBackgroundColor: string;
  }[]
  >(colorsReservaLocal);

  const shouldShowClock = () => {
    if (countDownLocal) {
      const isTimeToShow = Date.now() > new Date(countDownLocal?.countdownStart).getTime();
      const timeIsOver = Date.now() > new Date(countDownLocal?.countdown).getTime();
      return isTimeToShow && !timeIsOver;
    }
  };

  useEffect(() => {
    if (countDownLocal) {
      setWatchType(countDownLocal?.watchType?.split('-')[0]);
      if (shouldShowClock()) {
        setShowClock(true);
      } else {
        setShowClock(false);
      }
    }
  }, [countDownLocal]);

  const goToPromotion = () => {
    const facetInput = [];
    const [categoryType, categoryData] = countDownLocal?.reference?.split(':');
    if (categoryType === 'product') {
      navigation.navigate('ProductDetail', {
        productId: categoryData,
        itemId: categoryData,
        colorSelected: '#FFFFFF',
      });
    } else {
      if (categoryType === 'category') {
        if (categoryData) {
          categoryData.split('|').forEach((cat: string) => {
            facetInput.push({
              key: 'c',
              value: cat,
            });
          });
        }
      } else {
        facetInput.push({
          key: 'productClusterIds',
          value: categoryData,
        });
      }
      navigation.push('ProductCatalog', {
        // facetInput,
        referenceId: countDownLocal?.reference,
      });
    }
  };
  const textColor = '#FFF';

  function normalize(size) {
    const newSize = size * scale;
    if (Platform.OS === platformType.IOS) {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 3;
    }
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 4;
  }

  return showClock && currentValue !== '00:00:00' ? (
    <Box
      mb={5}
      minHeight={90}
      paddingX={22}
      alignItems="center"
      alignSelf="center"
      backgroundColor={clockColor[watchType - 1]?.colorBanner}
      testID="com.usereserva:id/count_down_local_container"
    >
      <Box width={deviceWidth} paddingX={22}>
        <Box alignItems="center" mb={8} mt={12}>
          <Typography
            lineHeight={normalize(28)}
            color={textColor}
            fontFamily="reservaSerifMedium"
            fontSize={normalize(26)}
            testID="com.usereserva:id/count_down_local_title"
          >
            {countDownLocal?.title}
            {' '}
            {countDownLocal?.subtitle && (
              <Typography
                lineHeight={normalize(28)}
                color={textColor}
                fontFamily="reservaSerifLight"
                fontSize={normalize(26)}
                testID="com.usereserva:id/count_down_local_subtitle"
              >
                {countDownLocal?.subtitle}
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
                testID="com.usereserva:id/flip_number_hours"
                clockBackgroundColor={
                  clockColor[watchType - 1]?.clockBackgroundColor
                }
                colorDivider={clockColor[watchType - 1]?.colorBanner}
                number={currentValue?.split(':')[0]}
                unit="hours"
              />

              <Box height={14} justifyContent="space-between" marginX={6}>
                <Box height={3} width={3} borderRadius={3} bg="#FFF" />
                <Box height={3} width={3} borderRadius={3} bg="#FFF" />
              </Box>

              <FlipNumber
                testID="com.usereserva:id/flip_number_minutes"
                clockBackgroundColor={
                  clockColor[watchType - 1]?.clockBackgroundColor
                }
                colorDivider={clockColor[watchType - 1]?.colorBanner}
                number={currentValue?.split(':')[1]}
              />

              <Box height={14} justifyContent="space-between" marginX={6}>
                <Box height={3} width={3} borderRadius={3} bg="#FFF" />
                <Box height={3} width={3} borderRadius={3} bg="#FFF" />
              </Box>

              <FlipNumber
                testID="com.usereserva:id/flip_number_seconds"
                clockBackgroundColor={
                  clockColor[watchType - 1]?.clockBackgroundColor
                }
                colorDivider={clockColor[watchType - 1]?.colorBanner}
                number={currentValue?.split(':')[2]}
              />
            </Box>
          </Box>
          <Box alignItems="center" flex={1}>
            <TouchableOpacity style={{ width: '100%' }} onPress={goToPromotion} {...testProps('com.usereserva:id/count_down_local_button')}>
              <Box
                bg={clockColor[watchType - 1]?.colorButton}
                paddingY={12}
                mb={4}
              >
                <Typography textAlign="center" color={textColor}>
                  {countDownLocal?.titleButton}
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
          rulesData={countDownLocal}
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
  rulesData?: ICountDownClockLocal;
  goToPromotion?: () => void;
}
function CheckTheRules({
  isVisible,
  setIsVisible,
  rulesData,
  goToPromotion,
}: IcheckTheRules) {
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
        testID="com.usereserva:id/check_The_rules_container"
      >
        <Box position="absolute" top={16} right={20} zIndex={4}>
          <Button
            testID="com.usereserva:id/count_down_local_button_close"
            onPress={() => setIsVisible(false)}
            variant="icone"
            icon={<IconLegacy size={17} name="Close" />}
          />
        </Box>
        <Box>
          <Typography
            textAlign="center"
            fontFamily="reservaSerifBold"
            fontSize={34}
            testID="com.usereserva:id/check_The_rules_titleModal"
          >
            {rulesData?.titleModal}
          </Typography>
        </Box>
        <Box mt={8}>
          <Typography
            // textAlign={'center'}
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
            testID="com.usereserva:id/check_the_rules_button"
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
    </Modal>
  );
}
