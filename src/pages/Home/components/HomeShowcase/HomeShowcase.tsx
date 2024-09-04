import React, { useEffect, useMemo, useState } from 'react';
import { View, FlatList } from 'react-native';
import { styles } from './HomeShowcase.styles';
import Shelf from '../HomeShowcaseShelf/HomeShowcaseShelf';
import useSearchStore, { SearchType } from '../../../../zustand/useSearchStore';
import { generateFacets } from '../../../../utils/generateFacets';
import { useHomeStore } from '../../../../zustand/useHomeStore';
import { getShelfData } from '../../../../utils/getShelfData';
import { sliceData } from '../../../../utils/sliceData';

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
  id: string;
}

export function HomeShowcase() {
  const {
    onSearch,
    result,
    onInit,
    shelf,
  } = useSearchStore([
    'onSearch',
    'result',
    'onInit',
    'shelf',
  ]);

  const { shelfOffers } = useHomeStore(['shelfOffers']);

  const defaultFacets = useMemo(() => generateFacets({
    reference: shelfOffers.shelfProductsTop,
  }), []);

  const shelfReference = useMemo(() => generateFacets({
    reference: shelfOffers.shelfProductsBottom,
  }), []);

  const [payload, setPayload] = useState<IRsvRecommendation[]>([]);

  useEffect(() => {
    if (result && result.length > 0) {
      const shelfTop = getShelfData(result);
      const shelfBottom = getShelfData(shelf);

      const shelfSliced = sliceData(shelfBottom, 6);
      const arrSliced = sliceData(shelfTop, 6);

      const shelfInfo = [
        {
          shelfTitle: shelfOffers.shelfTitle,
          shelfName: shelfOffers.shelfSubtitleTop,
          products: arrSliced,
          id: shelfOffers.shelfProductsTop,
        },
        {
          shelfTitle: '',
          shelfName: shelfOffers.shelfSubtitleBottom,
          products: shelfSliced,
          id: shelfOffers.shelfProductsBottom,
        },
      ];

      setPayload(shelfInfo);
    }
  }, [result]);

  useEffect(() => {
    onInit(SearchType.CATALOG);
    onSearch({
      facets: defaultFacets,
    }, undefined, { facets: shelfReference });
  }, [onInit, onSearch]);

  return (
    <View style={styles.container}>
      <FlatList
        data={payload}
        renderItem={({ item }) => (
          <Shelf dataShelf={item} />
        )}
        keyExtractor={(item, index) => item.shelfName + index.toString()}
      />
    </View>
  );
}
