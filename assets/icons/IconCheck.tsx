import React from 'react';
import Svg, {
  Path,
  type SvgProps,
} from 'react-native-svg';

export default function IconCheck(props: SvgProps) {
  return (
    <Svg width="14" height="10" viewBox="0 0 14 10" fill="none" {...props}>
      <Path
        d="M4.44912 7.88963L1.13019 4.78001L0 5.83147L4.44912 10L14 1.05145L12.8778 0L4.44912 7.88963Z"
        fill="#000000"
      />
    </Svg>
  );
}
