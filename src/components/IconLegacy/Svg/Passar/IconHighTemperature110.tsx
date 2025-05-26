import React from 'react';
import {
  G, Path,
} from 'react-native-svg';
import { SvgIcon } from '../../SvgIcon';
import type { IconProps } from '../IIconProps';

function IconHighTemperature110({ color }: IconProps) {
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
          <Path
            fill="none"
            stroke={color}
            strokeMiterlimit={10}
            d="M38.07 33.46A3.49 3.49 0 1134.59 30a3.48 3.48 0 013.48 3.46z"
          />
        </G>
      </G>
    </SvgIcon>
  );
}

export default IconHighTemperature110;
