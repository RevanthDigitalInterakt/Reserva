import * as React from 'react';
import {
  Path,
} from 'react-native-svg';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconShare({ color }: IconProps) {
  return (
    <SvgIcon width="100%" height="100%" viewBox="0 0 14.489 15.998">
      <Path
        data-name="Icon ionic-md-share"
        d="M16.567 14.429a2.2 2.2 0 00-1.574.6L9.222 11.7a2.7 2.7 0 00.081-.563 2.7 2.7 0 00-.081-.563l5.691-3.3a2.415 2.415 0 10-.767-1.769 2.687 2.687 0 00.081.563l-5.691 3.3a2.429 2.429 0 00-1.655-.643A2.389 2.389 0 004.5 11.133 2.43 2.43 0 008.576 12.9l5.731 3.336a2.016 2.016 0 00-.081.522 2.341 2.341 0 102.341-2.331z"
        transform="translate(-4.5 -3.094)"
        fill={color}
      />
    </SvgIcon>
  );
}

export default IconShare;
