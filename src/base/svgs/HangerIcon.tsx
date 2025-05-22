import * as React from 'react';
import Svg, { Path, type SvgProps } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={24}
      height={15}
      viewBox="0 0 24 15"
      fill="none"
      {...props}
    >
      <Path
        d="M10.221 3.75c0-.778.435-2.333 2.173-2.333 1.739 0 2.174 1.166 2.174 2.333 0 1.167-2.17 1.46-2.174 2.917 0 0 8.497 2.457 9.78 2.916 1.284.46 1.087.584 1.087 2.334 0 1.166-.724 1.555-1.087 1.75h-3.26c-2.173 0-3.499.12-6.52 0-2.818.08-4.346 0-6.52 0h-3.26c-.362 0-1.086-.584-1.086-1.75 0-1.75 0-1.816 1.086-2.334 1.087-.517 7.607-2.333 7.607-2.333"
        stroke="#000"
        strokeWidth={1.16667}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default SvgComponent;
