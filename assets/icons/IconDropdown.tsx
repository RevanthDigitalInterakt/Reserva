import * as React from 'react';
import Svg, {
  Path,
  type SvgProps,
} from 'react-native-svg';

export default function IconDropdown(props: SvgProps) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 -1 16 16"
      fill="none"
      {...props}
    >
      <Path
        d="M6.66669 4.66668L10 8.00001L6.66669 11.3333"
        stroke="#969CA4"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
