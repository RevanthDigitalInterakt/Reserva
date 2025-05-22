import { Path } from 'react-native-svg';
import React from 'react';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconCheckFeather({ color }: IconProps) {
  return (
    <SvgIcon width="100%" height="100%" viewBox="0 0 15.828 11.352">
      <Path
        d="M19,9l-8.937,8.938L6,13.875"
        transform="translate(-4.586 -7.586)"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </SvgIcon>
  );
}

export default IconCheckFeather;
