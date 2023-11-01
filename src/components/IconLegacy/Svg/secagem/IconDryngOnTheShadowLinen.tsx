import {
  Path, G,
} from 'react-native-svg';
import React from 'react';
import { SvgIcon } from '../../SvgIcon';
import type { IconProps } from '../IIconProps';

function IconDryngOnTheShadowLinen({ color }: IconProps) {
  return (
    <SvgIcon viewBox="0 0 63.7 63.7">
      <G id="Camada_2" data-name="Camada 2">
        <G id="Layer_1" data-name="Layer 1">
          <Path
            stroke={color}
            strokeWidth="2.58px"
            strokeMiterlimit={10}
            d="M1.33 1.33H62.379999999999995V62.379999999999995H1.33z"
          />
          <Path
            stroke={color}
            strokeWidth="2.58px"
            strokeMiterlimit={10}
            d="M30.65 1.75L1.09 31.31"
          />
          <Path
            stroke={color}
            strokeWidth="2.58px"
            strokeMiterlimit={10}
            d="M31.73 52.75L31.73 10.95"
          />
        </G>
      </G>
    </SvgIcon>
  );
}

export default IconDryngOnTheShadowLinen;
