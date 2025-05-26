import React from 'react';
import Svg, {
  G,
  Path,
  type SvgProps,
} from 'react-native-svg';

export default function IconClose(props: SvgProps) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <G clip-path="url(#clip0_474_3756)">
        <Path
          d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
          fill="black"
        />
      </G>
    </Svg>
  );
}
