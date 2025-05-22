import {
  G, Path,
} from 'react-native-svg';
import React from 'react';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconArrowUp({ color }: IconProps) {
  return (
    <SvgIcon xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 13.373 8">
      <G id="Arrow_-_icon" data-name="Arrow - icon" transform="translate(12.873 7.5) rotate(-180)">
        <Path
          id="right001_-_E012"
          data-name="right001 - E012"
          d="M.82,12.373,0,11.553l5.371-5.36L0,.82.82,0,7,6.192,4.686,8.506Z"
          transform="translate(12.373) rotate(90)"
          fill={color}
          stroke={color}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
        />
      </G>
    </SvgIcon>
  );
}

export default IconArrowUp;
