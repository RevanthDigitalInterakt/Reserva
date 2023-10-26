import React from 'react';
import { Circle, G } from 'react-native-svg';
import { SvgIcon } from '../../SvgIcon';
import type { IconProps } from '../IIconProps';

function IconDryClean({ color = '#000' }: IconProps) {
  return (
    <SvgIcon
      viewBox="0 0 62.41 62.41"
    >
      <G>
        <Circle
          cx={31.2}
          cy={31.2}
          r={29.86}
          transform="rotate(-26.94 31.197 31.2)"
          id="Layer_1"
          data-name="Layer 1"
          fill="none"
          stroke={color}
          strokeMiterlimit={10}
          strokeWidth="2.58px"
        />
      </G>
    </SvgIcon>
  );
}

export default IconDryClean;
