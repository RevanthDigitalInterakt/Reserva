import { Path } from 'react-native-svg';
import React from 'react';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconAdd({ color }: IconProps) {
  return (
    <SvgIcon
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
    >
      <Path
        fill={color}
        d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
      />
      <Path
        d="M0 0h24v24H0V0z"
        fill="none"
        x="30"
      />
    </SvgIcon>
  );
}

export default IconAdd;
