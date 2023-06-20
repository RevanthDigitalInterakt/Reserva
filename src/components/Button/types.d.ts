import { ReactElement } from 'react';
import { theme } from '@usereservaapp/reserva-ui';
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
import type { SvgIconProps } from '@usereservaapp/reserva-ui/src/components/Icon/SvgIcon';

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
  BorderWidthProps {
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
