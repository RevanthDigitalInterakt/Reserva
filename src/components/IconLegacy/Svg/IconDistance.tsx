import {
  Path, Rect, G, Defs, ClipPath,
} from 'react-native-svg';
import React from 'react';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconDistance({ color }: IconProps) {
  return (
    <SvgIcon width="100%" height="100%" viewBox="0 0 25.221 20.402">
      <Defs>
        <ClipPath>
          <Rect width="25.221" height="20.402" transform="translate(-4)" fill="none" />
        </ClipPath>
      </Defs>
      <G transform="translate(4 -0.001)">
        <G transform="translate(0 0)" clip-path="url(#clip-path)">
          <Path
            d="M13.735,7.989a4.922,4.922,0,0,1,4.851,4.991h0c0,2.756-4.851,7.986-4.851,7.986s-4.851-5.23-4.851-7.986A4.922,4.922,0,0,1,13.735,7.989Zm0,6.121a1.537,1.537,0,1,0-1.493-1.537A1.516,1.516,0,0,0,13.735,14.11Z"
            transform="translate(-11.546 -1.596)"
            fill={color}
          />
          <Path
            d="M2.928,0A2.971,2.971,0,0,1,5.855,3.013c0,1.664-2.928,4.821-2.928,4.821S0,4.676,0,3.013A2.971,2.971,0,0,1,2.928,0m0,3.694a.928.928,0,1,0-.9-.928.914.914,0,0,0,.9.928"
            transform="translate(13.472 -0.001)"
            fill={color}
          />
          <Path
            d="M3.993,9.679a.523.523,0,0,1-.174-.705h0A3.179,3.179,0,0,1,6.272,7.5a.515.515,0,0,1,.153,1.017h0A2.23,2.23,0,0,0,4.678,9.5.492.492,0,0,1,3.993,9.679Z"
            transform="translate(6.622 0.221)"
            fill={color}
          />
          <Path
            d="M6.7,13.6c0-.289-.008-.579-.019-.865a.5.5,0,1,1,1-.038c.011.3.019.6.019.9a7.024,7.024,0,0,1-.524,2.956.494.494,0,0,1-.667.242.521.521,0,0,1-.236-.687A6.058,6.058,0,0,0,6.7,13.6"
            transform="translate(3.295 0.36)"
            fill={color}
          />
          <Path
            d="M9.764,18.81a3.128,3.128,0,0,0,2.055-.481.492.492,0,0,1,.679.2.521.521,0,0,1-.193.7,4.487,4.487,0,0,1-2.229.635,2.641,2.641,0,0,1-.524-.046.514.514,0,0,1-.378-.61.507.507,0,0,1,.59-.4"
            transform="translate(-4.508 0.54)"
            fill={color}
          />
        </G>
      </G>
    </SvgIcon>
  );
}

export default IconDistance;
