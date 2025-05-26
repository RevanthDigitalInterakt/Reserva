import * as React from 'react';
import { Path } from 'react-native-svg';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconSend({ color }: IconProps) {
  return (
    <SvgIcon width="100%" height="100%" viewBox="0 0 15.383 15.219">
      <Path
        id="Caminho_521"
        data-name="Caminho 521"
        d="M1883.494,6594.749l1.645,2.624s1.088,1.3,1.7-.494,4.093-11.48,4.093-11.48a1.108,1.108,0,0,0-.227-1.066c-.436-.412-1.443,0-1.443,0l-11.648,4.337s-.627.336-.424.876,1.456,1.137,1.456,1.137l3.207,1.78s.657.4,1.423-.454,3.3-3.474,3.3-3.474"
        transform="translate(-1876.376 -6583.374)"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </SvgIcon>
  );
}

export default IconSend;
