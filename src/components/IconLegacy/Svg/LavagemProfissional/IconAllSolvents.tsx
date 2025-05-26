import React from 'react';
import { Circle, G, Path } from 'react-native-svg';
import { SvgIcon } from '../../SvgIcon';
import type { IconProps } from '../IIconProps';

function IconAllSolvents({ color }: IconProps) {
  return (
    <SvgIcon
      viewBox="0 0 62.41 62.41"
    >
      <G>
        <G>
          <Circle
            cx={31.2}
            cy={31.2}
            r={29.86}
            transform="rotate(-22.94 31.206 31.193)"
            fill="none"
            stroke={color}
            strokeMiterlimit={10}
            strokeWidth="2.58px"
          />
          <Path
            fill="none"
            stroke={color}
            strokeMiterlimit={10}
            strokeWidth="2.58px"
            d="M40 47.2L37.66 40H25l-2.57 7.2h-5.22l13.88-34.65h1.23L45.2 47.2zm-8.52-25.69l-5.29 15.05h10.14z"
          />
        </G>
      </G>
    </SvgIcon>
  );
}

export default IconAllSolvents;
