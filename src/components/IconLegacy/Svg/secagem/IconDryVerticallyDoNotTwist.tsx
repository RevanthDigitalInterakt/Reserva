import {
  Path, G,
} from 'react-native-svg';
import React from 'react';
import { SvgIcon } from '../../SvgIcon';
import type { IconProps } from '../IIconProps';

function IconDryVerticallyDoNotTwist({ color }: IconProps) {
  return (
    <SvgIcon viewBox="0 0 63.7 63.7">

      <G>
        <G>
          <Path
            strokeWidth="2.58px"
            fill="none"
            stroke={color}
            strokeMiterlimit={10}
            d="M1.33 1.33H62.379999999999995V62.379999999999995H1.33z"
          />
          <Path
            strokeWidth="2.58px"
            fill="none"
            stroke={color}
            strokeMiterlimit={10}
            d="M38.49 10.95L38.49 52.75"
          />
          <Path
            strokeWidth="2.58px"
            fill="none"
            stroke={color}
            strokeMiterlimit={10}
            d="M25.22 10.95L25.22 52.75"
          />
        </G>
      </G>
    </SvgIcon>
  );
}

export default IconDryVerticallyDoNotTwist;
