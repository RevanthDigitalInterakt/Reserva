import {
  Path, G, Circle,
} from 'react-native-svg';
import React from 'react';
import { SvgIcon } from '../../SvgIcon';
import type { IconProps } from '../IIconProps';

function IconNotMachineDry({ color }: IconProps) {
  return (
    <SvgIcon width="100%" height="100%" viewBox="0 0 70.75 70.75">
      <G>
        <G>
          <Path
            stroke={color}
            strokeWidth="2.58px"
            strokeMiterlimit={10}
            d="M0.94 0.94L69.81 69.81"
          />
          <Path
            stroke={color}
            strokeWidth="2.58px"
            strokeMiterlimit={10}
            d="M69.81 0.94L0.94 69.81"
          />
          <Path
            stroke={color}
            strokeWidth="2.58px"
            strokeMiterlimit={10}
            d="M4.85 4.85H65.89999999999999V65.89999999999999H4.85z"
          />
          <Circle
            cx={35.37}
            cy={35.37}
            r={29.86}
            transform="matrix(.16 -.99 .99 .16 -5.25 64.56)"
            strokeWidth="2.58px"
            fill="none"
            stroke={color}
            strokeMiterlimit={10}
          />
        </G>
      </G>
    </SvgIcon>
  );
}

export default IconNotMachineDry;
