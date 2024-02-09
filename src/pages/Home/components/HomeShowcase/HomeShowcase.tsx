import React from 'react';
import {
  View, FlatList, Text,
} from 'react-native';
import { styles } from './HomeShowcase.styles';
import { HomeShowcaseCards } from '../HomeShowcaseCards/HomeShowcaseCards';

interface IFlag {
  type: string;
  value?: number;
  text?: string;
}

interface ISize {
  value: string;
  disabled: boolean;
}

interface IPrice {
  listPrice: number;
  salePrice: number;
}

interface IColor {
  name: string;
  hex: string;
  disabled?: boolean;
  sizes: ISize[];
}

interface ISku {
  skuId: string;
  colors: IColor[];
}

interface IProduct {
  productName: string;
  productId: string;
  productLink: string;
  brand: string;
  image: string;
  categoryTree: string[];
  flags: IFlag[];
  sku: ISku[];
  prices: IPrice;
}

interface IShelf {
  shelfName: string;
  products: IProduct[];
}

export function HomeShowcase() {
  const data: IShelf[] = [
    {
      shelfName: 'Vitrine de teste da SmartHint estou testanto o tamanho dela',
      products: [
        {
          productName: 'Camisa Polo Reserva Linho Braco',
          productId: '1',
          productLink: 'https://usereserva.com/camisa/p',
          brand: 'RESERVA',
          image: 'https://lojausereserva.vtexassets.com/arquivos/ids/8409628-400-600',
          categoryTree: [
            'Camisas',
          ],
          flags: [
            {
              type: 'savings',
              value: 20,
            },
            {
              type: 'cashback',
              value: 15,
            },
          ],
          sku: [{
            skuId: '5678',
            colors: [
              {
                name: 'BRANCO',
                hex: '#FFF',
                disabled: false,
                sizes: [
                  {
                    value: 'P',
                    disabled: false,
                  },
                ],
              },
            ],
          }],
          prices: {
            listPrice: 600.90,
            salePrice: 400.50,
          },
        },
        {
          productName: 'Camisa Braca',
          productId: '2',
          productLink: 'https://usereserva.com/camisa/p',
          brand: 'RESERVA',
          image: 'https://lojausereserva.vtexassets.com/arquivos/ids/8409628-400-600',
          categoryTree: [
            'Camisas',
          ],
          flags: [
            {
              type: 'savings',
              value: 15,
            },
            {
              type: 'cashback',
              value: 10,
            },
          ],
          sku: [{
            skuId: '5679',
            colors: [
              {
                name: 'BRANCO',
                hex: '#FFF',
                disabled: false,
                sizes: [
                  {
                    value: 'P',
                    disabled: false,
                  },
                ],
              },
            ],
          }],
          prices: {
            listPrice: 600.00,
            salePrice: 400.00,
          },
        },
        {
          productName: 'Camisa Azul',
          productId: '3',
          productLink: 'https://usereserva.com/camisa/p',
          brand: 'RESERVA',
          image: 'https://lojausereserva.vtexassets.com/arquivos/ids/8409628-400-600',
          categoryTree: [
            'Camisas',
          ],
          flags: [
            {
              type: 'savings',
              value: 25,
            },
            {
              type: 'cashback',
              value: 15,
            },
          ],
          sku: [{
            skuId: '5679',
            colors: [
              {
                name: 'BRANCO',
                hex: '#FFF',
                disabled: false,
                sizes: [
                  {
                    value: 'P',
                    disabled: false,
                  },
                ],
              },
            ],
          }],
          prices: {
            listPrice: 600.00,
            salePrice: 400.00,
          },
        },
        {
          productName: 'Camisa Verde',
          productId: '4',
          productLink: 'https://usereserva.com/camisa/p',
          brand: 'RESERVA',
          image: 'https://lojausereserva.vtexassets.com/arquivos/ids/8409628-400-600',
          categoryTree: [
            'Camisas',
          ],
          flags: [
          ],
          sku: [{
            skuId: '5679',
            colors: [
              {
                name: 'BRANCO',
                hex: '#FFF',
                disabled: false,
                sizes: [
                  {
                    value: 'P',
                    disabled: false,
                  },
                ],
              },
            ],
          }],
          prices: {
            listPrice: 600.00,
            salePrice: 0,
          },
        },
      ],
    },
  ];

  const renderItem = ({ item }: { item: IShelf }) => (
    <View style={styles.shelfContainer}>
      <View style={styles.shelf}>
        <Text style={styles.shelfName}>{item.shelfName}</Text>
      </View>
      <HomeShowcaseCards products={item.products} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.shelfName + index.toString()}
      />
    </View>
  );
}
