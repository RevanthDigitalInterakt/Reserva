import React from 'react';
import { View } from 'react-native';
import { Skeleton } from '../../../../modules/Checkout/components/Skeleton';
import styles from './styles';

export interface ISkeleton {
  loading?: boolean;
}

export function SkeletonWrapper() {
  const skeletonBannerOffers = ({ loading }: ISkeleton) => {
    if (loading) {
      return (
        <Skeleton>
          <View style={styles.mainCarousel} />
        </Skeleton>
      );
    }
    return null;
  };

  const skeletonBannerCategoryOffers = ({ loading }: ISkeleton) => {
    if (loading) {
      const arrayCards = [0, 1, 2, 3, 4, 5, 6, 7];
      return (
        <Skeleton>
          <View style={styles.categoryTitle} />

          <View style={styles.containerCards}>
            {arrayCards.map((key: number) => (
              <View key={key} style={styles.categoryCard} />
            ))}
          </View>
        </Skeleton>
      );
    }
    return null;
  };

  const skeletonShelfOffers = ({ loading }: ISkeleton) => {
    if (loading) {
      const arrayCards = [0, 1, 2];
      return (
        <Skeleton>
          <View style={styles.shelfTitle} />
          <View style={styles.shelfSubtitle} />
          <View style={styles.containerProducts}>
            {arrayCards.map((key: number) => (
              <View key={key}>
                <View style={styles.productCard} />
                <View style={styles.productTitle} />
                <View style={styles.productPrice} />
              </View>
            ))}
          </View>

          <View style={styles.shelfBottomSubtitle} />
          <View style={styles.containerProducts}>
            {arrayCards.map((key: number) => (
              <View key={key}>
                <View style={styles.productCard} />
                <View style={styles.productTitle} />
                <View style={styles.productPrice} />
              </View>
            ))}
          </View>
        </Skeleton>
      );
    }
    return null;
  };

  return {
    skeletonBannerOffers,
    skeletonBannerCategoryOffers,
    skeletonShelfOffers,
  };
}
