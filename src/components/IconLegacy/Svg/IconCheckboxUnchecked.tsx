import * as React from 'react';
import { G, Rect } from 'react-native-svg';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconCheckboxUnchecked({ color }: IconProps) {
  return (
    <SvgIcon width="100%" height="100%" viewBox="0 0 15 15">
      <G fill="#fff" stroke={color}>
        <Rect width={15} height={15} rx={2} stroke="none" />
        <Rect x={0.5} y={0.5} width={14} height={14} rx={1.5} fill="none" />
      </G>
    </SvgIcon>
  );
}

export default IconCheckboxUnchecked;
