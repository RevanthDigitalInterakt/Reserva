import * as React from 'react';
import { Box } from '../../../components/Box/Box';
import { Typography } from '../../../components/Typography/Typography';
import type { theme } from '../../../base/usereservappLegacy/theme';

export interface IpriceCustom {
  num: number;
  fontFamily: keyof typeof theme.fonts;
  sizeInterger: number;
  sizeDecimal: number;
  negative?: boolean;
  color?: keyof typeof theme.colors;
}
export function PriceCustom({
  num, fontFamily, sizeInterger, sizeDecimal, negative, color = 'preto',
}: IpriceCustom) {
  const integerPart = (numInteger: number) => (numInteger <= 0 ? Math.ceil(numInteger)
    : Math.floor(numInteger));
  const decimalPart = (numDecimal: number) => (`${numDecimal?.toFixed(2)}`)?.split('.')[1];
  return (
    <Box flexDirection="row">
      <Box>
        {negative
          ? (
            <Typography
              color={color}
              fontFamily={fontFamily}
              fontSize={sizeInterger}
            >
              - R$
              {integerPart(num)}
              ,
            </Typography>
          )
          : (
            <Typography
              color={color}
              fontFamily={fontFamily}
              fontSize={sizeInterger}
            >
              R$
              {integerPart(num)}
              ,
            </Typography>
          )}

      </Box>
      <Box alignSelf="flex-start">
        <Typography
          color={color}
          fontFamily={fontFamily}
          fontSize={sizeDecimal}
        >
          {decimalPart(num)}

        </Typography>
      </Box>
    </Box>
  );
}
