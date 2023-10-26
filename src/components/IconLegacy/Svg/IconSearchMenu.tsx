import React from 'react';
import { Circle, G, Path } from 'react-native-svg';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconSearchMenu({ color }: IconProps) {
  return (
    <SvgIcon width="100%" height="100%" viewBox="0 0 26.139 20.941">
      <G
        data-name="Grupo 1338"
        transform="translate(.5 .5)"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path data-name="Linha 78" d="M0 0h16.663" />
        <Path data-name="Linha 79" d="M0 6.754h6.438" />
        <Path data-name="Linha 80" d="M0 13.507h6.438" />
        <Circle
          data-name="Elipse 68"
          cx={7.227}
          cy={7.227}
          transform="translate(8.647 3.828)"
          r={7.227}
        />
        <Path data-name="Linha 81" d="M21.17 15.971l3.762 3.762" />
      </G>
    </SvgIcon>
  );
}

export default IconSearchMenu;
