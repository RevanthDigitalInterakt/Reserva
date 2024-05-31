import * as React from 'react';
import Svg, { Path, type SvgProps } from 'react-native-svg';

function CheckedRounded(props: SvgProps) {
  return (
    <Svg
      width={48}
      height={48}
      viewBox="0 0 48 48"
      fill="none"
      {...props}
    >
      <Path
        d="M24 .667C11.12.667.667 11.12.667 24 .667 36.88 11.12 47.333 24 47.333c12.88 0 23.333-10.453 23.333-23.333C47.333 11.12 36.88.667 24 .667zm0 42C13.71 42.667 5.333 34.29 5.333 24 5.333 13.71 13.71 5.333 24 5.333c10.29 0 18.667 8.377 18.667 18.667 0 10.29-8.377 18.667-18.667 18.667zm10.71-28.98L19.333 29.063l-6.043-6.02-3.29 3.29 9.333 9.334L38 17l-3.29-3.313z"
        fill="#344037"
      />
    </Svg>
  );
}

export default CheckedRounded;
