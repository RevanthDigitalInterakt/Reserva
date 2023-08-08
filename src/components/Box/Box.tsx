import styled from 'styled-components/native';
import { View } from 'react-native';
import {
  border,
  borderColor,
  minHeight,
  minWidth,
  margin,
  padding,
  position,
  borderRadius,
  height,
  borderWidth,
  flexbox,
  color,
  shadow,
  space,
  variant,
  width,
  type BorderProps,
  type BorderColorProps,
  type BorderRadiusProps,
  type BorderWidthProps,
  type ColorProps,
  type DisplayProps,
  type FlexboxProps,
  type HeightProps,
  type MinHeightProps,
  type MinWidthProps,
  type PositionProps,
  type ShadowProps,
  type SizeProps,
  type SpaceProps,
  type WidthProps,
} from 'styled-system';
import type { theme } from '../../base/usereservappLegacy/theme';

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

export interface BoxProps
  extends FlexboxProps<typeof theme>,
  SpaceProps<typeof theme>,
  PositionProps<typeof theme>,
  ColorProps<typeof theme>,
  BorderProps<typeof theme>,
  BorderColorProps<typeof theme>,
  BorderWidthProps<typeof theme>,
  SizeProps<typeof theme>,
  WidthProps<typeof theme>,
  HeightProps<typeof theme>,
  MinHeightProps<typeof theme>,
  MinWidthProps<typeof theme>,
  ShadowProps<typeof theme>,
  BorderRadiusProps<typeof theme>,
  DisplayProps<typeof theme> {
  variant?: BoxVariantsType
  boxShadow?: keyof typeof theme.shadows | null
}

export const Box = styled(View) <BoxProps>`
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
  ${borderColor}
  ${borderRadius}
  ${borderWidth}
  ${border}
  ${boxVariant}
  ${shadow}
`;
