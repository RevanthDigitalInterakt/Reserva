import React, { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import type { theme } from '../../base/usereservappLegacy/theme';
import { Box, type BoxProps } from '../Box/Box';
import { Typography } from '../Typography/Typography';

interface RangeProps extends BoxProps {
  value: number;
  max: number;
  barHeight: number;
  label?: string;
  colorBar: keyof typeof theme.colors;
  colorProgress: keyof typeof theme.colors;
  colorLabel: keyof typeof theme.colors;
  showPercent: boolean;
}

export const ProgressBar = ({
  label,
  value,
  max,
  barHeight = 3,
  colorBar = 'neutroFrio1',
  colorProgress = 'neutroFrio2',
  colorLabel = 'progressTextColor',
  showPercent = false,
  ...props
}: RangeProps) => {
  const nextPercent = (value * 100) / max;
  const [percent, setPercent] = useState(0);

  const fadeAnim = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    fadeAnim.addListener((value) => {
      setPercent(value.value);
    });
  }, []);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: nextPercent,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (nextPercent) {
      fadeIn();
    }
  }, [nextPercent]);

  return (
    <Box {...props} flexDirection="column">
      <Box flexDirection="row" justifyContent="flex-end" mb={5}>
        {label !== undefined && (
          <Typography
            color={colorLabel}
            fontFamily="nunitoSemiBold"
            fontSize={13}
          >
            {label}
          </Typography>
        )}

        {showPercent === true && (
          <Typography
            color={colorLabel}
            fontFamily="nunitoSemiBold"
            fontSize={13}
          >
            {nextPercent.toFixed(0)}
            %
          </Typography>
        )}
      </Box>
      <Box height={barHeight} bg={colorBar} />
      <Box
        height={barHeight}
        width={`${percent}%`}
        mt={-barHeight}
        bg={colorProgress}
      />
    </Box>
  );
};
