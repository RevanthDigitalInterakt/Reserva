import React from 'react';
import Svg, {
  ClipPath,
  Defs,
  G,
  Path,
  Rect,
  type SvgProps,
} from 'react-native-svg';

export default function IconCopyToClipboard(props: SvgProps) {
  return (
    <Svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...props}>
      <G clipPath="url(#clip0_2357_48)">
        <Path
          d="M4 13.5H12.5C13.0523 13.5 13.5 13.0523 13.5 12.5V4C13.5 3.44771 13.0523 3 12.5 3H4C3.44771 3 3 3.44771 3 4V12.5C3 13.0523 3.44771 13.5 4 13.5Z"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M0.5 10.5V1.5C0.5 1.23478 0.605357 0.98043 0.792893 0.792893C0.98043 0.605357 1.23478 0.5 1.5 0.5H10.5"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2357_48">
          <Rect width="14" height="14" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
