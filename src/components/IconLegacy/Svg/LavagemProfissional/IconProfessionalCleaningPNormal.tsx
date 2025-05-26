import React from 'react';
import { Circle, G, Path } from 'react-native-svg';
import { SvgIcon } from '../../SvgIcon';
import type { IconProps } from '../IIconProps';

function IconProfessionalCleaningPNormal({ color }: IconProps) {
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
            transform="rotate(-25.92 31.207 31.203)"
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
            d="M27.55 35.29v12.64h-3.92V14.48h9.19q5.37 0 8.32 2.61a9.35 9.35 0 013 7.37 10.16 10.16 0 01-3.28 7.79 12.55 12.55 0 01-8.85 3zm0-17.27v13.72h4.1a9.19 9.19 0 006.2-1.86A6.56 6.56 0 0040 24.65Q40 18 32.14 18z"
          />
        </G>
      </G>
    </SvgIcon>
  );
}

export default IconProfessionalCleaningPNormal;
