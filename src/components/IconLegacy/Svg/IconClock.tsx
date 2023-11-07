import { Path } from 'react-native-svg';
import React from 'react';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconClock({ color }: IconProps) {
  return (
    <SvgIcon width="100%" height="100%" viewBox="0 0 18 18">
      <Path
        transform="translate(-3 -3)"
        fill={color}
        d="M11.991,3A9,9,0,1,0,21,12,9,9,0,0,0,11.991,3ZM12,19.2A7.2,7.2,0,1,1,19.2,12,7.2,7.2,0,0,1,12,19.2Zm.45-11.7H11.1v5.4l4.725,2.835.675-1.107-4.05-2.4Z"
      />
    </SvgIcon>
  );
}

export default IconClock;
