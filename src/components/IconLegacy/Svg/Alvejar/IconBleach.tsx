import React from 'react';
import {
  G, Path,
} from 'react-native-svg';
import { SvgIcon } from '../../SvgIcon';
import type { IconProps } from '../IIconProps';

function IconBleach({ color }: IconProps) {
  return (
    <SvgIcon
      viewBox="0 0 71.39 62.92"
    >
      <G>
        <Path
          d="M35.7 2.89L68.95 61.5 2.44 61.5 35.7 2.89z"
          fill="none"
          stroke={color}
          strokeMiterlimit={10}
          strokeWidth="2.58px"
        />
      </G>
    </SvgIcon>
  );
}

export default IconBleach;
