import React from 'react';
import { Path } from 'react-native-svg';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconProfile({ color }: IconProps) {
  return (
    <SvgIcon width="100%" height="100%" viewBox="0 0 20.816 20.816">
      <Path
        data-name="Icon material-person"
        d="M10.408 10.408a4.954 4.954 0 10-4.954-4.954 4.953 4.953 0 004.954 4.954zm0 2.477C7.1 12.885.5 14.544.5 17.839v2.477h19.816v-2.477c0-3.295-6.601-4.954-9.908-4.954z"
        fill="none"
        stroke={color}
      />
    </SvgIcon>
  );
}

export default IconProfile;
