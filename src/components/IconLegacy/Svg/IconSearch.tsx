import { Ellipse, G, Path } from 'react-native-svg';
import React from 'react';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconSearch({ color }: IconProps) {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 17.493 17.112"
    >
      <G
        data-name="Grupo 2429"
        transform="translate(-283.354 -17.548)"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
      >
        <Ellipse
          data-name="Elipse 68"
          cx={7.227}
          cy={7.227}
          rx={7.227}
          ry={7.227}
          transform="translate(283.854 18.048)"
        />
        <Path
          data-name="Linha 81"
          transform="translate(296.377 30.19)"
          d="M0 0L3.762 3.762"
        />
      </G>
    </SvgIcon>
  );
}

export default IconSearch;
