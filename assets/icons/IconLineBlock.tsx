import React from 'react';
import Svg, {
  Line,
  type SvgProps,
} from 'react-native-svg';

export default function IconLineBlock(props: SvgProps) {
  return (
    <Svg width="22" height="23" viewBox="0 0 22 23" fill="none" {...props}>
      <Line
        x1="21.3799"
        y1="0.751506"
        x2="1.18604"
        y2="22.0672"
        stroke="#D6D6D6"
        strokeWidth="1.12188"
      />
    </Svg>
  );
}
