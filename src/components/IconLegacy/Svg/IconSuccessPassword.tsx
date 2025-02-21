import {
  Path, Rect, G,
  Mask,
} from 'react-native-svg';
import React from 'react';
import { SvgIcon } from '../SvgIcon';

export default function IconSuccessPassword() {
  return (
    <SvgIcon width="92" height="92" viewBox="0 0 92 92" fill="none">
      <Rect width="92" height="92" rx="46" fill="#11AB6B" />
      <Mask id="mask0_123_620" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="20" y="20" width="52" height="52">
        <Rect x="20" y="20" width="52" height="52" fill="#D9D9D9" />
      </Mask>

      <G mask="url(#mask0_123_620)">
        <Path d="M40.6919 58.2498L29.1338 46.6917L31.45 44.375L40.6919 53.6169L60.5505 33.7583L62.8666 36.075L40.6919 58.2498Z" fill="white" />
      </G>
    </SvgIcon>
  );
}
