import { Path } from 'react-native-svg';
import React from 'react';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconDeslike({ color = '#9a9a9a' }: IconProps) {
  return (
    <SvgIcon xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <Path
        data-name="Icon feather-thumbs-up"
        d="M6.386 10.454v3.063a2.3 2.3 0 0 0 2.3 2.3l3.063-6.891V.5H3.108a1.531 1.531 0 0 0-1.531 1.3L.52 8.693a1.531 1.531 0 0 0 1.531 1.761ZM11.746.5h2.3a1.531 1.531 0 0 1 1.531 1.531v5.36a1.531 1.531 0 0 1-1.531 1.531h-2.3"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}

export default IconDeslike;
