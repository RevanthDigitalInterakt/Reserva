import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './IIconProps';

function IconChevronLeftSmall({ color }: IconProps) {
  return (
    <Svg width="8" height="13" viewBox="0 0 8 13" fill="none">
      <Path d="M7 12L1 6.5L7 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>

  );
}

export default IconChevronLeftSmall;
