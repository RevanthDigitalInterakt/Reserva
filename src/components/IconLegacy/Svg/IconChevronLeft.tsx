import * as React from 'react';
import { G, Path } from 'react-native-svg';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconChevronLeft({ color }: IconProps) {
  return (
    <SvgIcon width={14.137} height={24.22} viewBox="0 0 14.137 24.22">
      <G data-name="Arrow - icon">
        <Path
          data-name="right001 - E012"
          d="M0 1.539L1.539 0l10.06 10.08L21.681 0l1.539 1.539-11.621 11.6-4.343-4.344z"
          fill={color}
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          transform="rotate(90 6.569 7.069)"
        />
      </G>
    </SvgIcon>
  );
}

export default IconChevronLeft;
