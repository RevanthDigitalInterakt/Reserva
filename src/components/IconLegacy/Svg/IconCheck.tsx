import {
  G, Path, Defs, Rect, ClipPath,
} from 'react-native-svg';
import React from 'react';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconCheck({ color }: IconProps) {
  return (
    <SvgIcon width="100%" height="100%" viewBox="0 0 16.569 19.477">
      <Defs>
        <ClipPath id="clip-path">
          <Rect width="12.53" height="10.471" fill="none" />
        </ClipPath>
      </Defs>
      <G
        id="Repeat_Grid_26"
        data-name="Repeat Grid 26"
        clip-path="url(#clip-path)"
      >
        <G transform="translate(-19.5 -157.227)">
          <G
            id="Ok_-_icon"
            data-name="Ok - icon"
            transform="translate(20 157.727)"
          >
            <Path
              id="right001_-_E012"
              data-name="right001 - E012"
              d="M6.32,11.53l-1.11-1.11L7.267,8.378,0,1.11,1.11,0,9.471,8.378,6.341,11.509Z"
              transform="translate(11.53 0) rotate(90)"
              fill={color}
              stroke={color}
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
            />
          </G>
        </G>
      </G>
    </SvgIcon>
  );
}

export default IconCheck;
