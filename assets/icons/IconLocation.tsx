import React from 'react';
import Svg, {
  Path,
  type SvgProps,
} from 'react-native-svg';

export default function IconLocation(props: SvgProps) {
  return (
    <Svg width="23" height="23" viewBox="0 0 25 25" fill="none" {...props}>
      <Path
        d="M12.5,25a.5.5,0,0,1-.32-.11C11.81,24.58,3,17.29,3,9.41A9.25,9.25,0,0,1,12.5,0,9.25,9.25,0,0,1,22,9.41c0,7.1-8.79,15.12-9.17,15.46A.5.5,0,0,1,12.5,25Zm0-24A8.18,8.18,0,0,0,4,9.41c0,6.58,6.88,13,8.48,14.42C14.07,22.31,21,15.33,21,9.41A8.18,8.18,0,0,0,12.5,1Zm0,13A4.5,4.5,0,1,1,17,9.5,4.5,4.5,0,0,1,12.5,14Zm0-8A3.5,3.5,0,1,0,16,9.5,3.5,3.5,0,0,0,12.5,6Z"
        fill="currentColor"
      />
    </Svg>
  );
}
