import React from 'react';
import {
  View, FlatList,
} from 'react-native';
import { styles } from './HomeShowcase.styles';
import Shelf from '../HomeShowcaseShelf/HomeShowcaseShelf';

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

export interface IShelf {
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
