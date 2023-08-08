import { Path } from 'react-native-svg';
import React from 'react';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconHeartRaised({ color }: IconProps) {
  return (
    <SvgIcon
      width="100%"
      height="100%"
      id="Logo"
      viewBox="-.3 0 20.846 18.366"
    >
      <Path
        id="Icon_awesome-heart"
        data-name="Icon awesome-heart"
        d="M17.917,3.435a5.3,5.3,0,0,0-7.232.527l-.764.787-.764-.787a5.3,5.3,0,0,0-7.232-.527,5.565,5.565,0,0,0-.384,8.058l7.5,7.744a1.215,1.215,0,0,0,1.756,0l7.5-7.744a5.562,5.562,0,0,0-.38-8.058Z"
        transform="translate(0.001 -2.248)"
        fill={color}
        stroke={color}
        stroke-width="1"
      />
    </SvgIcon>
  );
}

export default IconHeartRaised;
