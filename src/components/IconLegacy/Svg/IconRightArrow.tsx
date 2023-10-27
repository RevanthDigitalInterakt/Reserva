import { Path } from 'react-native-svg';
import React from 'react';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconRightArrow({ color }: IconProps) {
  return (
    <SvgIcon width="100%" height="100%" viewBox="0 0 29.736 8.102">
      <Path
        fill={color}
        d="M24.836,173.953h0a.937.937,0,0,0,0,1.333l1.5,1.5H.943a.942.942,0,0,0-.943.943H0a.942.942,0,0,0,.943.943H26.333l-1.5,1.5a.937.937,0,0,0,0,1.333h0a.937.937,0,0,0,1.333,0l3.42-3.42a.5.5,0,0,0,0-.7l-3.42-3.42A.937.937,0,0,0,24.836,173.953Z"
        transform="translate(0 -173.675)"
      />
    </SvgIcon>
  );
}

export default IconRightArrow;
