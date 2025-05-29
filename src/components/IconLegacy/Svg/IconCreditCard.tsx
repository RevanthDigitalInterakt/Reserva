import {
  G, Path, Rect, Line,
} from 'react-native-svg';
import React from 'react';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconCreditCard({ color }: IconProps) {
  return (
    <SvgIcon width="100%" height="100%" viewBox="0 0 21.109 15.625">
      <G transform="translate(0.5 0.5)">
        <G>
          <Path
            d="M3.328,6H19.781a1.828,1.828,0,0,1,1.828,1.828V18.8a1.828,1.828,0,0,1-1.828,1.828H3.328A1.828,1.828,0,0,1,1.5,18.8V7.828A1.828,1.828,0,0,1,3.328,6Z"
            transform="translate(-1.5 -6)"
            fill="none"
            stroke={color}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
          />
          <Path
            d="M1.5,15H21.609"
            transform="translate(-1.5 -9.516)"
            fill="none"
            stroke={color}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
          />
        </G>
        <Line
          x2="4.415"
          transform="translate(12.935 9.934)"
          fill="none"
          stroke={color}
          stroke-width="1"
        />
        <G
          transform="translate(10.175 7.174)"
          fill="none"
          stroke="#db0029"
          stroke-width="1"
        >
          <Rect width="9.934" height="5.519" rx="2" stroke="none" />
          <Rect x="0.5" y="0.5" width="8.934" height="4.519" rx="1.5" fill="none" />
        </G>
      </G>
    </SvgIcon>
  );
}

export default IconCreditCard;
