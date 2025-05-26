import React from 'react';
import Svg, {
  Circle,
  Text,
  type SvgProps,
} from 'react-native-svg';

export default function IconInfo(props: SvgProps) {
  return (
    <Svg width="30" height="30" viewBox="0 0 23 23" fill="none" {...props}>
      <Circle cx="11" cy="11.8167" r="7.33333" stroke="black" />
      <Text x="9.5" y="16" fill="black" fontWeight="bold">!</Text>
    </Svg>
  );
}
