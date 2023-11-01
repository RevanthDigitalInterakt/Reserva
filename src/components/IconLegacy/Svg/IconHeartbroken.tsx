import React from 'react';
import { Path } from 'react-native-svg';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconHeartbroken({ color }: IconProps) {
  return (
    <SvgIcon xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 86.655 73.756">
      <Path
        id="Broken-heart-icon"
        transform="translate(0.783 0.961)"
        fill="none"
        stroke={color}
        stroke-width="1.5"
        d="M72.577,1.964a23.791,23.791,0,0,0-21.689,1.45L43.92,18.438,57.724,30.3,43.277,49.566l5.287-17.942L30.875,19.84,36.084,4.714a23.818,23.818,0,0,0-23.576-2.75C.968,7.248-4.55,20.745,4.568,36.674,11.044,48,22.523,56.545,42.542,71.851c20.025-15.306,31.5-23.843,37.981-35.177,9.117-15.929,3.594-29.426-7.946-34.71Z"
      />
    </SvgIcon>
  );
}

export default IconHeartbroken;
