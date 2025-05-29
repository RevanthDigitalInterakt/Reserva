import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React from 'react';

import { theme } from '../../base/usereservappLegacy/theme';
import { Box } from '../Box/Box';
import { Button } from '../Button';
import { Typography } from '../Typography/Typography';

interface RangeMarkerProps extends BoxProps {}

export function RangeMarker(props: RangeMarkerProps) {
  return (
    <Button hitSlop={{
      top: 30, left: 30, bottom: 30, right: 30,
    }}
    >
      <Box borderRadius="infinity" width={20} height={20} {...props} />
    </Button>
  );
}

interface RangeProps {
  width: number
  min: number
  max: number
  value: number[]
  prefix?: string,
  colorMarker: keyof typeof theme.colors,
  colorLine: keyof typeof theme.colors,
  colorText: keyof typeof theme.colors,
  onValuesChange?: Function,
}

export function Range({
  width = 150,
  min = 0,
  max = 0,
  prefix,
  value = [0, 0],
  colorMarker = 'preto',
  colorLine = 'preto',
  colorText = 'preto',
  onValuesChange,
}: RangeProps) {
  const [sliderValue, setSliderValue] = React.useState(value);

  return (
    <Box flexDirection="column">
      <MultiSlider
        selectedStyle={{
          backgroundColor: theme.colors[colorLine],
          height: 3,
          marginTop: -1.5,
        }}
        unselectedStyle={{
          backgroundColor: theme.colors[colorLine],
          height: 1,
        }}
        values={sliderValue}
        sliderLength={width}
        onValuesChange={(values) => {
          setSliderValue(values);
        }}
        onValuesChangeFinish={(values) => {
          if (typeof onValuesChange === 'function') {
            onValuesChange(values);
          }
        }}
        min={min}
        max={max}
        step={1}
        allowOverlap
        snapped
        isMarkersSeparated
        customMarkerLeft={() => <RangeMarker bg={colorMarker} />}
        customMarkerRight={() => <RangeMarker bg={colorMarker} />}
      />
      <Box width={width} mt={-12} flexDirection="row" justifyContent="space-between">
        <Box alignSelf="flex-start">
          <Typography fontFamily="nunitoSemiBold" fontSize={14} color={colorText}>
            {prefix}
            {sliderValue[0]}
          </Typography>
        </Box>

        {sliderValue[1] !== undefined && (
          <Box alignSelf="flex-end">
            <Typography fontFamily="nunitoSemiBold" fontSize={14} color={colorText}>
              {prefix}
              {sliderValue[1]}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
