import * as React from 'react';
import {
  Circle, Path,
} from 'react-native-svg';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconTag({ color }: IconProps) {
  return (
    <SvgIcon
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <Path
        d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
        fill="none"
      />
      <Circle cx={7} cy={7} r={0.5} />
    </SvgIcon>
  );
}

export default IconTag;
