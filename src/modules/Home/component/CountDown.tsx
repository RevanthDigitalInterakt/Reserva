import { useSubscription } from "@apollo/client";
import moment from "moment";
import React, { useEffect, useState, Dispatch, SetStateAction, useRef } from "react";
import { TouchableOpacity, StyleSheet, Text, View, Animated } from "react-native"
import CountDown from "react-native-countdown-component";
import { Box, theme, Typography, Button, Icon } from "reserva-ui";
import { bottom, marginBottom, size } from "styled-system";
import { number } from "yup";
import { intervalToDuration } from 'date-fns';
import Modal from "react-native-modal";
import {
  ICountDownClock
} from '../../../graphql/homePage/HomeQuery';
import { useChronometer } from '../../CorreReserva/hooks/useChronometer';
import TransformUtils from '../../../shared/utils/tranformUtils';
export interface CountDownProps {
  countDown: ICountDownClock
}

export const CountDownBanner: React.FC<CountDownProps> = ({ countDown }: CountDownProps) => {
  const [countDownData, setCountDownData] = useState<ICountDownClock>();
  const [ShowModal, setShowModal] = useState<boolean>(false);
  const [showClock, setShowClock] = useState<boolean>(false);
  const limitDate = intervalToDuration({ start: Date.now(), end: new Date(countDown?.countdown) });

  const { currentValue, start, stop, } = useChronometer({
    countDown: true,
    initial: `${limitDate?.days * 24 + limitDate.hours}:${limitDate.minutes}:${limitDate.seconds}`
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

  const bgColor = '#000'
  const textColor = '#FFF'

  return (
    !showClock && currentValue !== '00:00:00' ?

      <Box minHeight={149} alignItems='center' backgroundColor={countDownData?.colorBanner}>

        <Box>
          <Box alignItems='center' mb={8} mt={7}>
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

              {/* <CountDown
              size={30}
              digitTxtStyle={{
                color: textColor,
                fontFamily: theme.fonts.reservaDisplayRegular,
              }}
              digitStyle={{
                backgroundColor: 'rgba(0,0,0,0)',
                justifyContent: 'flex-start',
                height: 60
              }}
              separatorStyle={{
                color: textColor,
                position: 'absolute',
                top: 0,
                fontFamily: theme.fonts.nunitoBold,
                justifyContent: 'flex-start',
                fontSize: 25,

              }}
              timeLabelStyle={{
                color: textColor,
                justifyContent: 'center',
                fontFamily: theme.fonts.nunitoBold,
                fontSize: 12,
                position: 'absolute',
                bottom: 3
              }}
              showSeparator
              until={(limitDate - Date.now()) / 1000}
              onFinish={() => console.log('finished')}
              onPress={() => console.log('hello')}
              timeToShow={['H', 'M', 'S']}
              timeLabels={{
                d: 'dias', h: 'Horas',
                m: 'Munutos',
                s: 'Segundos',
              }}
            /> */}
              <Box
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
              </Box>

            </Box>
            <Box alignItems="center">
              <TouchableOpacity>
                <Box bg={countDownData?.colorButton}
                  paddingLeft={41}
                  paddingRight={41}
                  paddingY={12}
                  mb={4}
                >
                  <Typography
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