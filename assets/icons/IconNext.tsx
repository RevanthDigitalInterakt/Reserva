import React from 'react';
import Svg, {
  Path,
  SvgProps,
} from 'react-native-svg';

export default function IconNext(props: SvgProps) {
  return (
    <Svg width="7" height="12" viewBox="0 0 7 12" fill="none" {...props}>
      <Path
        d="M0.272749 0.818237L5.72729 6.27278L0.272749 11.7273"
        stroke="white"
        stroke-width="0.727273"
      />
    </Svg>
  );
}
