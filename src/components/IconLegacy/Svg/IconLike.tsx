import { Path } from 'react-native-svg';
import React from 'react';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconLike({ color = '#9a9a9a' }: IconProps) {
  return (
    <SvgIcon
      data-name="Icon feather-thumbs-up"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >

      <Path data-name="Ret\xE2ngulo 1482" fill="none" d="M0 0h30v30H0z" />
      <Path
        data-name="Icon feather-thumbs-up"
        d="M16.189 12.36V9.3A2.3 2.3 0 0 0 13.891 7l-3.062 6.891v8.423h8.637A1.531 1.531 0 0 0 21 21.013l1.057-6.891a1.531 1.531 0 0 0-1.534-1.762Zm-5.36 9.954h-2.3A1.531 1.531 0 0 1 7 20.783v-5.36a1.531 1.531 0 0 1 1.531-1.532h2.3"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

    </SvgIcon>

  );
}

export default IconLike;
