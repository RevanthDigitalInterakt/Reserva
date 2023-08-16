import React from 'react';
import Svg, {
  G,
  Path,
  SvgProps,
} from 'react-native-svg';

export default function IconDelete(props: SvgProps) {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <G clip-path="url(#clip0_653_1388)">
        <Path
          d="M5.66699 5.41386L5.88996 4.60652C6.1521 3.65737 7.01564 3 8.00033 3V3C8.98501 3 9.84855 3.65737 10.1107 4.60652L10.3337 5.41386"
          stroke="white"
          strokeLinecap="round"
        />
        <Path
          d="M7 7.66699L7 11.0004"
          stroke="white"
          strokeLinecap="round"
        />
        <Path
          d="M9 7.66699L9 11.0004"
          stroke="white"
          strokeLinecap="round"
        />
        <Path
          d="M3 5.6665H13"
          stroke="white"
          strokeLinecap="round"
        />
        <Path
          d="M4.33301 5.6665V11.8619C4.33301 12.1638 4.45292 12.4532 4.66635 12.6667V12.6667C4.87978 12.8801 5.16923 13 5.47105 13H10.5283C10.8301 13 11.1196 12.8801 11.333 12.6667V12.6667C11.5464 12.4532 11.6663 12.1638 11.6663 11.8619V5.6665"
          stroke="white"
          strokeLinecap="round"
        />
      </G>
    </Svg>
  );
}
