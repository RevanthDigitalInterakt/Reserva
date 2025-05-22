import React from 'react';
import { G, Path } from 'react-native-svg';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconOffers({ color }: IconProps) {
  return (
    <SvgIcon width="100%" height="100%" viewBox="0 0 19.113 22.495">
      <G
        data-name="Grupo 1411"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <G data-name="Icon feather-shopping-bag">
          <Path
            data-name="Caminho 65"
            d="M1.533 5.895L.5 19.983a2.013 2.013 0 002.013 2.012H16.6a2.013 2.013 0 002.013-2.013L17.267 5.895z"
          />
          <Path data-name="Caminho 66" d="M1.676 5.895h15.591" />
          <Path data-name="Caminho 67" d="M13.004 4.2a3.7 3.7 0 00-7.4 0" />
        </G>
        <G data-name="Icon feather-percent">
          <Path data-name="Caminho 281" d="M13.466 10.635l-7.444 7.444" />
          <Path
            data-name="Caminho 282"
            d="M8.149 11.432a1.329 1.329 0 11-1.33-1.329 1.329 1.329 0 011.33 1.329z"
          />
          <Path
            data-name="Caminho 283"
            d="M13.998 17.281a1.329 1.329 0 11-1.33-1.329 1.329 1.329 0 011.33 1.329z"
          />
        </G>
      </G>
    </SvgIcon>
  );
}

export default IconOffers;
