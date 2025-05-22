import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import {
  type BackgroundColorProps,
  variant,
  color,
  height,
  width,
  type HeightProps,
  type WidthProps,
  space,
  type SpaceProps,
} from 'styled-system';
import type { theme } from '../../base/usereservappLegacy/theme';

type VariantDivider = 'fullWidth' | 'inset' | 'middle';

export interface DividerProps
  extends
  BackgroundColorProps<typeof theme>,
  HeightProps<typeof theme>,
  WidthProps<typeof theme>,
  SpaceProps<typeof theme> {
  variant: VariantDivider;
}

export const dividerVariants = {
  prop: 'variant',
  variants: {
    fullWidth: {},
    inset: {
      marginLeft: 'xl',
    },
    middle: {
      marginLeft: 'md',
      marginRight: 'md',
    },
  },
};

export const DividerVariantsOptions = Object.keys(
  dividerVariants.variants as Object,
);

const DividerStyle = styled(View)<DividerProps>`
  ${color};
  ${height};
  ${width};
  ${space};
  ${variant(dividerVariants)};
`;

DividerStyle.defaultProps = {
  height: 1,
  backgroundColor: 'divider',
  variant: 'fullWidth',
};

export function Divider({ ...props }: DividerProps) {
  const styleProps: DividerProps = props;
  return <DividerStyle {...styleProps} />;
}
