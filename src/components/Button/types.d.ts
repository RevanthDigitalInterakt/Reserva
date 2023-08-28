import { ReactElement } from 'react';
import type { TouchableOpacityProps } from 'react-native';
import {
  WidthProps,
  HeightProps,
  MarginProps,
  ShadowProps,
  FlexboxProps,
  PaddingProps,
  TextColorProps,
  BorderColorProps,
  BorderWidthProps,
  BorderRadiusProps,
  BackgroundColorProps,
} from 'styled-system';

import type { theme } from '../../base/usereservappLegacy/theme';
import type { SvgIconProps } from '../IconLegacy/SvgIcon';

export type VariantStyles =
| 'none'
| 'modal'
| 'icone'
| 'semBorda'
| 'primarioMaior'
| 'primarioEstreito'
| 'primarioEstreitoSmall'
| 'primarioEstreitoOutline'
| 'primarioMaiorConfirmacao';

export interface ButtonStyleProps
  extends TouchableOpacityProps,
  WidthProps<typeof theme>,
  HeightProps<typeof theme>,
  ShadowProps<typeof theme>,
  MarginProps<typeof theme>,
  PaddingProps<typeof theme>,
  FlexboxProps<typeof theme>,
  TextColorProps<typeof theme>,
  BorderColorProps<typeof theme>,
  BorderRadiusProps<typeof theme>,
  BackgroundColorProps<typeof theme>,
  BorderWidthProps<typeof theme> {
  fontSize?: number;
  variant?: VariantStyles;
  fontFamily?: keyof typeof theme.fonts;
  boxShadow?: keyof typeof theme.shadows | null
}

export interface ButtonProps extends ButtonStyleProps {
  title?: string;
  testID?: string;
  inline?: boolean;
  loading?: boolean;
  badgeCount?: number;
  children?: ReactElement;
  buttonBackgroundColor?: string;
  icon?: ReactElement<SvgIconProps>;
  leftIcon?: ReactElement<SvgIconProps>;
  rightIcon?: ReactElement<SvgIconProps>;
}
