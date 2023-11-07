import {
  Path, G,
} from 'react-native-svg';
import React from 'react';
import { SvgIcon } from '../../SvgIcon';
import type { IconProps } from '../IIconProps';

function IconDryHorizontallyToTheShadow({ color }: IconProps) {
  return (
    <SvgIcon viewBox="0 0 63.7 63.7">
      <G>
        <G>
          <Path
            strokeWidth="2.58px"
            fill="none"
            stroke={color}
            strokeMiterlimit={10}
            d="M1.33 1.33H62.379999999999995V62.379999999999995H1.33z"
          />
          <Path
            strokeWidth="2.58px"
            fill="none"
            stroke={color}
            strokeMiterlimit={10}
            d="M30.65 1.75L1.09 31.31"
          />
          <Path
            strokeWidth="2.58px"
            fill="none"
            stroke={color}
            strokeMiterlimit={10}
            d="M52.64 31.85L10.83 31.85"
          />
        </G>
      </G>
    </SvgIcon>
  );
}

export default IconDryHorizontallyToTheShadow;
