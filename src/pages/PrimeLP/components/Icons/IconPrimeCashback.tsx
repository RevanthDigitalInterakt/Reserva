import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function IconPrimeCashback(props: SvgProps) {
  return (
    <Svg
      width={54}
      height={47}
      fill="none"
      viewBox="0 0 54 47"
      {...props}
    >
      <Path
        stroke="#3A3A3A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M40 6.325H14L1 19.549l26 26.449 26-26.449L40 6.325Z"
      />
      <Path stroke="#3A3A3A" strokeWidth={2} d="M1.392 20.08h50.689" />
      <Path
        stroke="#3A3A3A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M42.033 8.822 27 46 16.6 20.746 11.537 9.087"
      />
      <Path
        stroke="#3A3A3A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16.665 20.08 27 6.748 37.335 20.08"
      />
      <Path
        fill="#BC090D"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M1 33.818s7.784 3.828 7.784 7.926c0-4.09 7.88-7.926 7.88-7.926s-7.88-3.746-7.88-8.469C8.784 30.171 1 33.82 1 33.82ZM38.306 6.939s5.458 2.684 5.458 5.556c0-2.867 5.526-5.556 5.526-5.556S43.764 4.315 43.764 1c0 3.38-5.458 5.939-5.458 5.939ZM38.306 29.947s4.226 2.078 4.226 4.303c0-2.22 4.278-4.303 4.278-4.303s-4.279-2.033-4.279-4.598c0 2.618-4.225 4.598-4.225 4.598Z"
      />
    </Svg>
  );
}

export default IconPrimeCashback;
