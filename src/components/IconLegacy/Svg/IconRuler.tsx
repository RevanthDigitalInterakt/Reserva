import * as React from 'react';
import {
  G, Path,
} from 'react-native-svg';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconRuler({ color }: IconProps) {
  return (
    <SvgIcon width="100%" height="100%" viewBox="0 0 36.856 36.856">
      <G data-name="Grupo 1599">
        <G data-name="Grupo 1598">
          <Path
            data-name="Caminho 298"
            d="M25.9 6.834L19.227.163a.556.556 0 00-.787 0L.163 18.44a.556.556 0 000 .787L6.834 25.9a.556.556 0 00.787 0L25.9 7.621a.556.556 0 000-.787zM7.225 24.714l-5.878-5.878 4.415-4.416 2 2a.557.557 0 00.8-.776l-.011-.011-2-2 1.457-1.457 3.126 3.126a.559.559 0 00.787-.793l-3.128-3.12 1.457-1.457 2 2a.557.557 0 00.787-.787l-2-2 1.457-1.457 3.126 3.126a.557.557 0 10.787-.787L13.282 6.9l1.457-1.457 2 2a.557.557 0 10.793-.782l-.006-.006-1.984-2.015L17 3.183l3.126 3.126a.557.557 0 10.787-.787L17.786 2.4l1.049-1.049 5.878 5.878z"
            fill={color}
            transform="rotate(-135 16.847 14.611)"
          />
        </G>
      </G>
      <G data-name="Grupo 1601">
        <G data-name="Grupo 1600">
          <Path
            data-name="Caminho 299"
            d="M85.608 322.473a1.792 1.792 0 100 2.534 1.8 1.8 0 000-2.534zm-.731 1.731a.064.064 0 01-.061.022.679.679 0 110-.96.659.659 0 01.06.934z"
            transform="rotate(-135 16.847 14.611) translate(4.608 17.972) translate(-82.55 -321.95)"
            fill={color}
          />
        </G>
      </G>
    </SvgIcon>
  );
}

export default IconRuler;
