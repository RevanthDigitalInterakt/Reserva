import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useBagCouponItemsWithDiscount } from '../../../../zustand/useBagCouponItemsWithDiscount/useBagCouponItemsWithDiscount';
import { useBagStore } from '../../../../zustand/useBagStore/useBagStore';

import styles from './SectionProductsWithDiscount.styles';
import { COLORS } from '../../../../base/styles/colors';

export default function SectionProductsWithDiscount() {
  const { setShowModalItems } = useBagCouponItemsWithDiscount(['setShowModalItems']);
  const { marketingData, appTotalizers } = useBagStore(['marketingData', 'appTotalizers']);

  const hasEmpty = marketingData?.itemsWithCouponDiscount
  && appTotalizers.discount !== 0
  && marketingData?.itemsWithCouponDiscount.length > 0

  return (
    <View>
      {hasEmpty && (
        <View style={styles.sectionContainer}>
          <View style={styles.sectionContent}>
            <Text style={[styles.sectionTitle, { fontSize: 16 }]}>O desconto </Text>
            <Text style={[styles.sectionTitle, { fontWeight: 'bold', fontSize: 14 }]}>foi aplicado </Text>
            <Text style={[styles.sectionTitle, { fontSize: 16 }]}>aos seguintes itens:</Text>
          </View>
          {marketingData?.itemsWithCouponDiscount.slice(0, 2).map((item, index) => (
            <View key={item.id}>
              <View
                style={[styles.sectionItemContainer, {
                  borderColor: index > 0 ? COLORS.ITEM_BORDER : COLORS.DIVIDER,
                  opacity: index > 0 ? 0.6 : 1,
                }]}
              >
                <Image
                  style={[styles.sectionItemContent]}
                  source={{ uri: item.imageSource }}
                  resizeMode="contain"
                />
                <Text
                  numberOfLines={1}
                  style={styles.sectionItemTitle}
                >
                  {item.name}
                </Text>
              </View>
            </View>
          ))}

          <LinearGradient
            colors={[COLORS.GRADIENT_COLOR, COLORS.WHITE, COLORS.WHITE]}
            style={[styles.sectionGradientContainer,
              {
                top: marketingData?.itemsWithCouponDiscount.length > 2 ? 115 : 60
              }
            ]}
          >
            <TouchableOpacity
              style={styles.sectionActionButtonContainer}
              onPress={() => setShowModalItems(true)}
            >
              <Text style={styles.sectionActionButtonText}>Veja Mais</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

      )}
    </View>
  );
}
