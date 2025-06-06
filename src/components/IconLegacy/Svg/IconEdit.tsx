import { Path } from 'react-native-svg';
import React from 'react';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconEdit({ color }: IconProps) {
  return (
    <SvgIcon
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill={color}
    >
      <Path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
      <Path
        d="M0 0h24v24H0z"
        fill="none"
      />
    </SvgIcon>
  );
}

export default IconEdit;
