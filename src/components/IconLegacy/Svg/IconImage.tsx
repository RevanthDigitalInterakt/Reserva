import { Path } from 'react-native-svg';
import React from 'react';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconImage({ color }: IconProps) {
  return (
    <SvgIcon
      width="100%"
      height="100%"
      viewBox="0 0 30.849 26.992"
    >
      <Path fill={color} d="M31.488,5.784l0,0V28.917l0,0H4.5l0,0V5.788l0,0Zm0-1.928H4.5A1.934,1.934,0,0,0,2.571,5.784V28.921A1.934,1.934,0,0,0,4.5,30.849H31.491a1.934,1.934,0,0,0,1.928-1.928V5.784a1.934,1.934,0,0,0-1.928-1.928ZM27.635,10.6a2.892,2.892,0,1,1-2.892-2.892A2.892,2.892,0,0,1,27.635,10.6Zm1.928,16.388H6.427V23.136l6.748-11.568,7.712,9.64h1.928l6.748-5.784Z" transform="translate(-2.571 -3.856)" />
    </SvgIcon>
  );
}
export default IconImage;
