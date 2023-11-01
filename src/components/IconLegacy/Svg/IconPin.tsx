import * as React from 'react';
import { G, Path } from 'react-native-svg';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconPin({ color }: IconProps) {
  return (
    <SvgIcon width="15.727" height="19" viewBox="0 0 15.727 19">
      <G transform="translate(0.5 0.5)">
        <Path
          id="a"
          fill="#FFF"
          stroke={color}
          d="M19.227,8.864c0,5.727-7.364,10.636-7.364,10.636S4.5,14.591,4.5,8.864a7.364,7.364,0,1,1,14.727,0Z"
          transform="translate(-4.5 -1.5)"
        />
        <Path
          id="a"
          fill="#FFF"
          stroke={color}
          d="M18.833,13.167A2.667,2.667,0,1,1,16.167,10.5,2.667,2.667,0,0,1,18.833,13.167Z"
          transform="translate(-8.803 -5.75)"
        />
      </G>
    </SvgIcon>
  );
}

export default IconPin;
