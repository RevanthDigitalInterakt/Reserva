import { Path } from 'react-native-svg';
import React from 'react';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconBarcode({ color }: IconProps) {
  return (
    <SvgIcon width="100%" height="100%" viewBox="0 0 17.069 12.802">
      <Path
        d="M0,17.3V4.5H.6V17.3Zm.9-.009V4.5h.3V17.293Zm.9,0V4.5h.3V17.293Zm1.5,0V4.5h.3V17.293Zm1.2,0V4.5h.591V17.293Zm1.5,0V4.5h.3V17.293Zm.6,0V4.5h.3V17.293Zm.6,0V4.5h.3V17.293Zm1.191,0V4.5h.6V17.293Zm1.5,0V4.5h.6V17.293Zm1.2,0V4.5h.6V17.293Zm1.2,0V4.5h.6V17.293Zm.9,0V4.5h.6V17.293Zm1.505,0V4.5h.9V17.293Zm1.191,0V4.5h.3V17.293Zm.6.009V4.5h.6V17.3Z"
        fill={color}
        transform="translate(0 -4.5)"
      />
    </SvgIcon>
  );
}

export default IconBarcode;
