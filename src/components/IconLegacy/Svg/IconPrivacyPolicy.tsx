import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { IconProps } from './IIconProps';

function IconPrivacyPolicy({ color }: IconProps) {
  return (
    <Svg
      width={26}
      height={26}
      viewBox="5 6 32 32"
    >
      <G data-name="Grupo 3157">
        <G data-name="Caminho 747" fill="none" strokeLinecap="round">
          <Path
            d="M2.357 0h8.618c1.3 0 5.525 3.6 5.525 4.812V19.8a2.283 2.283 0 01-2.357 2.2H2.357A2.283 2.283 0 010 19.8V2.2A2.283 2.283 0 012.357 0z"
            transform="translate(.25 .25) translate(8.25 5.014)"
          />
          <Path
            d="M2.357 1C1.61 1 1 1.538 1 2.2v17.6c0 .662.609 1.2 1.357 1.2h11.786c.748 0 1.357-.538 1.357-1.2V4.862c-.1-.298-.786-1.182-2.005-2.221-1.242-1.058-2.24-1.602-2.532-1.641H2.357m0-1h8.618C12.277 0 16.5 3.597 16.5 4.812V19.8c0 1.215-1.055 2.2-2.357 2.2H2.357C1.055 22 0 21.015 0 19.8V2.2C0 .985 1.055 0 2.357 0z"
            fill={color}
            transform="translate(.25 .25) translate(8.25 5.014)"
          />
        </G>
        <Path
          data-name="Caminho 743"
          d="M3.79 17.646h8.913"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeWidth={1}
          transform="translate(.25 .25) translate(8.25 5.014)"
        />
        <Path
          data-name="Caminho 745"
          d="M3.79 10.516h8.913"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeWidth={1}
          transform="translate(.25 .25) translate(8.25 5.014)"
        />
        <Path
          data-name="Caminho 748"
          d="M3.79 6.951h3.944"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeWidth={1}
          transform="translate(.25 .25) translate(8.25 5.014)"
        />
        <Path
          data-name="Caminho 744"
          d="M3.79 14.081h8.913"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeWidth={1}
          transform="translate(.25 .25) translate(8.25 5.014)"
        />
        <Path
          data-name="Caminho 746"
          d="M1885.94 147.823v3.635s-.149 2.552 2.163 2.552h4.55v-1.91a23.209 23.209 0 00-4.55-4.278c-2.503-1.679-2.163.001-2.163.001z"
          transform="translate(.25 .25) translate(8.25 5.014) translate(-1876.585 -147.059)"
          fill={color}
        />
      </G>
    </Svg>
  );
}

export default IconPrivacyPolicy;
