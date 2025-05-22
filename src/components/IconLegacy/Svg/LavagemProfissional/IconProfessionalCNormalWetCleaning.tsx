import React from 'react';
import { Circle, G, Path } from 'react-native-svg';
import { SvgIcon } from '../../SvgIcon';
import type { IconProps } from '../IIconProps';

function IconProfessionalCNormalWetCleaning({ color }: IconProps) {
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
            fill="none"
            stroke={color}
            strokeMiterlimit={10}
            strokeWidth="2.58px"
          />
          <Path
            fill="none"
            stroke={color}
            strokeMiterlimit={10}
            strokeWidth="2.68px"
            d="M50.39 15.28l-8 31.84h-4.76l-6.48-26.43-6.33 26.43h-4.66L12 15.28h4.34l6.42 26.48 6.37-26.48h4.3L39.87 42l6.38-26.73z"
          />
        </G>
      </G>
    </SvgIcon>
  );
}

export default IconProfessionalCNormalWetCleaning;
