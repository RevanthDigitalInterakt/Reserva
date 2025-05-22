import React from 'react';
import { Circle, G, Path } from 'react-native-svg';
import { SvgIcon } from '../../SvgIcon';
import type { IconProps } from '../IIconProps';

function IconProfessionalCleaningFGentle({ color }: IconProps) {
  return (
    <SvgIcon viewBox="0 0 63.7 67.11">
      <G>
        <G>
          <Circle
            cx={31.85}
            cy={31.2}
            r={29.86}
            transform="rotate(-22.94 31.847 31.195)"
            strokeWidth="2.68px"
            fill="none"
            stroke="#000"
            strokeMiterlimit={10}
          />
          <Path
            strokeWidth="2.68px"
            fill="none"
            stroke={color}
            strokeMiterlimit={10}
            d="M43.57 17.94H27.4v9.8h15.49v4.1H27.4v16.73h-4.61V13.83h20.78z"
          />
          <Path
            d="M0 65.78L63.7 65.78"
            strokeWidth="2.68px"
            fill="none"
            stroke={color}
            strokeMiterlimit={10}
          />
        </G>
      </G>
    </SvgIcon>
  );
}

export default IconProfessionalCleaningFGentle;
