import { Path } from 'react-native-svg';
import React from 'react';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconPicPay({ color }: IconProps) {
  return (
    <SvgIcon width="20" height="17.365" viewBox="0 0 20 17.365">
      <Path d="M24,341.354H21.9v2.1H24Zm-11.776,1.021H9.215v2.635h2.8c1.774,0,2.8.86,2.8,2.473s-1.021,2.527-2.8,2.527h-2.8v-4.944H6.1v11.558H9.215v-3.979h2.958c3.6,0,5.7-1.936,5.7-5.269C17.873,344.258,15.83,342.375,12.227,342.375ZM26.1,339.26H19.809v6.288H26.1Zm-1.022,5.215H20.884v-4.2h4.194Z" transform="translate(-6.1 -339.26)" fill="#8a8c8e" />
    </SvgIcon>
  );
}

export default IconPicPay;
