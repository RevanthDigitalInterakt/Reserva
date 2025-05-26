import React from 'react';
import {
  G, Path, Circle,
} from 'react-native-svg';
import { SvgIcon } from '../../SvgIcon';
import type { IconProps } from '../IIconProps';

function IconHighTemperature150({ color }: IconProps) {
  return (
    <SvgIcon
      viewBox="0 0 69.33 45.68"
    >
      <G>
        <G>
          <Path
            d="M15.78 1.39h40.7L67.54 44.3H1.63s2.27-14 13.21-18.24 47.82-2 47.82-2"
            fill="none"
            stroke={color}
            strokeMiterlimit={10}
            strokeWidth="2.58px"
          />
          <Circle fill="#000" stroke={color} strokeWidth="2.58px" cx={28.61} cy={33.46} r={3.48} />
          <Path
            fill="none"
            stroke={color}
            strokeMiterlimit={10}
            strokeWidth="2.58px"
            d="M44 33.46A3.49 3.49 0 1140.56 30 3.48 3.48 0 0144 33.46z"
          />
        </G>
      </G>
    </SvgIcon>
  );
}

export default IconHighTemperature150;
