import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { styles } from './ProductThumbColorsRow.styles';

interface IProductThumbColors {
  identifier: string;
  colors: string[];
  limit?: number;
}

function ProductThumbColorsRow({ identifier, colors, limit = 4 }: IProductThumbColors) {
  const items = useMemo(() => Array.from(new Set(colors)), [colors]);

  if (!items.length) return null;

  return (
    <View style={styles.wrapper}>
      {items.map((item, i) => (i < limit) && (
        <View
          key={`colorthumb-${identifier}-${item}`}
          style={[styles.circleContainer, { backgroundColor: item }]}
        >
          <View style={[styles.circle, { backgroundColor: item }]} />
        </View>
      ))}

      {(items.length > limit) && (
        <Text style={styles.text} allowFontScaling={false}>{`+${items.length - limit}`}</Text>
      )}
    </View>
  );
}

export default ProductThumbColorsRow;
