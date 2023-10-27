import React from 'react';
import { G, Path } from 'react-native-svg';
import { SvgIcon } from '../../SvgIcon';
import type { IconProps } from '../IIconProps';

function IconNotWash({ color }: IconProps) {
  return (
    <SvgIcon
      viewBox="0 0 75.32 70.75"
    >
      <G>
        <G>
          <Path fill="none" stroke={color} strokeMiterlimit={10} strokeWidth="2.58px" d="M3.23 0.94L72.1 69.81" />
          <Path fill="none" stroke={color} strokeMiterlimit={10} strokeWidth="2.58px" d="M72.1 0.94L3.23 69.81" />
          <Path
            d="M1.27 8.85L9.15 57.1 37.66 57.1 66.17 57.1 74.05 8.85"
            strokeWidth="2.58px"
            fill="none"
            stroke="#000"
            strokeMiterlimit={10}
          />
          <Path fill="none" stroke={color} strokeMiterlimit={10} strokeWidth="2.58px" d="M71.83 22.39l-.34 2.11a9.67 9.67 0 01-4.88-2.79c-1.44-1.27-2.67-2.38-5.23-2.38s-3.8 1.11-5.23 2.38-3.27 2.93-6.64 2.93-5.11-1.55-6.63-2.93-2.67-2.38-5.23-2.38-3.8 1.11-5.22 2.38-3.28 2.93-6.65 2.93-5.09-1.55-6.63-2.93-2.66-2.38-5.22-2.38-3.79 1.11-5.21 2.38a9.8 9.8 0 01-4.89 2.79l-.34-2.11a7.9 7.9 0 003.81-2.26c1.52-1.37 3.26-2.92 6.63-2.92s5.11 1.55 6.64 2.92 2.66 2.39 5.21 2.39 3.8-1.11 5.23-2.39 3.27-2.92 6.64-2.92 5.11 1.55 6.63 2.92 2.67 2.39 5.23 2.39 3.8-1.11 5.22-2.39 3.28-2.92 6.65-2.92 5.11 1.55 6.63 2.92a7.85 7.85 0 003.82 2.26z" />
        </G>
      </G>
    </SvgIcon>
  );
}

export default IconNotWash;
