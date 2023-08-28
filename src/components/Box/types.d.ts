import {
  WidthProps,
  HeightProps,
  ShadowProps,
  FlexboxProps,
  BorderColorProps,
  ColorProps,
  SpaceProps,
  SizeProps,
  PositionProps,
  BorderWidthProps,
  BorderRadiusProps,
  MinHeightProps,
  MinWidthProps,
  DisplayProps,
  MarginProps,
  type BorderProps,
} from 'styled-system';

import type { ViewProps } from 'react-native';
import type { theme } from '../../base/usereservappLegacy/theme';

type BoxVariantsType = 'container';

export interface BoxProps
  extends ViewProps,
  FlexboxProps<typeof theme>,
  SpaceProps<typeof theme>,
  MarginProps<typeof theme>,
  PositionProps<typeof theme>,
  ColorProps<typeof theme>,
  BorderRadiusProps<typeof theme>,
  BorderWidthProps<typeof theme>,
  BorderColorProps<typeof theme>,
  SizeProps<typeof theme>,
  WidthProps<typeof theme>,
  BorderProps<typeof theme>,
  HeightProps<typeof theme>,
  MinHeightProps<typeof theme>,
  MinWidthProps<typeof theme>,
  ShadowProps<typeof theme>,
  DisplayProps<typeof theme> {
  variant?: BoxVariantsType;
  boxShadow?: keyof typeof theme.shadows | null;
  children?: ReactElement;
  borderBottomWidth?: keyof typeof theme.borderWidths | null;
}
