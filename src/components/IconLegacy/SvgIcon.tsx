import styled from 'styled-components/native';
import {
  color,
  layout,
  space,
  border,
  type ColorProps,
  type SpaceProps,
  type LayoutProps,
} from 'styled-system';
import Svg from 'react-native-svg';
import type { theme } from '../../base/usereservappLegacy/theme';

export interface DefaultIconProps {
  name: string
}

export interface SvgIconProps
  extends
  DefaultIconProps,
  ColorProps<typeof theme>,
  SpaceProps<typeof theme>,
  LayoutProps<typeof theme> {
}

export const SvgIcon = styled(Svg)<SvgIconProps>`
  ${color}
  ${layout}
  ${space}
  ${border}
`;
