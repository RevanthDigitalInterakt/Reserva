import * as React from 'react';
import { G, Path } from 'react-native-svg';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconCloseThin({ color }: IconProps) {
  return (
    <SvgIcon xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <G fill="none" stroke={color}>
        <Path data-name="Linha 753" d="M14.497.353.355 14.495" />
        <Path data-name="Linha 754" d="M14.497 14.495.355.353" />
      </G>
    </SvgIcon>
  );
}

export default IconCloseThin;
