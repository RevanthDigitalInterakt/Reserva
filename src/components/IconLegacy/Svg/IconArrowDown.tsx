import {
  G, Path,
} from 'react-native-svg';
import React from 'react';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconArrowDown({ color = '#333' }: IconProps) {
  return (
    <SvgIcon width="100%" height="100%" viewBox="0 0 16.569 19.477">
      <G
        id="Arrow_-_icon"
        data-name="Arrow - icon"
        transform="translate(0.5 0.5)"
      >
        <Path
          id="right001_-_E012"
          data-name="right001 - E012"
          d="M.873,13.174,0,12.3,5.719,6.593,0,.873.873,0l6.58,6.593L4.99,9.057Z"
          transform="translate(13.174 0) rotate(90)"
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

export default IconArrowDown;
