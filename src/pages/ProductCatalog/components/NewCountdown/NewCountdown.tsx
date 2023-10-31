import React, {
  Dispatch, SetStateAction, useCallback, useEffect, useState,
} from 'react';
import {
  Box, Button, Icon, Typography,
} from '@usereservaapp/reserva-ui';
import {
  PixelRatio, Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useApolloFetchPolicyStore } from '../../../../zustand/useApolloFetchPolicyStore';
import configDeviceSizes from '../../../../utils/configDeviceSizes';
import { platformType } from '../../../../utils/platformType';
import type { ICountDownClock } from '../../../../graphql/homePage/HomeQuery';
import { useNewChronometer } from '../../../../hooks/useNewChronometer';
import FlipNumber from '../../../../modules/Home/component/flipcountdoun/FlipNumber';
import testProps from '../../../../utils/testProps';
import { ClockScreenEnum, CountdownClockCategoryOutput, useCountdownLazyQuery } from '../../../../base/graphql/generated';

const SCALE = configDeviceSizes.DEVICE_WIDTH / 320;

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
    <Box
      bg="white"
      minHeight={184}
      alignItems="center"
      justifyContent="center"
      px={34}
      py={45}
      {...testProps('com.usereserva:id/check_The_rules_container')}
    >
      <Box position="absolute" top={16} right={20} zIndex={4}>
        <Button
          {...testProps('com.usereserva:id/count_down_local_button_close')}
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
          {...testProps('com.usereserva:id/check_The_rules_titleModal')}
        >
          {rulesData?.titleModal}
        </Typography>
      </Box>
      <Box mt={8}>
        <Typography
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
          {...testProps('com.usereserva:id/check_the_rules_button')}
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

interface NewCountdownProps {
  reference: string;
  selectClockScreen: ClockScreenEnum;
}

function NewCountdown(props: NewCountdownProps) {
  const { reference, selectClockScreen } = props;
  const [countDownLocal, setCountDownLocal] = useState<CountdownClockCategoryOutput>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [countDownClockGlobal, setCountDownClockGlobal] = useState<CountdownClockCategoryOutput>();

  const { getFetchPolicyPerKey } = useApolloFetchPolicyStore(['getFetchPolicyPerKey']);

  const [getCountDown] = useCountdownLazyQuery();

  const navigation = useNavigation();

  const normalize = useCallback((size) => {
    const newSize = size * SCALE;
    if (Platform.OS === platformType.IOS) {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 3;
    }
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 4;
  }, []);

  const goToPromotion = () => {
    const facetInput = [];
    const [categoryType, categoryData] = reference?.split(':');
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
      navigation.navigate('ProductCatalog', {
        facetInput,
        referenceId: countDownLocal?.reference,
      });
    }
  };

  useEffect(() => {
    getCountDown({
      context: { clientName: 'gateway' },
      fetchPolicy: getFetchPolicyPerKey('countdownClock'),
      variables: {
        input: {
          selectClockScreen,
          categoryReference: reference,
        },
      },
    }).then(({ data }) => {
      if (data?.countdown) {
        setCountDownLocal(data.countdown);
      } else {
        getCountDown({
          context: { clientName: 'gateway' },
          fetchPolicy: getFetchPolicyPerKey('countdownClock'),
          variables: {
            input: {
              selectClockScreen: ClockScreenEnum.All,
            },
          },
        }).then(({ data: data2 }) => {
          if (data2?.countdown) {
            setCountDownLocal(data2.countdown);
          }
        });
      }
    });
  }, [getCountDown, getFetchPolicyPerKey, reference, selectClockScreen]);

  const { time, setTime } = useNewChronometer();

  useEffect(() => {
    if (countDownLocal?.remainingTime) {
      setTime(countDownLocal?.remainingTime);
    }
  }, [countDownLocal?.remainingTime, setTime]);

  return countDownLocal
    ? (
      <Box
        mb={5}
        minHeight={90}
        paddingX={22}
        alignItems="center"
        alignSelf="center"
        backgroundColor={countDownLocal.buttonColor}
        {...testProps('com.usereserva:id/count_down_local_container')}

      >
        <Box width={configDeviceSizes.DEVICE_WIDTH} paddingX={22}>
          <Box alignItems="center" mb={8} mt={12}>
            <Typography
              lineHeight={normalize(28)}
              color={countDownLocal.textColor}
              fontFamily="reservaSerifMedium"
              fontSize={normalize(26)}
              {...testProps('com.usereserva:id/count_down_local_title')}
            >
              {countDownLocal.title}
              {' '}
              {countDownLocal.subtitle && (
              <Typography
                lineHeight={normalize(28)}
                color={countDownLocal.textColor}
                fontFamily="reservaSerifLight"
                fontSize={normalize(26)}
                {...testProps('com.usereserva:id/count_down_local_subtitle')}
              >
                {countDownLocal.subtitle}
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
                  color={countDownLocal.textColor}
                  fontFamily="reservaSansRegular"
                  fontSize={14}
                >
                  Acaba em:
                </Typography>
              </Box>
              <Box flexDirection="row" alignItems="center" mt={5}>
                <FlipNumber
                  clockBackgroundColor={
                  countDownLocal.backgroundColor
                  }
                  colorDivider={countDownLocal.bannerColor}
                  number={time?.split(':')[0]}
                  unit="hours"
                  {...testProps('com.usereserva:id/flip_number_hours')}
                />

                <Box height={14} justifyContent="space-between" marginX={6}>
                  <Box height={3} width={3} borderRadius={3} bg="#FFF" />
                  <Box height={3} width={3} borderRadius={3} bg="#FFF" />
                </Box>

                <FlipNumber
                  clockBackgroundColor={
                  countDownLocal.backgroundColor
                  }
                  colorDivider={countDownLocal.bannerColor}
                  number={time?.split(':')[1]}
                  {...testProps('com.usereserva:id/flip_number_minutes')}
                />

                <Box height={14} justifyContent="space-between" marginX={6}>
                  <Box height={3} width={3} borderRadius={3} bg="#FFF" />
                  <Box height={3} width={3} borderRadius={3} bg="#FFF" />
                </Box>

                <FlipNumber
                  clockBackgroundColor={
                  countDownLocal.backgroundColor
                }
                  colorDivider={countDownLocal.bannerColor}
                  number={time?.split(':')[2]}
                  {...testProps('com.usereserva:id/flip_number_seconds')}
                />
              </Box>
            </Box>
            <Box alignItems="center" flex={1}>
              <TouchableOpacity style={{ width: '100%' }} onPress={goToPromotion} {...testProps('com.usereserva:id/count_down_local_button')}>
                <Box
                  bg={countDownLocal.buttonColor}
                  paddingY={12}
                  mb={4}
                >
                  <Typography textAlign="center" color={countDownLocal.textColor}>
                    {countDownLocal.titleButton}
                  </Typography>
                </Box>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowModal(true)}>
                <Typography
                  color={countDownLocal.textColor}
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
            isVisible={showModal}
            setIsVisible={() => setShowModal(false)}
            rulesData={countDownLocal}
            goToPromotion={() => {
              goToPromotion();
            }}
          />
        </Box>
      </Box>
    )
    : null;
}
export default NewCountdown;
