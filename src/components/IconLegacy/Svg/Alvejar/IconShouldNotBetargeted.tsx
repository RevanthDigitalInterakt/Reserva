import React from 'react';
import {
  G, Path,
} from 'react-native-svg';
import { SvgIcon } from '../../SvgIcon';
import type { IconProps } from '../IIconProps';

function IconShouldNotBetargeted({ color }: IconProps) {
  return (
    <SvgIcon
      viewBox="0 0 71.39 75.53"
    >
      <G>
        <G>
          <Path strokeWidth="2.58px" fill="none" stroke={color} strokeMiterlimit={10} d="M1.26 5.72L70.13 74.59" />
          <Path strokeWidth="2.58px" fill="none" stroke={color} strokeMiterlimit={10} d="M70.13 5.72L1.26 74.59" />
          <Path
            d="M35.7 2.89L68.95 61.5 2.44 61.5 35.7 2.89z"
            strokeWidth="2.58px"
            fill="none"
            stroke="#000"
            strokeMiterlimit={10}
          />
        </G>
      </G>
    </SvgIcon>
  );
}

export default IconShouldNotBetargeted;
