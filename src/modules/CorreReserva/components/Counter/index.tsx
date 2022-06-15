import React from 'react';

import { Box, Icon, Image, Typography } from '@danilomsou/reserva-ui';

export interface CounterProps {
  distance?: string;
  rhythm?: string;
  plates?: string;
  isPlate?: boolean;
  timer?: string;
}

export const Counter: React.FC<CounterProps> = ({
  timer,
  distance,
  rhythm,
  plates,
  isPlate,
}) => (
  <Box width="100%">
    <Box marginTop={34}>
      <Typography
        fontFamily="reservaSerifRegular"
        fontSize={48}
        color="white"
        textAlign="center"
      >
        <Typography fontFamily="reservaSerifBold" color="white">
          {timer?.split(':')[0]}
        </Typography>
        <Typography fontFamily="reservaSerifLight" color="#808080">
          h{' '}
        </Typography>
        <Typography fontFamily="reservaSerifBold" color="white">
          {timer?.split(':')[1]}
        </Typography>
        <Typography fontFamily="reservaSerifLight" color="#808080">
          m{' '}
        </Typography>
        <Typography fontFamily="reservaSerifBold" color="white">
          {timer?.split(':')[2]}
        </Typography>
        <Typography fontFamily="reservaSerifLight" color="#808080">
          s
        </Typography>
      </Typography>
    </Box>
    <Box px="micro" width="100%" alignItems="center">
      <Box flexDirection="row">
        <Box flexDirection="row" mr="xxxs">
          <Box mt="quarck">
            <Icon name="Distance" size={23} color="neutroFrio2" />
          </Box>
          <Box marginLeft="quarck">
            <Typography
              fontFamily="reservaSerifBold"
              fontSize={27}
              color="white"
            >
              {distance}
            </Typography>
            <Typography
              fontFamily="reservaSerifLight"
              fontSize={11}
              color="white"
            >
              Distância
            </Typography>
          </Box>
        </Box>
        <Box flexDirection="row">
          <Box mt="quarck">
            <Icon name="Pace" size={20} color="neutroFrio2" />
          </Box>
          <Box marginLeft="quarck">
            <Typography
              fontFamily="reservaSerifBold"
              fontSize={27}
              color="white"
            >
              {rhythm}
            </Typography>
            <Typography
              fontFamily="reservaSerifLight"
              fontSize={11}
              color="white"
            >
              Ritmo
            </Typography>
          </Box>
        </Box>
        {isPlate && (
          <Box flexDirection="row" ml="xxxs">
            <Box mt="quarck">
              <Icon name="Dish" size={20} color="neutroFrio2" />
            </Box>
            <Box marginLeft="quarck">
              <Typography
                fontFamily="reservaSerifBold"
                fontSize={27}
                color="white"
              >
                +{distance?.split('.')[0]}
              </Typography>
              <Typography
                fontFamily="reservaSerifLight"
                fontSize={11}
                color="white"
              >
                Pratos
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  </Box>
);
