import React from 'react';
import {
  G, Path,
} from 'react-native-svg';
import { SvgIcon } from '../../SvgIcon';
import type { IconProps } from '../IIconProps';

function IconDoNotIron({ color }: IconProps) {
  return (
    <SvgIcon
      viewBox="0 0 69.19 65.82"
    >
      <G>
        <G>
          <Path
            fill="none"
            stroke={color}
            strokeMiterlimit={10}
            strokeWidth="2.58px"
            d="M14.29 11.07h42.12L67.47 54H1.56s2.27-14 13.22-18.25 47.81-2 47.81-2"
          />
          <Path
            fill="none"
            stroke={color}
            strokeMiterlimit={10}
            strokeWidth="2.58px"
            d="M3.68 0.94L67.62 64.88"
          />
          <Path
            fill="none"
            stroke={color}
            strokeMiterlimit={10}
            strokeWidth="2.58px"
            d="M67.62 0.94L3.68 64.88"
          />
        </G>
      </G>
    </SvgIcon>
  );
}

export default IconDoNotIron;
