import React from 'react';
import { Circle, G, Path } from 'react-native-svg';
import { SvgIcon } from '../../SvgIcon';
import type { IconProps } from '../IIconProps';

function IconProfessionalCleaningPGentle({ color }: IconProps) {
  return (
    <SvgIcon viewBox="0 0 63.7 68.01">
      <G>
        <G>
          <Circle
            cx={31.85}
            cy={31.2}
            r={29.86}
            strokeWidth="2.58px"
            fill="none"
            stroke={color}
            strokeMiterlimit={10}
          />
          <Path
            strokeWidth="2.58px"
            fill="none"
            stroke={color}
            strokeMiterlimit={10}
            d="M28.2 35.29v12.64h-3.92V14.48h9.19c3.57 0 6.35.87 8.31 2.61a9.32 9.32 0 013 7.37 10.16 10.16 0 01-3.28 7.79 12.56 12.56 0 01-8.86 3zm0-17.29v13.74h4.1q4.06 0 6.19-1.86a6.53 6.53 0 002.14-5.23q0-6.63-7.84-6.63z"
          />
          <Path
            d="M0 66.68L63.7 66.68"
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

export default IconProfessionalCleaningPGentle;
