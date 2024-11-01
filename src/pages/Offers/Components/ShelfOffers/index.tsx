import React from 'react';
import { View } from 'react-native';
import WrapperShelf from './WrapperShelf';
import { useShelfOffersStore } from '../../../../zustand/useShelfOffersStore/useShelfOffersStore';

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

export function ShelfOffers() {
  const { shelfInfo } = useShelfOffersStore(['shelfInfo']);

  return (
    <View>
      {
        shelfInfo?.map((item) => (<WrapperShelf dataShelf={item} key={`shelf-${item.id}-${item.shelfName}`} />))
      }
    </View>
  );
}
