import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function IconPrimeFreeShipping(props: SvgProps) {
  return (
    <Svg
      width={50}
      height={58}
      viewBox="0 0 50 58"
      fill="none"
      {...props}
    >
      <Path
        stroke="#3A3A3A"
        strokeWidth={2}
        d="M1.312 12.347v27.146l23.453 10.93L48.3 39.493V12.347L24.765 2 1.312 12.347Z"
      />
      <Path
        stroke="#3A3A3A"
        strokeWidth={2}
        d="M1.949 12.681 24.764 24.92 48.693 12.68M24.764 50.423V24.92"
      />
      <Path
        stroke="#3A3A3A"
        strokeWidth={2}
        d="m1 18.288 23.765 12.48L49 18.289"
      />
      <Path
        fill="#BC090D"
        stroke="#fff"
        d="M12.703 9.22 33.61 19.775v12.433l4.116-4.758 3.848 2.199V15.97L20.7 5.706 12.703 9.22Z"
      />
      <Path
        fill="#BC090D"
        d="M24.843 57c3.602 0 6.522-3.093 6.522-6.907 0-3.815-2.92-6.908-6.522-6.908-3.601 0-6.521 3.093-6.521 6.907 0 3.815 2.92 6.908 6.521 6.908Z"
      />
      <Path
        stroke="#fff"
        strokeWidth={2}
        d="M24.843 56.232c3.178 0 5.755-2.749 5.755-6.14 0-3.39-2.577-6.14-5.755-6.14s-5.754 2.75-5.754 6.14c0 3.391 2.576 6.14 5.754 6.14Z"
      />
      <Path stroke="#fff" d="m22.474 49.773 1.784 1.95 2.88-3.736" />
    </Svg>
  );
}

export default IconPrimeFreeShipping;
