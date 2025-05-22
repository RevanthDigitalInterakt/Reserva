import {
  Path, Rect, G, Defs, ClipPath,
} from 'react-native-svg';
import React from 'react';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconDish({ color }: IconProps) {
  return (
    <SvgIcon width="100%" height="100%" viewBox="0 0 17.765 17.764">
      <Defs>
        <ClipPath>
          <Rect width="17.765" height="17.764" fill="none" />
        </ClipPath>
      </Defs>
      <G transform="translate(0 0)">
        <G transform="translate(0 0)">
          <G clip-path="url(#clip-path)">
            <Path
              d="M9.231,3.006V5.522H8.993V3.02c0-.419-.476-.407-.476-.014V5.522H8.278V3.006c0-.406-.476-.38-.476-.013V5.522H7.564V3.02c0-.433-.476-.419-.476-.014V6.544c0,.655.392,1.1.845,1.1l-.262,7.272c0,1.192,1.417,1.192,1.417,0L8.826,7.644A1.026,1.026,0,0,0,9.7,6.609V3.02c.012-.419-.464-.407-.464-.014m1.535,1.074V8.755a3.168,3.168,0,0,0,.631,1.9l-.131,4.238c0,1.14,1.405,1.193,1.405.027V4.081c0-1.834-1.905-1.834-1.905,0"
              transform="translate(-1.105 -0.421)"
              fill={color}
            />
            <Path
              d="M8.882,17.764a8.882,8.882,0,1,1,8.882-8.882,8.891,8.891,0,0,1-8.882,8.882m0-16.92A8.038,8.038,0,1,0,16.92,8.882,8.047,8.047,0,0,0,8.882.844"
              transform="translate(0 0)"
              fill={color}
            />
          </G>
        </G>
      </G>
    </SvgIcon>
  );
}

export default IconDish;
