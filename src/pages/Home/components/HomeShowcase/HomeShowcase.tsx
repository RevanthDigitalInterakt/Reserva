import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './HomeShowcase.styles';
import Shelf from '../HomeShowcaseShelf/HomeShowcaseShelf';
import useRecommendationShelf from '../../../../zustand/useRecommendation/useRecommendationShelf';
import type { IRecommendationShelfState } from '../../../../zustand/useRecommendation/types/recommendationShelf';

export interface IRsvFlag {
  type: string;
  value?: number;
  text?: string;
}

export interface IRsvPrice {
  listPrice: number;
  salePrice: number;
}

export interface IRsvSize {
  skuId: string;
  value: string;
  disabled: boolean;
}

export interface IRsvSku {
  colorHex: string;
  colorName: string;
  colorRefId: string;
  sizes: IRsvSize[];
}

export interface IRsvProduct {
  productName: string;
  productId: string;
  productLink: string;
  brand: string;
  image: string;
  categoryTree: string[];
  flags: IRsvFlag[];
  sku: IRsvSku[];
  prices: IRsvPrice;
}

export interface IRsvRecommendation {
  shelfName: string;
  shelfTitle: string;
  products: IRsvProduct[];
}

export function HomeShowcase() {
  const { onSearchShelf } = useRecommendationShelf() as IRecommendationShelfState;
  const [shelf, setShelf] = useState<IRsvRecommendation[]>([]);

  useEffect(() => {
    async function handleGetShelf() {
      const user = await AsyncStorage.getItem('@Dito:anonymousID');
      const data = await onSearchShelf(user || '');
      setShelf(data as IRsvRecommendation[]);
    }
    handleGetShelf();
  }, [onSearchShelf]);

  return (
    <View style={styles.container}>
      <FlatList
        data={shelf}
        renderItem={({ item }) => <Shelf dataShelf={item} />}
        keyExtractor={(item, index) => item.shelfTitle + index.toString()}
      />
    </View>
  );
}
