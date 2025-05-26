import React from 'react';
import Svg, {
  Circle,
  Path,
  SvgProps,
} from 'react-native-svg';

export default function IconGreenCheckMark(props: SvgProps) {
  return (
    <Svg width="12" height="12" viewBox="0 0 12 12" fill="none" {...props}>
      <Circle cx="6" cy="6" r="5.5" fill="#38A138" stroke="#38A138" />
      <Path d="M4.74984 7.74998L2.99984 5.99998L2.4165 6.58331L4.74984 8.91665L9.74984 3.91665L9.1665 3.33331L4.74984 7.74998Z" fill="white" />
    </Svg>
  );
}
