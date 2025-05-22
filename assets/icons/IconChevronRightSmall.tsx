import * as React from 'react';
import Svg, {
  Path,
  type SvgProps,
} from 'react-native-svg';

export default function IconChevronRightSmall(props: SvgProps) {
  return (
    <Svg
      width={6}
      height={10}
      viewBox="0 0 6 10"
      fill="none"
      {...props}
    >
      <Path
        d="M1.667 1.667L5 5 1.667 8.333"
        stroke="#A6A6A6"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
