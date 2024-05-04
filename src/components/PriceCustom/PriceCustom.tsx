import * as React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { scale } from '../../utils/scale';

export interface IPriceCustom {
  num: number;
  fontFamily?: string;
  sizeInteger: number;
  sizeDecimal: number;
  negative?: boolean;
  color?: string;
  lineThroughInteger?: boolean;
  lineThroughDecimal?: boolean;
  lineHeight?: number;
}
export function PriceCustom({
  num,
  sizeInteger,
  sizeDecimal,
  negative,
  fontFamily,
  color,
  lineThroughInteger,
  lineThroughDecimal,
  lineHeight,
}: IPriceCustom) {
  const integerPart = (numInteger: number) => (numInteger <= 0 ? Math.ceil(numInteger)
    : Math.floor(numInteger));
  const decimalPart = (numDecimal: number) => (`${numDecimal?.toFixed(2)}`)?.split('.')[1];
  return (
    <View
      style={{ flexDirection: 'row' }}
    >
      <View>
        {negative
          ? (
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  fontSize: scale(sizeInteger),
                  fontFamily,
                  color,
                  lineHeight,
                }}
              >
                - R$
                {' '}
              </Text>
              <Text style={{
                fontSize: scale(sizeInteger),
                fontFamily,
                color,
                textDecorationLine: lineThroughInteger ? 'line-through' : 'none',
                lineHeight,
              }}
              >
                {integerPart(num)}
              </Text>
              <Text style={{
                fontSize: scale(sizeInteger),
                fontFamily,
                color,
                lineHeight,
              }}
              >
                ,
              </Text>
            </View>
          )
          : (
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  fontSize: scale(sizeInteger),
                  fontFamily,
                  color,
                  lineHeight,
                }}
              >
                R$
                {' '}
              </Text>
              <Text style={{
                fontSize: scale(sizeInteger),
                fontFamily,
                color,
                textDecorationLine: lineThroughInteger ? 'line-through' : 'none',
                lineHeight,
              }}
              >
                {integerPart(num)}
              </Text>
              <Text style={{
                fontSize: scale(sizeInteger),
                fontFamily,
                color,
                lineHeight,
              }}
              >
                ,
              </Text>
            </View>
          )}
      </View>
      <View style={{ alignSelf: 'flex-start' }}>
        <Text
          style={{
            fontSize: scale(sizeDecimal),
            fontFamily,
            color,
            textDecorationLine: lineThroughDecimal ? 'line-through' : 'none',
          }}
        >
          {decimalPart(num)}
        </Text>
      </View>
    </View>
  );
}
