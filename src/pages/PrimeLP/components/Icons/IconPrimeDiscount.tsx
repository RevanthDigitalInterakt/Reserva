import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function IconPrimeDiscount(props: SvgProps) {
  return (
    <Svg
      width={54}
      height={41}
      viewBox="0 0 54 41"
      fill="none"
      {...props}
    >
      <Path
        stroke="#3A3A3A"
        strokeWidth={2}
        d="M43.207 1.008s9.62-.51 9.74 6.498c.12 7.008 0 25.991 0 25.991s.175 6.498-6.494 6.498H1V27s6.494-.165 6.494-6.498S1 14.004 1 14.004V1.008h42.207Z"
      />
      <Path
        stroke="#BC090D"
        strokeWidth={2}
        d="M17.234 7.506v7.38M17.234 16.811v7.38M17.234 26.117v7.38"
      />
      <Path
        stroke="#3A3A3A"
        strokeWidth={2}
        d="m26.974 30.248 16.233-19.493M28.658 19.308a3.716 3.716 0 0 0 3.715-3.717 3.716 3.716 0 0 0-3.715-3.718 3.716 3.716 0 0 0-3.715 3.718 3.716 3.716 0 0 0 3.715 3.717ZM41.24 28.901a3.716 3.716 0 0 0 3.715-3.717 3.716 3.716 0 1 0-7.43 0 3.716 3.716 0 0 0 3.715 3.717Z"
      />
    </Svg>
  );
}

export default IconPrimeDiscount;
