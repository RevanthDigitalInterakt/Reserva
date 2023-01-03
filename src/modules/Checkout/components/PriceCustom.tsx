import * as React from 'react';
import {
  Typography,
  Box,
  theme,
} from '@usereservaapp/reserva-ui';

export interface IpriceCustom {
  num: number;
  fontFamily: keyof typeof theme.fonts;
  sizeInterger: number;
  sizeDecimal: number;
  negative?: boolean;
  color?: keyof typeof theme.colors;
}
export const PriceCustom: React.FC<IpriceCustom> = ({
  num, fontFamily, sizeInterger, sizeDecimal, negative, color = 'preto',
}) => {
  const integerPart = (num: number) => Math.floor(num);
  const decimalPart = (num: number) => (`${num.toFixed(2)}`).split('.')[1];
  return (
    <Box flexDirection="row">
      <Box>
        {negative
          ? (
            <Typography color={color} fontFamily={fontFamily} fontSize={sizeInterger}>
              - R$
              {integerPart(num)}
              ,
            </Typography>
          )
          : (
            <Typography color={color} fontFamily={fontFamily} fontSize={sizeInterger}>
              R$
              {integerPart(num)}
              ,
            </Typography>
          )}

      </Box>
      <Box alignSelf="flex-start">
        <Typography color={color} fontFamily={fontFamily} fontSize={sizeDecimal}>{decimalPart(num)}</Typography>
      </Box>
    </Box>
  );
};
