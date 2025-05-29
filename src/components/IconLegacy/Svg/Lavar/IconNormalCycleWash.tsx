import React from 'react';
import {
  G, Path,
} from 'react-native-svg';
import { SvgIcon } from '../../SvgIcon';
import type { IconProps } from '../IIconProps';

function IconNormalCycleWash({ color }: IconProps) {
  return (
    <SvgIcon
      viewBox="0 0 75.32 49.75"
    >
      <G>
        <G>
          <Path
            d="M1.27 0.21L9.15 48.46 37.66 48.46 66.17 48.46 74.05 0.21"
            fill="none"
            stroke="#000"
            strokeMiterlimit={10}
            strokeWidth="2.58px"
          />
          <Path fill="none" stroke={color} strokeMiterlimit={10} strokeWidth="2.58px" d="M71.83 13.75l-.34 2.11a9.75 9.75 0 01-4.88-2.79c-1.44-1.28-2.67-2.38-5.23-2.38s-3.8 1.1-5.23 2.38S52.88 16 49.51 16s-5.11-1.55-6.63-2.93-2.67-2.38-5.23-2.38-3.8 1.1-5.22 2.38S29.15 16 25.78 16s-5.09-1.55-6.63-2.93-2.66-2.38-5.22-2.38-3.79 1.1-5.21 2.38a9.87 9.87 0 01-4.89 2.79l-.34-2.11a8 8 0 003.81-2.26c1.52-1.37 3.26-2.92 6.63-2.92s5.11 1.55 6.64 2.92 2.66 2.39 5.21 2.39 3.8-1.12 5.23-2.39 3.27-2.92 6.64-2.92 5.11 1.55 6.63 2.92 2.67 2.39 5.23 2.39 3.8-1.12 5.22-2.39S58 8.57 61.38 8.57s5.11 1.55 6.63 2.92a7.93 7.93 0 003.82 2.26z" />
        </G>
      </G>
    </SvgIcon>
  );
}

export default IconNormalCycleWash;
