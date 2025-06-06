import { Path } from 'react-native-svg';
import React from 'react';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconPrint({ color }: IconProps) {
  return (
    <SvgIcon width="100%" height="100%" viewBox="0 0 19.666 17.027">
      <Path
        fill={color}
        d="M.18,20.987V13.9l2.469-2.746H4.458v1.362H3.266l-1.7,1.894v5.215H18.484V14.41l-1.7-1.894H15.59V11.154H17.4L19.846,13.9v7.088H.18ZM4.458,14.2V7.174L7.672,3.96H15.59V14.2H4.458Zm1.277-1.3h8.577V5.237H8.949V8.451H5.735Z"
        transform="translate(-0.18 -3.96)"
      />
    </SvgIcon>
  );
}

export default IconPrint;
