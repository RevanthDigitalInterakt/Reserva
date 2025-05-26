import {
  Path, G, Defs, ClipPath, Rect,
} from 'react-native-svg';
import React from 'react';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconPrime({ color }: IconProps) {
  return (
    <SvgIcon width="100%" height="100%" viewBox="0 0 26.745 20.907">
      <Defs>
        <ClipPath>
          <Rect width="26.745" height="20.907" fill={color} />
        </ClipPath>
      </Defs>
      <G clip-path="url(#clip-path)">
        <Path
          d="M26.487,6.729,21.9.751A2.094,2.094,0,0,0,20.384,0H6.361A2.1,2.1,0,0,0,4.84.751L.26,6.729a1.3,1.3,0,0,0,.109,1.69L12.535,20.562a1.188,1.188,0,0,0,1.676,0L26.375,8.419a1.305,1.305,0,0,0,.113-1.69ZM20.384.951a.9.9,0,0,1,.3.067l.634,5.442L14.684.951Zm.228,6.157H6.133l7.239-6.016ZM6.063,1.017a.9.9,0,0,1,.3-.067h5.7L5.428,6.46ZM4.982,2.127,4.4,7.107H1.162ZM1.348,8.055H4.564l5.953,9.154Zm12.023,11.8L5.694,8.055H21.05Zm2.853-2.647L22.18,8.055H25.4Zm6.118-10.1-.578-4.98,3.819,4.98Z"
          transform="translate(0 -0.001)"
          fill={color}
        />
      </G>
    </SvgIcon>
  );
}

export default IconPrime;
