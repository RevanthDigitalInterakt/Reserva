import * as React from 'react';
import {
  Circle,
} from 'react-native-svg';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconCircle({ color }: IconProps) {
  return (
    <SvgIcon width="100%" height="100%" viewBox="0 0 6 6">
      <Circle data-name="Elipse 56" cx={3} cy={3} r={3} fill={color} />
    </SvgIcon>
  );
}

export default IconCircle;
