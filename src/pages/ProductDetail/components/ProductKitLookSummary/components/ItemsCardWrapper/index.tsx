import React, { useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Box } from '../../../../../../components/Box/Box';
import styles from '../styles';
import ImageComponent from '../../../../../../components/ImageComponent/ImageComponent';
import { PriceCustom } from '../../../../../../modules/Checkout/components/PriceCustom';
import IconComponent from '../../../../../../components/IconComponent/IconComponent';

import { useProductDetailStore } from '../../../../../../zustand/useProductDetail/useProductDetail';

import { RadioButtons } from '../RadioButtons';
import { ColorsButtons } from '../ColorsButtons';
import ItemsCard from '../ItemsCard';

function ItemsCardWrapper() {
  const [selectedItem, setSelectedItem] = useState(false);

  const {
    productDetail,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    kit,
  } = useProductDetailStore([
    'productDetail',
    'selectedSize',
    'setSelectedSize',
    'selectedColor',
    'setSelectedColor',
    'kit',
  ]);

  const disabledSizes = useMemo(() => (
    (selectedColor?.sizes || []).filter((item) => item.disabled).map((item) => item.size || '')
  ), [selectedColor]);

  const sizes: string[] = useMemo(() => (
    (selectedColor?.sizes || []).map((item) => item.size || '')
  ), [selectedColor]);

  if (!productDetail) return null;

  return (
    <View>
      {kit?.map((item) => (
        <ItemsCard key={item.productId} item={item} />
      ))}
    </View>
  );
}

export default ItemsCardWrapper;
