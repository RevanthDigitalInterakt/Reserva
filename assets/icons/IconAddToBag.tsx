import React from 'react';
import Svg, {
  Path,
  type SvgProps,
} from 'react-native-svg';

export default function IconAddToBag(props: SvgProps) {
  return (
    <Svg width="18" height="19" viewBox="0 0 18 19" fill="none" {...props}>
      <Path
        d="M8.81665 9.03309V11.6255M8.81665 11.6255V14.218M8.81665 11.6255H6.31199M8.81665 11.6255H11.3213M5.81106 6.95914V3.64881C5.81106 3.01067 6.41218 0.737305 8.81665 0.737305C11.2211 0.737305 11.8222 3.01067 11.8222 3.64881V6.95914M15.0945 6.67956L16.4729 15.9529C16.6618 17.2239 15.6771 18.3659 14.3921 18.3659H3.24119C1.95622 18.3659 0.971489 17.2239 1.16041 15.9529L2.53877 6.67956C2.69202 5.64853 3.57719 4.8852 4.61956 4.8852H13.0137C14.0561 4.8852 14.9413 5.64853 15.0945 6.67956Z"
        stroke="white"
        strokeWidth="1.26219"
        strokeLinecap="round"
      />
    </Svg>
  );
}
