import * as React from 'react';
import { G, Path } from 'react-native-svg';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconPix({ color = '#555555' }: IconProps) {
  return (
    <SvgIcon width="100%" height="100%" viewBox="0 0 18.001 13.234">
      <G transform="translate(-29.639 -0.213)">
        <Path
          d="M397.385,479.084H403.2l-1.992-3.973-1.149-2.292h-5.8Z"
          transform="translate(-361.512 -472.606)"
          fill={color}
          fill-rule="evenodd"
        />
        <Path
          d="M438.782,542.521h5.784l-3.158-6.265-3.817,3.994Z"
          transform="translate(-400.083 -529.073)"
          fill={color}
          fill-rule="evenodd"
        />
        <Path
          d="M459.745,473.053l-2.13,2.275,1.992,3.973,5.939-6.248Z"
          transform="translate(-417.907 -472.814)"
          fill={color}
          fill-rule="evenodd"
        />
        <Path
          d="M371.862,536.23l-5.9,6.2h5.75l2.105-2.2,3.817-3.994Z"
          transform="translate(-336.318 -529.051)"
          fill={color}
          fill-rule="evenodd"
        />
      </G>
    </SvgIcon>
  );
}

export default IconPix;
