import { G, Path } from 'react-native-svg';
import React from 'react';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconTrash({ color }: IconProps) {
  return (
    <SvgIcon width="100%" height="100%" viewBox="0 0 16.569 19.477">
      <G
        id="Group_2046"
        data-name="Group 2046"
        transform="translate(-301.159 -235.5)"
      >
        <G
          id="Trash_-_icon"
          data-name="Trash - icon"
          transform="translate(301.659 236)"
        >
          <Path
            id="Path_300"
            data-name="Path 300"
            d="M4.5,9H18.841"
            transform="translate(-4.5 -5.813)"
            fill="none"
            stroke={color}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
          />
          <Path
            id="Path_301"
            data-name="Path 301"
            d="M18.654,6.187V17.341a1.593,1.593,0,0,1-1.593,1.593H9.093A1.593,1.593,0,0,1,7.5,17.341V6.187m2.39,0V4.593A1.593,1.593,0,0,1,11.484,3H14.67a1.593,1.593,0,0,1,1.593,1.593V6.187"
            transform="translate(-5.907 -3)"
            fill="none"
            stroke={color}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
          />
          <Path
            id="Path_302"
            data-name="Path 302"
            d="M15,16.5v4.78"
            transform="translate(-9.423 -9.329)"
            fill="none"
            stroke={color}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
          />
          <Path
            id="Path_303"
            data-name="Path 303"
            d="M21,16.5v4.78"
            transform="translate(-12.236 -9.329)"
            fill="none"
            stroke={color}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
          />
        </G>
      </G>
    </SvgIcon>
  );
}

export default IconTrash;
