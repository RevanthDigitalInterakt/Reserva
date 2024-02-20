import React from 'react';
import { View, FlatList } from 'react-native';
import { styles } from './HomeShowcase.styles';
import Shelf from '../HomeShowcaseShelf/HomeShowcaseShelf';

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
  products: IRsvProduct[];
}

export function HomeShowcase() {
  const data: IRsvRecommendation[] = [
    {
      shelfName: 'Vitrine de teste da SmartHint estou testanto o tamanho dela',
      products: [
        {
          productName: 'Camisa Polo Reserva Linho Braco',
          productId: '1',
          productLink: 'https://usereserva.com/camisa/p',
          brand: 'RESERVA',
          image: 'https://lojausereserva.vtexassets.com/arquivos/ids/8409628-400-600',
          categoryTree: ['Camisas'],
          flags: [
            { type: 'savings', value: 20 },
            { type: 'cashback', value: 15 },
          ],
          sku: [
            {
              colorHex: '#FFF',
              colorName: 'BRANCO',
              colorRefId: '5678',
              sizes: [{ skuId: '5678', value: 'P', disabled: false }],
            },
          ],
          prices: { listPrice: 600.90, salePrice: 400.50 },
        },
        {
          productName: 'Camisa Polo Reserva Linho Braco',
          productId: '1',
          productLink: 'https://usereserva.com/camisa/p',
          brand: 'RESERVA',
          image: 'https://lojausereserva.vtexassets.com/arquivos/ids/8409628-400-600',
          categoryTree: ['Camisas'],
          flags: [
            { type: 'savings', value: 20 },
            { type: 'cashback', value: 15 },
          ],
          sku: [
            {
              colorHex: '#FFF',
              colorName: 'BRANCO',
              colorRefId: '5678',
              sizes: [{ skuId: '5678', value: 'P', disabled: false }],
            },
          ],
          prices: { listPrice: 600.90, salePrice: 400.50 },
        },
        {
          productName: 'Camisa Polo Reserva Linho Braco',
          productId: '1',
          productLink: 'https://usereserva.com/camisa/p',
          brand: 'RESERVA',
          image: 'https://lojausereserva.vtexassets.com/arquivos/ids/8409628-400-600',
          categoryTree: ['Camisas'],
          flags: [
            { type: 'savings', value: 20 },
          ],
          sku: [
            {
              colorHex: '#FFF',
              colorName: 'BRANCO',
              colorRefId: '5678',
              sizes: [{ skuId: '5678', value: 'P', disabled: false }],
            },
          ],
          prices: { listPrice: 600.90, salePrice: 400.50 },
        },
        {
          productName: 'Camisa Polo Reserva Linho Braco',
          productId: '1',
          productLink: 'https://usereserva.com/camisa/p',
          brand: 'RESERVA',
          image: 'https://lojausereserva.vtexassets.com/arquivos/ids/8409628-400-600',
          categoryTree: ['Camisas'],
          flags: [],
          sku: [
            {
              colorHex: '#FFF',
              colorName: 'BRANCO',
              colorRefId: '5678',
              sizes: [{ skuId: '5678', value: 'P', disabled: false }],
            },
          ],
          prices: { listPrice: 600.90, salePrice: 0 },
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Shelf dataShelf={item} />}
        keyExtractor={(item, index) => item.shelfName + index.toString()}
      />
    </View>
  );
}
