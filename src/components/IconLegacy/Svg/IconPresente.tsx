import { Defs, Path } from 'react-native-svg';
import React from 'react';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconPresente({ color }: IconProps) {
  return (
    <SvgIcon width="100%" height="100%" viewBox="0 0 17.094 17.094">
      <Defs />
      <Path
        fill="none"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M14.484 8.047v8.047H1.609V8.047M0 4.023h16.094v4.023H0zM8.047 16.093V4.023M8.047 4.023H4.426a2.012 2.012 0 010-4.023c2.816 0 3.621 4.023 3.621 4.023z"
        transform="translate(.5 .5)"
      />
      <Path
        fill="none"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M8.047 4.023h3.621a2.012 2.012 0 100-4.023C8.847 0 8.047 4.023 8.047 4.023z"
        transform="translate(.5 .5)"
      />
    </SvgIcon>
  );
}

export default IconPresente;
