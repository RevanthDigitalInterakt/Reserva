import * as React from 'react';
import { G, Path } from 'react-native-svg';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconArrowBack({ color }: IconProps) {
  return (
    <SvgIcon width="100%" height="100%" viewBox="0 0 18.225 19.054">
      <G id="Seta_-_icon" data-name="Seta - icon" transform="translate(17.225 17.639) rotate(180)">
        <Path id="Caminho_68" data-name="Caminho 68" d="M7.5,18H23.725" transform="translate(-7.5 -9.887)" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        <Path id="Caminho_69" data-name="Caminho 69" d="M18,7.5l8.113,8.113L18,23.725" transform="translate(-9.887 -7.5)" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </G>
    </SvgIcon>
  );
}

export default IconArrowBack;
