import * as React from 'react';
import Svg,
{
  G,
  Path,
  Defs,
  ClipPath,
  type SvgProps,
} from 'react-native-svg';

function ArrowBack(props: SvgProps) {
  return (
    <Svg
      width={17}
      height={16}
      viewBox="0 0 17 16"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_1834_506)">
        <Path
          d="M2.333 7.333a.667.667 0 000 1.334V7.333zm13.805 1.138a.667.667 0 000-.942l-4.243-4.243a.667.667 0 00-.942.943l3.77 3.77-3.77 3.772a.667.667 0 00.943.943l4.242-4.243zm-13.805.196h13.334V7.333H2.333v1.334z"
          fill="#848484"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1834_506">
          <Path
            fill="#fff"
            transform="rotate(180 8.5 8)"
            d="M0 0H16.0994V16H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default ArrowBack;
