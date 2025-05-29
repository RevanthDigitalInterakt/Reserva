import { Path } from 'react-native-svg';
import React from 'react';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconStar({ color }: IconProps) {
  return (
    <SvgIcon width="100%" height="100%" viewBox="0 0 39 34">
      <Path
        data-name="Pol\xEDgono 25"
        d="m19.5 0 5.85 11.414L39 12.987l-10.035 8.627L31.552 34 19.5 27.918 7.448 34l2.586-12.386L0 12.987l13.65-1.573Z"
        fill={color}
      />
    </SvgIcon>
  );
}

export default IconStar;
