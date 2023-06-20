import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import {
  color,
  space,
  width,
  height,
  margin,
  shadow,
  padding,
  flexbox,
  variant,
  borderColor,
  borderWidth,
  borderRadius,
} from 'styled-system';

import { buttonVariants } from './constants';
import type { ButtonStyleProps } from './types';

export const ButtonStyle = styled(TouchableOpacity) <ButtonStyleProps>`
  ${color}
  ${padding} 
  ${margin} 
  ${width}
  ${height}
  ${borderRadius}
  ${borderWidth}
  ${borderColor}
  ${space}
  ${flexbox}
  ${shadow}
  ${variant(buttonVariants)}
  justify-content: center;
  align-items: center;
`;
