import React from 'react';
import { Switch, TouchableWithoutFeedback } from 'react-native';

import { theme } from '../../base/usereservappLegacy/theme';
import { Box } from '../Box/Box';
import { Typography } from '../Typography/Typography';

type Colors = keyof typeof theme.colors;
export interface ToggleProps {
  label?: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
  disabled?: boolean;
  color?: Colors;
  thumbColor: Colors;
  testID?: string;
}

export function Toggle({
  label,
  color = 'vermelhoAlerta',
  thumbColor = 'vermelhoAlerta',
  value = true,
  onValueChange,
  testID,
  ...props
}: ToggleProps) {
  const trackColorAttr = theme.colors[color];
  const thumbColorAttr = theme.colors[thumbColor];

  return (
    <Box flexDirection="row" alignItems="center">
      <Switch
        trackColor={{ true: trackColorAttr, false: '#ccc' }}
        thumbColor={value ? thumbColorAttr : '#eee'}
        onValueChange={onValueChange}
        value={value}
        {...props}
      />

      <TouchableWithoutFeedback onPress={() => onValueChange(!value)} testID={testID}>
        <Box ml={5} mt={2}>
          <Typography>{label}</Typography>
        </Box>
      </TouchableWithoutFeedback>
    </Box>
  );
}
