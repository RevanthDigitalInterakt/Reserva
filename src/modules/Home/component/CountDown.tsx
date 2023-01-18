import React, {
  useEffect, useState, Dispatch, SetStateAction,
} from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  TouchableOpacity,
  Dimensions,
  PixelRatio,
  Platform,
} from 'react-native';
import {
  Box, Typography, Button, Icon,
} from '@usereservaapp/reserva-ui';
import Modal from 'react-native-modal';
import FlipNumber from './flipcountdoun/FlipNumber';
import { useCountDown } from '../../../context/ChronometerContext';
import type { ICountDownClock } from '../../../graphql/countDownClock/countdownClockQuery';
import EventProvider from '../../../utils/EventProvider';
import { platformType } from '../../../utils/platformType';

export interface CountDownProps {
  countDown?: ICountDownClock;
  loadingCountDownBanner?: boolean;
}
const deviceWidth = Dimensions.get('window').width;

const scale = deviceWidth / 320;

export const CountDownBanner: React.FC<CountDownProps> = ({
  countDown,
  loadingCountDownBanner,
}: CountDownProps) => {
  const navigation = useNavigation();
  const [ShowModal, setShowModal] = useState<boolean>(false);
  const [showClock, setShowClock] = useState<boolean>(false);
  const [watchType, setWatchType] = useState<number>(0);

  const colors = [
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
  >(colors);
  const { time = '00:00:00', setTime } = useCountDown();

  const shouldShowClock = () => {
    const isTimeToShow = Date.now() > new Date(countDown?.countdownStart).getTime();
    const timeIsOver = Date.now() > new Date(countDown?.countdown).getTime();

    return isTimeToShow && !timeIsOver;
  };

  useEffect(() => {
    if (countDown) {
      setWatchType(countDown?.watchType.split('-')[0]);
      if (shouldShowClock()) {
        setShowClock(true);
      } else {
        setShowClock(false);
      }
    }
  }, [countDown]);

  const goToPromotion = () => {
    const facetInput = [];
    const [categoryType, categoryData] = countDown?.reference?.split(':');
    if (categoryType === 'product') {
      EventProvider.logEvent('select_item', {
        item_list_id: categoryData ?? '',
        item_list_name: '',
      });

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
      navigation.push('ProductCatalog', {
        // facetInput,
        referenceId: countDown?.reference,
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

  return showClock && time !== '00:00:00' ? (
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
            {countDown?.title}
            {' '}
            {countDown?.subtitle && (
              <Typography
                lineHeight={normalize(28)}
                color={textColor}
                fontFamily="reservaSerifLight"
                fontSize={normalize(26)}
              >
                {countDown?.subtitle}
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
                number={time?.split(':')[0]}
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
                number={time?.split(':')[1]}
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
                number={time?.split(':')[2]}
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
                  {countDown?.titleButton}
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
          rulesData={countDown}
          goToPromotion={() => {
            goToPromotion();
            setShowModal(false);
          }}
        />
      </Box>
    </Box>
  ) : null;
};

interface IcheckTheRules {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  rulesData?: ICountDownClock;
  goToPromotion?: () => void;
}
const CheckTheRules = ({
  isVisible,
  setIsVisible,
  rulesData,
  goToPromotion,
}: IcheckTheRules) => (
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
          textAlign="center"
          fontFamily="reservaSerifBold"
          fontSize={34}
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
