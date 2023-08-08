import {
  Path, G, Circle,
} from 'react-native-svg';
import React from 'react';
import { SvgIcon } from '../../SvgIcon';
import type { IconProps } from '../IIconProps';

function IconMachineDry({ color }: IconProps) {
  return (

    <SvgIcon viewBox="0 0 63.7 63.7">
      <G>
        <G>
          <Path
            d="M1.33 1.33H62.379999999999995V62.379999999999995H1.33z"
            strokeWidth="2.58px"
            fill="none"
            stroke={color}
            strokeMiterlimit={10}
          />
          <Circle
            cx={31.85}
            cy={31.85}
            r={29.86}
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

export default IconMachineDry;
