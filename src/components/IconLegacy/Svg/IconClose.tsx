import * as React from 'react';
import { Path } from 'react-native-svg';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconClose({ color }: IconProps) {
  return (
    <SvgIcon width="100%" height="100%" viewBox="0 0 8.242 8.24">
      <Path
        d="M5.098 4.12l2.944-2.944A.69.69 0 007.066.2L4.122 3.144 1.178.2a.69.69 0 10-.976.976L3.146 4.12.202 7.064a.69.69 0 00.976.976l2.944-2.944L7.066 8.04a.69.69 0 00.976-.976z"
        fill={color}
      />
    </SvgIcon>
  );
}

export default IconClose;
