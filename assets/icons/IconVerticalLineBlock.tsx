import React from 'react';
import Svg, {
  Line,
  type SvgProps,
} from 'react-native-svg';

export default function IconVerticalLineBlock(props: SvgProps) {
  return (
    <Svg width="61" height="9" viewBox="0 0 61 9" fill="none" {...props}>
      <Line
        x1="60.3002"
        y1="0.495648"
        x2="0.0658297"
        y2="8.49565"
        stroke="#999999"
      />
    </Svg>
  );
}
