import React from 'react';
import {
  Circle, G, Path,
} from 'react-native-svg';
import { SvgIcon } from '../../SvgIcon';
import type { IconProps } from '../IIconProps';

function IconProfessionalWetCleaningVerySoft({ color }: IconProps) {
  return (
    <SvgIcon viewBox="0 0 63.7 71.89">
      <G>
        <G>
          <Path
            strokeWidth="2.68px"
            fill="none"
            stroke={color}
            strokeMiterlimit={10}
            d="M0 70.56L63.7 70.56"
          />

          <Path
            strokeWidth="2.68px"
            fill="none"
            stroke={color}
            strokeMiterlimit={10}
            d="M0 66L63.7 66"
          />
          <Circle
            cx={31.85}
            cy={31.2}
            r={29.86}
            strokeWidth="2.68px"
            fill="none"
            stroke={color}
            strokeMiterlimit={10}
          />
          <Path
            strokeWidth="2.68px"
            fill="none"
            stroke={color}
            strokeMiterlimit={10}
            d="M51 15.28l-8 31.84h-4.72L31.8 20.69l-6.33 26.43h-4.66l-8.15-31.84H17l6.41 26.48 6.38-26.48h4.3L40.52 42l6.38-26.72z"
          />
        </G>
      </G>
    </SvgIcon>
  );
}

export default IconProfessionalWetCleaningVerySoft;
