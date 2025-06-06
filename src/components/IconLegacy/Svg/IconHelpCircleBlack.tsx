import { Path } from 'react-native-svg';
import React from 'react';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconHelpCircleBlack({ color }: IconProps) {
  return (
    <SvgIcon xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 13 13">
      <Path fill={color} id="Icon_material-help" data-name="Icon material-help" d="M9.5,3A6.5,6.5,0,1,0,16,9.5,6.5,6.5,0,0,0,9.5,3Zm.65,11.05H8.85v-1.3h1.3ZM11.5,9.012l-.585.6a2.213,2.213,0,0,0-.76,1.84H8.85v-.325a2.616,2.616,0,0,1,.76-1.839l.806-.819A1.271,1.271,0,0,0,10.8,7.55a1.3,1.3,0,0,0-2.6,0H6.9a2.6,2.6,0,0,1,5.2,0A2.068,2.068,0,0,1,11.5,9.012Z" transform="translate(-3 -3)" />
    </SvgIcon>
  );
}

export default IconHelpCircleBlack;
