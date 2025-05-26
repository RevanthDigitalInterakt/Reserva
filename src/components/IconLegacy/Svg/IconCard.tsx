import { G, Line, Path } from 'react-native-svg';
import React from 'react';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconCard({ color }: IconProps) {
  return (
    <SvgIcon width="100%" height="100%" viewBox="0 0 19.219 14.25">
      <G transform="translate(-321.281 -453)">
        <G transform="translate(320.281 447.5)">
          <Path fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" d="M3.156,6H18.063a1.656,1.656,0,0,1,1.656,1.656v9.938a1.656,1.656,0,0,1-1.656,1.656H3.156A1.656,1.656,0,0,1,1.5,17.594V7.656A1.656,1.656,0,0,1,3.156,6Z" />
          <Path fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" d="M1.5,15H19.719" transform="translate(0 -4.031)" />
        </G>
        <Line fill="none" stroke={color} x2="4" transform="translate(333.5 462.5)" />
      </G>
    </SvgIcon>
  );
}

export default IconCard;
