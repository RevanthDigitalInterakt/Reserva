import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { PixelRatio, Platform, TouchableOpacity } from 'react-native';
import { Box, Typography } from '@usereservaapp/reserva-ui';
import { useNavigation } from '@react-navigation/native';
import type { HomeCountdownQuery } from '../../base/graphql/generated';
import { useCountDown } from '../../context/ChronometerContext';
import testProps from '../../utils/testProps';
import configDeviceSizes from '../../utils/configDeviceSizes';
import { platformType } from '../../utils/platformType';
import { CountDownBannerModal } from './CountDownBannerModal';
import { useChronometer } from '../../hooks/useChronometer';
import CountDownFlipNumber from '../CountDownFlipNumber';

const scale = configDeviceSizes.DEVICE_WIDTH / 320;

function normalize(size: number): number {
  const newSize = size * scale;

  return Platform.OS === platformType.IOS
    ? Math.round(PixelRatio.roundToNearestPixel(newSize)) - 3
    : Math.round(PixelRatio.roundToNearestPixel(newSize)) - 4;
}

interface ICountDownBanner {
  data: HomeCountdownQuery['homeCountdown'];
}

function CountDownBanner({ data }: ICountDownBanner) {
  const navigation = useNavigation();
  const { time = '00:00:00', setTime } = useCountDown();
  const { currentValue, start } = useChronometer({
    countDown: true,
    initial: data?.formattedValue || '00:00:00',
  });

  const [showModal, setShowModal] = useState(false);

  const onPress = useCallback(() => {
    navigation.navigate('ProductCatalog', { referenceId: data?.reference });
  }, [data]);

  const showClock = useMemo(() => {
    if (!data) return false;

    const isTimeToShow = data.countdownStart
      ? Date.now() > new Date(data.countdownStart).getTime()
      : true;

    const timeIsOver = Date.now() > new Date(data.countdown!).getTime();

    return isTimeToShow && !timeIsOver;
  }, [data]);

  useEffect(() => {
    start();
  }, []);

  useEffect(() => {
    if (setTime) {
      setTime(currentValue);
    }
  }, [currentValue]);

  if (!showClock || !data || time === '00:00:00') return null;

  return (
    <Box
      mb="quarck"
      minHeight={90}
      paddingX="xs"
      alignItems="center"
      alignSelf="center"
      backgroundColor={data.theme.colorBanner}
      {...testProps('count_down_banner_container')}
    >
      <Box width={configDeviceSizes.DEVICE_WIDTH} paddingX={22}>
        <Box alignItems="center" mb="micro" mt="micro">
          <Typography
            testID="com.usereserva:id/count_down_banner_title"
            lineHeight={normalize(28)}
            color="white"
            fontFamily="reservaSerifMedium"
            fontSize={normalize(26)}
          >
            {data.title || ''}
            {' '}
            {data.subtitle && (
              <Typography
                {...testProps('count_down_banner_subtitle')}
                lineHeight={normalize(28)}
                color="white"
                fontFamily="reservaSerifLight"
                fontSize={normalize(26)}
              >
                {data.subtitle}
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
              <Typography color="white" fontFamily="reservaSansRegular" fontSize={14}>
                Acaba em:
              </Typography>
            </Box>

            <CountDownFlipNumber theme={data.theme} />
          </Box>

          <Box alignItems="center" flex={1}>
            <TouchableOpacity
              style={{ width: '100%' }}
              onPress={onPress}
              {...testProps('count_down_banner_button_promotion')}
            >
              <Box bg={data.theme.colorButton} paddingY="micro" mb="quarck">
                <Typography textAlign="center" color="white">{data?.titleButton}</Typography>
              </Box>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowModal(true)}
              {...testProps('count_down_show_modal')}
            >
              <Typography
                color="white"
                fontFamily="reservaSansRegular"
                fontSize={13}
                style={{ textDecorationLine: 'underline' }}
              >
                Confira as regras.
              </Typography>
            </TouchableOpacity>
          </Box>
        </Box>

        <CountDownBannerModal
          isVisible={showModal}
          setIsVisible={() => setShowModal(false)}
          data={data}
          goToPromotion={() => {
            setShowModal(false);
            onPress();
          }}
        />
      </Box>
    </Box>
  );
}

export default CountDownBanner;
