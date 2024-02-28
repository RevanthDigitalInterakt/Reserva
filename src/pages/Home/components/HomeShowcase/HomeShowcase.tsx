import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
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
  name: string;
  price: number;
}

export function HomeShowcase() {
  const data: IData[] = [
    {
      id: '1',
      image: 'https://lojausereserva.vtexassets.com/arquivos/ids/8409628-400-600',
      name: 'Camisa Reserva Linho',
      price: 84,
    },
    {
      id: '2',
      image: 'https://lojausereserva.vtexassets.com/arquivos/ids/8409628-400-600',
      name: 'Camisa Reserva Linho',
      price: 84,
    },
    {
      id: '3',
      image: 'https://lojausereserva.vtexassets.com/arquivos/ids/8409628-400-600',
      name: 'Camisa Reserva Linho',
      price: 84,
    },
    {
      id: '4',
      image: 'https://lojausereserva.vtexassets.com/arquivos/ids/8409628-400-600',
      name: 'Camisa Reserva Linho',
      price: 84,
    },
    {
      id: '5',
      image: 'https://lojausereserva.vtexassets.com/arquivos/ids/8409628-400-600',
      name: 'Camisa Reserva Linho',
      price: 84,
    },
    {
      id: '6',
      image: 'https://lojausereserva.vtexassets.com/arquivos/ids/8409628-400-600',
      name: 'Camisa Reserva Linho',
      price: 84,
    },
  ];

  const renderItem = (item: IData) => (
    <TouchableOpacity
      style={{ padding: 10 }}
      onPress={
        () => trackClickSmartHintStore.getState().onSendTrackClick(item.id, TrackPageTypeEnum.Home)
      }
    >
      <Image
        source={{ uri: item.image }}
        style={{
          width: 150,
          height: 200,
        }}
      />
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={shelf}
        renderItem={({ item }) => <Shelf dataShelf={item} />}
        keyExtractor={(item, index) => item.shelfName + index.toString()}
      />
    </View>
  );
}
