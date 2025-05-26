import React from 'react';
import { Circle, G, Path } from 'react-native-svg';
import { SvgIcon } from '../../SvgIcon';
import type { IconProps } from '../IIconProps';

function IconDoNotDryClean({ color }: IconProps) {
  return (
    <SvgIcon
      viewBox="0 0 70.75 70.75"
    >
      <G>
        <G>
          <Path
            strokeWidth="2.58px"
            fill="none"
            stroke={color}
            strokeMiterlimit={10}
            d="M0.94 0.94L69.81 69.81"
          />
          <Path
            strokeWidth="2.58px"
            fill="none"
            stroke={color}
            strokeMiterlimit={10}
            d="M69.81 0.94L0.94 69.81"
          />
          <Circle
            cx={36.04}
            cy={35.74}
            r={29.86}
            transform="rotate(-76.54 36.038 35.741)"
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

export default IconDoNotDryClean;
