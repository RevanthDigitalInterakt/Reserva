import { Path } from 'react-native-svg';
import React from 'react';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconQuestion({ color }: IconProps) {
  return (
    <SvgIcon width="100%" height="100%" viewBox="0 0 18 18">
      <Path
        id="Icon_material-help"
        data-name="Icon material-help"
        d="M12,3a9,9,0,1,0,9,9A9,9,0,0,0,12,3Zm.9,15.3H11.1V16.5h1.8Zm1.863-6.975-.81.828A3.064,3.064,0,0,0,12.9,14.7H11.1v-.45A3.623,3.623,0,0,1,12.153,11.7l1.116-1.134A1.76,1.76,0,0,0,13.8,9.3a1.8,1.8,0,0,0-3.6,0H8.4a3.6,3.6,0,0,1,7.2,0A2.864,2.864,0,0,1,14.763,11.325Z"
        transform="translate(-3 -3)"
        fill={color}
      />
    </SvgIcon>
  );
}

export default IconQuestion;
