import React from 'react';
import Svg, {
  Circle,
  Path,
} from 'react-native-svg';

export default function Info() {
  return (
    <Svg width={24} height={24} viewBox="0 0 19 19" fill="none">
      <Circle cx="9.63672" cy="9.5" r="6" stroke="#E4002B" stroke-width="1.6" />
      <Path
        d="M9.63672 6.125V10.2895M9.63672 12.1842V12.5"
        stroke="#E4002B"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
