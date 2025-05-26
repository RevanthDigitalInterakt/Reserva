import React from 'react';
import {
  G, Path,
} from 'react-native-svg';
import { SvgIcon } from '../../SvgIcon';
import type { IconProps } from '../IIconProps';

function Iron({ color }: IconProps) {
  return (
    <SvgIcon
      viewBox="0 0 69.33 45.68"
    >
      <G>
        <Path
          d="M15.78 1.39h40.7L67.54 44.3H1.63s2.27-14 13.21-18.24 47.82-2 47.82-2"
          fill="none"
          stroke={color}
          strokeMiterlimit={10}
          strokeWidth="2.58px"
        />
      </G>
    </SvgIcon>
  );
}

export default Iron;
