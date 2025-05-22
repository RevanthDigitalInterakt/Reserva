import React from 'react';
import Svg, {
  Path,
  SvgProps,
} from 'react-native-svg';

export default function IconNext(props: SvgProps) {
  return (
    <Svg width="7" height="12" viewBox="0 0 7 12" fill="none" {...props}>
      <Path
        d="M6.72725 0.818237L1.27271 6.27278L6.72725 11.7273"
        stroke="white"
        stroke-width="0.727273"
      />
    </Svg>
  );
}
