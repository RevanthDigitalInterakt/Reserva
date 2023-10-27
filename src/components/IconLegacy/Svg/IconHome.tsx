import React from 'react';
import { Path } from 'react-native-svg';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconHome({
  color,
}: IconProps) {
  return (
    <SvgIcon width="100%" height="100%" viewBox="0 0 18.412 20.671">
      <Path
        data-name="Caminho 209"
        d="M17.912 8.414v11.758h-5.993v-7.649H6.493v7.649H.502V8.414L9.209.5z"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}

export default IconHome;
