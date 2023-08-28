import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import {
  borderColor,
  minHeight,
  minWidth,
  margin,
  padding,
  position,
  height,
  flexbox,
  color,
  shadow,
  space,
  variant,
  width,
  border,
} from 'styled-system';

import type { BoxProps } from './types';
import { theme } from '../../base/usereservappLegacy/theme';

type BoxVariantsType = 'container';

const boxVariant = variant<BoxProps, BoxVariantsType, 'variant'>({
  prop: 'variant',
  key: 'box',
  variants: {
    container: {
      flex: 1,
      alignItems: 'center',
    },
  },
});

export const BoxStyle = styled(View) <BoxProps>`
  ${borderColor}
  ${border}
  ${color}
  ${space}
  ${margin}
  ${padding}
  ${width}
  ${height}
  ${minHeight}
  ${minWidth}
  ${flexbox}
  ${position}
  ${shadow}
  ${boxVariant}
`;

export function Box({ children, ...props }: BoxProps) {
  return (
    <BoxStyle
      {...props}
      borderRadius={theme.radii[props.borderRadius as keyof typeof theme.radii]}
      borderWidth={theme.borderWidths[props.borderWidth as keyof typeof theme.borderWidths]}
    >
      {children}
    </BoxStyle>
  );
}
