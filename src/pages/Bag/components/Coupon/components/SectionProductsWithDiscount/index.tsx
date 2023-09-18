import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useBagCouponItemsWithDiscount } from '../../../../../../zustand/useBagCouponItemsWithDiscount/useBagCouponItemsWithDiscount';
import { useBagStore } from '../../../../../../zustand/useBagStore/useBagStore';

import styles from './SectionProductsWithDiscount.styles';

type TProductData = {
  id: string;
  productName: string;
};

export default function SectionProductsWithDiscount() {
  const { setShowModalItems, productItems } = useBagCouponItemsWithDiscount(['setShowModalItems', 'productItems']);
  const { marketingData } = useBagStore(['marketingData']);

  const newArr: TProductData[] = productItems.slice(0, 2);

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionContent}>
        <Text style={[styles.sectionTitle, { fontSize: 16 }]}>O desconto </Text>
        <Text style={[styles.sectionTitle, { fontWeight: 'bold', fontSize: 14 }]}>foi aplicado </Text>
        <Text style={[styles.sectionTitle, { fontSize: 16 }]}>aos seguintes itens:</Text>
      </View>

      {newArr.map((item, index) => (
        <View key={item.id}>
          <View
            style={[styles.sectionItemContainer, {
              borderColor: index > 0 ? '#bbbbbb' : '#D7D7D7',
              opacity: index > 0 ? 0.6 : 1,
            }]}
          >
            <View
              style={[styles.sectionItemContent, {
                backgroundColor: index > 0 ? '#bbbbbb' : '#e5e5e5',
              }]}
            />
            <Text
              numberOfLines={1}
              style={styles.sectionItemTitle}
            >
              {item.productName}
            </Text>
          </View>
        </View>
      ))}

      <LinearGradient
        colors={['rgba(255, 255, 255, 0.5)', '#fff', '#fff']}
        style={styles.sectionGradientContainer}
      >
        <TouchableOpacity
          style={styles.sectionActionButtonContainer}
          onPress={() => setShowModalItems(true)}
        >
          <Text style={styles.sectionActionButtonText}>Veja Mais</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}
