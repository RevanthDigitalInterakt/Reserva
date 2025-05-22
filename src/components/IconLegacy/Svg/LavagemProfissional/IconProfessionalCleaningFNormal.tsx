import React from 'react';
import { Circle, G, Path } from 'react-native-svg';
import { SvgIcon } from '../../SvgIcon';
import type { IconProps } from '../IIconProps';

function IconProfessionalCleaningFNormal({ color }: IconProps) {
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
            transform="rotate(-76.89 31.202 31.198)"
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
            d="M42.92 17.94H26.76v9.8h15.49v4.1H26.76v16.73h-4.62V13.83h20.78z"
          />
        </G>
      </G>
    </SvgIcon>
  );
}

export default IconProfessionalCleaningFNormal;
