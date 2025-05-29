import React from 'react';
import Svg, {
  Circle,
  G,
  Path,
  SvgProps,
} from 'react-native-svg';

export default function IconInfoFill(props: SvgProps) {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <G clipPath="url(#clip0_468_6202)">
        <Circle cx={7.66} r={6.66} cy={7.66} fill="#E4002B" />
      </G>
      <Path
        d="M7 4.33301H8.33333V5.66634H7V4.33301ZM7 6.99967H8.33333V10.9997H7V6.99967Z"
        fill="white"
      />
    </Svg>
  );
}
