import { useSubscription } from "@apollo/client";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native"
import CountDown from "react-native-countdown-component";
import { Box, theme, Typography } from "reserva-ui";
import { bottom, marginBottom, size } from "styled-system";
import { number } from "yup";


import { useChronometer } from '../../CorreReserva/hooks/useChronometer';
export interface CountDownProps {

}

export const CountDownBanner: React.FC<CountDownProps> = () => {

  const limitDate = moment('2021-11-30T00:00:00.000-03:00')
  const { currentValue, start, stop } = useChronometer({ initial: '00:00:00' });
  console.log(limitDate.toString())

  const bgColor = '#000'
  const textColor = '#FFF'
  const titleColor = '#fff'

  return (
    <Box height={149} alignItems='center' backgroundColor={bgColor}>

      <Box>
        <Box alignItems='center' mb={8} mt={7}>
          <Typography
            color={textColor}
            fontFamily="reservaSerifRegular"
            fontSize={28}
          >
            Ganhe duas camisetas em
            compras acima de R$399.
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
            <Box
              flexDirection="row"
              alignItems="center"
              mt={5}
            >
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
                  13
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
                  48
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
                  21
                </Typography>
              </Box>
            </Box>

          </Box>
          <Box alignItems="center">
            <TouchableOpacity>
              <Box bg="#E40E2B"
                paddingLeft={41}
                paddingRight={41}
                paddingY={12}
                mb={4}
              >
                <Typography
                  color={textColor}

                >
                  APROVEITE!
                </Typography>
              </Box>
            </TouchableOpacity>
            <TouchableOpacity>
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

      </Box >
    </Box >
  )
}