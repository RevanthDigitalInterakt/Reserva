import { G, Rect } from 'react-native-svg';
import React from 'react';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconSideMenu({ color }: IconProps) {
  return (
    <SvgIcon width="100%" height="100%" viewBox="0 0 20 13">
      <G id="side_menu_icon" transform="translate(-15 -18)">
        <Rect id="Retângulo_163" data-name="Retângulo 163" width="20" height="1" transform="translate(15 18)" fill={color} />
        <Rect id="Retângulo_164" data-name="Retângulo 164" width="20" height="1" transform="translate(15 24)" fill={color} />
        <Rect id="Retângulo_165" data-name="Retângulo 165" width="20" height="1" transform="translate(15 30)" fill={color} />
      </G>
    </SvgIcon>
  );
}

export default IconSideMenu;
