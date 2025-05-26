import {
  Path, G, TSpan, Text,
} from 'react-native-svg';
import React from 'react';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconCopy({ color = '#6a6a6a' }: IconProps) {
  return (
    <SvgIcon width="100%" height="100%" viewBox="0 0 21.167 30.5">
      <G transform="translate(0.188 0.5)">
        <G transform="translate(1)">
          <Path
            d="M15.448,13.5h8.766a1.948,1.948,0,0,1,1.948,1.948v8.766a1.948,1.948,0,0,1-1.948,1.948H15.448A1.948,1.948,0,0,1,13.5,24.214V15.448A1.948,1.948,0,0,1,15.448,13.5Z"
            transform="translate(-6.682 -6.682)"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
          />
          <Path
            d="M5.922,15.662H4.948A1.948,1.948,0,0,1,3,13.714V4.948A1.948,1.948,0,0,1,4.948,3h8.766a1.948,1.948,0,0,1,1.948,1.948v.974"
            transform="translate(-3 -3)"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
          />
        </G>
        <Text
          transform="translate(-0.188 28)"
          fill={color}
          fontSize="7"
          fontWeight="500"
          letterSpacing="0.005em"
        >
          <TSpan x="0" y="0">Copiar</TSpan>
        </Text>
      </G>
    </SvgIcon>

  );
}

export default IconCopy;
