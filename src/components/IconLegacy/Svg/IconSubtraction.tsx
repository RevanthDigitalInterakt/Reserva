import { Rect } from 'react-native-svg';
import React from 'react';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconSubtraction({ color }: IconProps) {
  return (
    <SvgIcon width="100%" height="100%" viewBox="0 0 13.6 1">
      <Rect
        width="8"
        height="1.7"
        rx="0.85"
        fill={color}
      />
    </SvgIcon>
  );
}

export default IconSubtraction;
