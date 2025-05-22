import * as React from 'react';
import {
  Circle, G, Path,
} from 'react-native-svg';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconMessage({ color }: IconProps) {
  return (
    <SvgIcon width="100%" height="100%" viewBox="0 0 17 17.002">
      <G transform="translate(-359.095 -359.87)">
        <Path
          id="a"
          fill="none"
          stroke={color}
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M375.595,368.371a8,8,0,0,1-12.447,6.651l-3.553,1.35,1.257-3.693a8,8,0,1,1,14.743-4.308Z"
          transform="translate(0)"
        />
        <G transform="translate(363.009 367.53)">
          <Circle id="b" stroke="none" fill={color} cx="0.879" cy="0.879" r="0.879" transform="translate(0)" />
          <Circle id="b" stroke="none" fill={color} cx="0.879" cy="0.879" r="0.879" transform="translate(3.707)" />
          <Circle id="b" stroke="none" fill={color} cx="0.879" cy="0.879" r="0.879" transform="translate(7.415)" />
        </G>
      </G>
    </SvgIcon>
  );
}

export default IconMessage;
