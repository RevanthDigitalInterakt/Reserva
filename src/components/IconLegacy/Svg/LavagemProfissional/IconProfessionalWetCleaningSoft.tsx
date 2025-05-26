import React from 'react';
import {
  Circle, G, Path, Line,
} from 'react-native-svg';
import { SvgIcon } from '../../SvgIcon';
import type { IconProps } from '../IIconProps';

function IconProfessionalWetCleaningSoft({ color }: IconProps) {
  return (
    <SvgIcon viewBox="0 0 63.7 67.67">
      <G>
        <G>
          <Circle
            cx={31.85}
            cy={31.2}
            r={29.86}
            transform="rotate(-22.94 31.847 31.195)"
            strokeWidth="2.68px"
            fill="none"
            stroke={color}
            strokeMiterlimit={10}
          />
          <Path
            strokeWidth="2.68px"
            stroke={color}
            fill="none"
            d="M51 15.28l-8 31.84h-4.72L31.8 20.69l-6.33 26.43h-4.66l-8.15-31.84H17l6.41 26.48 6.38-26.48h4.3L40.52 42l6.38-26.72z"
          />
          <Line
            strokeWidth="2.68px"
            stroke={color}
            fill="none"
            strokeMiterlimit={10}
            y1="66.34"
            x2="63.7"
            y2="66.34"
          />
          <Path
            d="M0 66.34L63.7 66.34"
            strokeWidth="2.65px"
            fill="none"
            stroke={color}
            strokeMiterlimit={10}
          />
        </G>
      </G>
    </SvgIcon>
  );
}

export default IconProfessionalWetCleaningSoft;
