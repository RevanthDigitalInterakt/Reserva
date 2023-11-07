import { G, Line } from 'react-native-svg';
import React from 'react';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconMenuArrowBack({ color }: IconProps) {
  return (
    <SvgIcon width="100%" height="100%" viewBox="0 0 19.204 9.98">
      <G transform="translate(18.704 9.276) rotate(180)">
        <Line
          x1="18"
          transform="translate(0 4.286)"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="1"
        />
        <Line
          x1="5.088"
          y1="4.24"
          transform="translate(12.911)"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="1"
        />
        <Line
          x1="5.088"
          y2="4.24"
          transform="translate(12.911 4.331)"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="1"
        />
      </G>
    </SvgIcon>
  );
}

export default IconMenuArrowBack;
