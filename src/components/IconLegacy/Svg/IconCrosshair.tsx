import * as React from 'react';
import {
  G, Circle, Line,
} from 'react-native-svg';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconCrosshair({ color }: IconProps) {
  return (
    <SvgIcon width="100%" height="100%" viewBox="0 0 27.385 27.385">
      <G transform="translate(-576.815 -589.333)">
        <Circle
          cx="8.805"
          cy="8.805"
          r="8.805"
          transform="translate(581.702 593.989)"
          fill="none"
          stroke={color}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
        <Circle
          cx="4.634"
          cy="4.634"
          r="4.634"
          transform="translate(585.873 598.16)"
          fill={color}
        />
        <G transform="translate(590.507 590.333)">
          <Line
            y2="3.656"
            fill="none"
            stroke={color}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
          <Line
            y2="3.656"
            transform="translate(0 21.729)"
            fill="none"
            stroke={color}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </G>
        <G transform="translate(577.815 603.026)">
          <Line
            x1="3.656"
            transform="translate(21.729)"
            fill="none"
            stroke={color}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
          <Line
            x1="3.656"
            fill="none"
            stroke={color}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </G>
      </G>
    </SvgIcon>
  );
}

export default IconCrosshair;
