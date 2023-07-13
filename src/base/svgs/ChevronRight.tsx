import React from 'react';
import { SvgCss } from 'react-native-svg';

const xml = `<svg width="9" height="13" viewBox="0 0 9 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.5 11.8379L1.72022 13L8.5 6.5L1.71337 5.93306e-07L0.499999 1.16212L6.07326 6.5L0.5 11.8379Z" fill="#333333"/>
</svg>`;

export default function ChevronRight({ style = {} }) {
  return <SvgCss style={style} xml={xml} />;
}
