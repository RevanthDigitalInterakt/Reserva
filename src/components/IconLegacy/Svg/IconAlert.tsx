import { Path, G } from 'react-native-svg';
import React from 'react';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconAlert({ color }: IconProps) {
  return (
    <SvgIcon width="100%" height="100%" viewBox="0 0 19.615 17.7">
      <G transform="translate(-14.123 -816.15)">
        <Path
          d="M12,9v2m0,4h.01M5.072,19H18.928a2,2,0,0,0,1.732-3L13.732,4a2,2,0,0,0-3.464,0L3.34,16A2,2,0,0,0,5.072,19Z"
          transform="translate(11.931 814)"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.7"
        />
      </G>
    </SvgIcon>
  );
}

export default IconAlert;
