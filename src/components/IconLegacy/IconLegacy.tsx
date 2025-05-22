import React from 'react';
import Svg from 'react-native-svg';
import styled from 'styled-components/native';
import {
  type ColorProps,
  type LayoutProps,
  type SpaceProps,
  border,
  color,
  layout,
  space,
} from 'styled-system';
import type { StyleProp, ViewStyle } from 'react-native';
import * as SvgIconList from './Svg';
import { theme } from '../../base/usereservappLegacy/theme';

interface DefaultIconProps {
  name: string
  style?: StyleProp<ViewStyle>
}

interface SvgIconProps
  extends
  DefaultIconProps,
  ColorProps<typeof theme>,
  SpaceProps<typeof theme>,
  LayoutProps<typeof theme> {
}

const SvgIcon = styled(Svg)<SvgIconProps>`
  ${color}
  ${layout}
  ${space}
  ${border}
`;

export function IconLegacy({ name, ...props }: SvgIconProps) {
  const colorSelected = props.color ? theme.colors[props.color] : theme.colors.preto;
  return (
    <SvgIcon
      color="preto"
      {...props}
    >
      {Object.entries(SvgIconList).map(
        ([key, Component]) => (`Icon${name}` == key && (
          <Component color={colorSelected} key={`icon-${name}`} />
        )),
      )}
    </SvgIcon>
  );
}
