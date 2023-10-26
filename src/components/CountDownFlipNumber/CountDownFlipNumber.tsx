import React from 'react';

import type { HomeCountdownThemeOutput } from '../../base/graphql/generated';
import { useCountDown } from '../../context/ChronometerContext';
import FlipNumber from '../../modules/Home/component/flipcountdoun/FlipNumber';
import testProps from '../../utils/testProps';
import { Box } from '../Box/Box';

interface ICountDownFlipNumber {
  theme: HomeCountdownThemeOutput;
}

function CountDownFlipNumber({ theme }: ICountDownFlipNumber) {
  const { time = '00:00:01' } = useCountDown();

  return (
    <Box flexDirection="row" alignItems="center" mt={5}>
      <FlipNumber
        {...testProps('flip_number_hours')}
        clockBackgroundColor={theme.clockBackgroundColor}
        colorDivider={theme.colorBanner}
        number={time.split(':')[0] || ''}
      />

      <Box height={14} justifyContent="space-between" marginX="nano">
        <Box height={3} width={3} borderRadius="nano" bg="white" />
        <Box height={3} width={3} borderRadius="nano" bg="white" />
      </Box>

      <FlipNumber
        {...testProps('flip_number_minutes')}
        clockBackgroundColor={theme.clockBackgroundColor}
        colorDivider={theme.colorBanner}
        number={time?.split(':')[1] || ''}
      />

      <Box height={14} justifyContent="space-between" marginX="nano">
        <Box height={3} width={3} borderRadius="nano" bg="white" />
        <Box height={3} width={3} borderRadius="nano" bg="white" />
      </Box>

      <FlipNumber
        {...testProps('flip_number_seconds')}
        clockBackgroundColor={theme.clockBackgroundColor}
        colorDivider={theme.colorBanner}
        number={time?.split(':')[2] || ''}
      />
    </Box>
  );
}

export default CountDownFlipNumber;
