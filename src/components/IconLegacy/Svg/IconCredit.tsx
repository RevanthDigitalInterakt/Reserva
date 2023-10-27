import {
  G, Path, Circle,
} from 'react-native-svg';
import React from 'react';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconCredit({ color }: IconProps) {
  return (
    <SvgIcon width="100%" height="100%" viewBox="0 0 18 18">
      <G transform="translate(-20 -683)">
        <G transform="translate(20 683)" fill="none" stroke={color} stroke-width="1">
          <Circle cx="9" cy="9" r="8" stroke={color} />
        </G>
        <Path
          d="M171.52,270.232a.705.705,0,0,1,0-1.411,1.134,1.134,0,0,1,.763.369.705.705,0,1,0,.981-1.014,2.721,2.721,0,0,0-1.039-.65v-.822a.705.705,0,1,0-1.411,0v.827a2.116,2.116,0,0,0,.705,4.111.705.705,0,1,1,0,1.411,1.277,1.277,0,0,1-.916-.534.705.705,0,0,0-1.08.908,2.924,2.924,0,0,0,1.291.919v.823a.705.705,0,1,0,1.411,0v-.827a2.116,2.116,0,0,0-.705-4.111Zm0,0"
          transform="translate(-142.496 421.063)"
          fill={color}
        />
      </G>
    </SvgIcon>
  );
}

export default IconCredit;
