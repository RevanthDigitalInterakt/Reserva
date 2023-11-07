import { G, Path } from 'react-native-svg';
import React from 'react';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconHandbag({ color }: IconProps) {
  return (
    <SvgIcon id="Logo" viewBox="0 0 16.569 19.477">
      <G id="Sacola" transform="translate(0.5 0.5)">
        <Path id="Caminho_65" data-name="Caminho 65" d="M5.388,7.8,4.5,19.909a1.73,1.73,0,0,0,1.73,1.73H18.339a1.73,1.73,0,0,0,1.73-1.73L18.913,7.8Z" transform="translate(-4.5 -3.162)" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" stroke-width="1" />
        <Path id="Caminho_66" data-name="Caminho 66" d="M4.5,9H17.9" transform="translate(-3.489 -4.362)" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" stroke-width="1" />
        <Path id="Caminho_67" data-name="Caminho 67" d="M18.362,18.181a3.181,3.181,0,0,0-6.362,0" transform="translate(-7.612 -15)" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" stroke-width="1" />
      </G>
    </SvgIcon>
  );
}

export default IconHandbag;
