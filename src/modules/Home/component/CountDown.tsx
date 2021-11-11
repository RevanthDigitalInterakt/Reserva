import { useSubscription } from "@apollo/client";
import moment from "moment";
import React, { useEffect, useState } from "react";
import CountDown from "react-native-countdown-component";
import { Box, theme, Typography } from "reserva-ui";
import { bottom, marginBottom } from "styled-system";
import { number } from "yup";

export interface CountDownProps {

}

export const CountDownBanner: React.FC<CountDownProps> = () => {

  const limitDate = moment('2021-11-30T00:00:00.000-03:00')

  console.log(limitDate.toString())

  const bgColor = '#5a694c'
  const textColor = '#171d13'
  const titleColor = '#fff'

  return (
    <Box height={100} flexDirection='row' alignItems='center' backgroundColor={bgColor}>

      <Box>
        <Box>
          <Typography
            fontFamily='nunitoBold'
            textAlign='center'
            color={titleColor}
            fontSize={14}
          >
            15% extra no app
          </Typography>
        </Box>
        <CountDown
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
            d: 'dias',
            h: 'Horas',
            m: 'Munutos',
            s: 'Segundos',
          }}
        />
      </Box>
      <Box width={'1.5'} height="60%" backgroundColor='neutroFrio1' />
      <Box alignItems='center' flexGrow={1} justifyContent='space-evenly' height='100%'>
        <Typography
          fontSize={14}
          fontFamily='nunitoBold'
          color={titleColor}
        >
          E por tempo limitado
        </Typography>
        <Typography
          fontFamily='nunitoRegular'
          fontSize={14}
          color={textColor}
        >
          Das 21h as 08h. Voa!
        </Typography>
      </Box>
    </Box>
  )
}