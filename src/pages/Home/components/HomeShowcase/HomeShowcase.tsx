import React from 'react';
import {
  View, FlatList, Text, Image, TouchableOpacity,
} from 'react-native';
import { trackClickSmartHintStore } from '../../../../zustand/useTrackClickSmartHint/useTrackClickSmartHint';
import { TrackPageTypeEnum } from '../../../../base/graphql/generated';

interface ICategoryTree {
  id: number;
  name: string;
}

/* interface IFlag {
  type: string;
  value: string;
  src?: string;
} */

interface ISize {
  value: string;
  disabled: boolean;
  prices: {
    listPrice: number;
    salePrice: number;
    primePrice: number;
  };
}

interface IColor {
  name: string;
  hex: string;
  disabled: boolean;
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
  categoryTree: ICategoryTree[];
  // flags: IFlag[];
  sku: ISku;
}

interface IShelf {
  shelfName: string;
  products: IProduct[];
}

export function HomeShowcase() {
  const data: IShelf[] = [
    {
      shelfName: 'Vitrine',
      products: [
        {
          productName: 'Camisa Reserva Linho 12345',
          productId: '1',
          productLink: 'https://usereserva.com/camisa/p',
          brand: 'RESERVA',
          image: 'https://lojausereserva.vtexassets.com/arquivos/ids/8409628-400-600',
          categoryTree: [
            {
              id: 5,
              name: 'Camisas',
            },
          ],
          sku: {
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
                    prices: {
                      listPrice: 600.90,
                      salePrice: 400.50,
                      primePrice: 300,
                    },
                  },
                ],
              },
            ],
          },
        },
        {
          productName: 'Calça Jeans',
          productId: '2',
          productLink: 'https://usereserva.com/calca/p',
          brand: 'RESERVA',
          image: 'https://lojausereserva.vtexassets.com/arquivos/ids/8409628-400-600',
          categoryTree: [
            {
              id: 6,
              name: 'Calças',
            },
          ],
          sku: {
            skuId: '5679',
            colors: [
              {
                name: 'AZUL',
                hex: '#00F',
                disabled: false,
                sizes: [
                  {
                    value: 'M',
                    disabled: false,
                    prices: {
                      listPrice: 800,
                      salePrice: 0,
                      primePrice: 500,
                    },
                  },
                ],
              },
            ],
          },
        },
        {
          productName: 'Tênis Esportivo',
          productId: '3',
          productLink: 'https://usereserva.com/tenis/p',
          brand: 'RESERVA',
          image: 'https://lojausereserva.vtexassets.com/arquivos/ids/8409628-400-600',
          categoryTree: [
            {
              id: 7,
              name: 'Tênis',
            },
          ],
          sku: {
            skuId: '5680',
            colors: [
              {
                name: 'PRETO',
                hex: '#000',
                disabled: false,
                sizes: [
                  {
                    value: '42',
                    disabled: false,
                    prices: {
                      listPrice: 1200,
                      salePrice: 1000,
                      primePrice: 800,
                    },
                  },
                ],
              },
            ],
          },
        },
        {
          productName: 'Bermuda Cargo',
          productId: '4',
          productLink: 'https://usereserva.com/bermuda/p',
          brand: 'RESERVA',
          image: 'https://lojausereserva.vtexassets.com/arquivos/ids/8409628-400-600',
          categoryTree: [
            {
              id: 8,
              name: 'Bermudas',
            },
          ],
          sku: {
            skuId: '5681',
            colors: [
              {
                name: 'VERDE',
                hex: '#0F0',
                disabled: false,
                sizes: [
                  {
                    value: 'L',
                    disabled: false,
                    prices: {
                      listPrice: 700,
                      salePrice: 500,
                      primePrice: 400,
                    },
                  },
                ],
              },
            ],
          },
        },
        {
          productName: 'Jaqueta de Couro',
          productId: '5',
          productLink: 'https://usereserva.com/jaqueta/p',
          brand: 'RESERVA',
          image: 'https://lojausereserva.vtexassets.com/arquivos/ids/8409628-400-600',
          categoryTree: [
            {
              id: 9,
              name: 'Jaquetas',
            },
          ],
          sku: {
            skuId: '5682',
            colors: [
              {
                name: 'PRETA',
                hex: '#000',
                disabled: false,
                sizes: [
                  {
                    value: 'M',
                    disabled: false,
                    prices: {
                      listPrice: 1500,
                      salePrice: 1200,
                      primePrice: 1000,
                    },
                  },
                ],
              },
            ],
          },
        },
        {
          productName: 'Sapato Social',
          productId: '6',
          productLink: 'https://usereserva.com/sapato/p',
          brand: 'RESERVA',
          image: 'https://lojausereserva.vtexassets.com/arquivos/ids/8409628-400-600',
          categoryTree: [
            {
              id: 10,
              name: 'Sapatos',
            },
          ],
          sku: {
            skuId: '5683',
            colors: [
              {
                name: 'MARROM',
                hex: '#8B4513',
                disabled: false,
                sizes: [
                  {
                    value: '41',
                    disabled: false,
                    prices: {
                      listPrice: 1000,
                      salePrice: 800,
                      primePrice: 700,
                    },
                  },
                ],
              },
            ],
          },
        },
        {
          productName: 'Polo Casual',
          productId: '7',
          productLink: 'https://usereserva.com/polo/p',
          brand: 'RESERVA',
          image: 'https://lojausereserva.vtexassets.com/arquivos/ids/8409628-400-600',
          categoryTree: [
            {
              id: 11,
              name: 'Polos',
            },
          ],
          sku: {
            skuId: '5684',
            colors: [
              {
                name: 'AZUL',
                hex: '#00F',
                disabled: false,
                sizes: [
                  {
                    value: 'M',
                    disabled: false,
                    prices: {
                      listPrice: 400,
                      salePrice: 300,
                      primePrice: 200,
                    },
                  },
                ],
              },
            ],
          },
        },
        {
          productName: 'Cinto de Couro',
          productId: '8',
          productLink: 'https://usereserva.com/cinto/p',
          brand: 'RESERVA',
          image: 'https://lojausereserva.vtexassets.com/arquivos/ids/8409628-400-600',
          categoryTree: [
            {
              id: 12,
              name: 'Cintos',
            },
          ],
          sku: {
            skuId: '5685',
            colors: [
              {
                name: 'MARROM',
                hex: '#8B4513',
                disabled: false,
                sizes: [
                  {
                    value: 'Único',
                    disabled: false,
                    prices: {
                      listPrice: 200,
                      salePrice: 150,
                      primePrice: 100,
                    },
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  ];

  const calculateDiscountPercentage = (listPrice: number, salePrice: number) => {
    const discountPercentage = ((listPrice - salePrice) / listPrice) * 100;
    return Math.round(discountPercentage);
  };

  const renderItem = ({ item: shelf }: { item: IShelf }) => (
    <View style={{ marginTop: 10 }}>
      <Text style={{
        fontFamily: 'ReservaDisplay-Regular', fontSize: 24, fontWeight: '400', lineHeight: 23, letterSpacing: 0, textAlign: 'center',
      }}
      >
        {shelf.shelfName}
      </Text>
      <FlatList
        horizontal
        data={shelf.products}
        keyExtractor={(item) => item.productId}
        renderItem={({ item: product }) => (
          <TouchableOpacity
            style={{ padding: 10 }}
            onPress={() => {
              trackClickSmartHintStore.getState()
                .onSendTrackClick(product.productId, TrackPageTypeEnum.Home);
            }}
          >
            <Image
              source={{ uri: product.image }}
              style={{
                width: 155,
                height: 270,
                borderRadius: 10,
              }}
            />
            <Text style={{
              fontFamily: 'ReservaSans-Bold',
              fontSize: 14.73,
              lineHeight: 19.44,
              includeFontPadding: false,
            }}
            >
              {product.productName.length > 22 ? `${product.productName.substring(0, 20).trim()}..` : product.productName}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {product.sku.colors[0]?.sizes[0]?.prices.salePrice !== 0 ? (
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 16.87,
                    includeFontPadding: false,
                    lineHeight: 23.01,
                    fontFamily: 'ReservaSans-Bold',
                  }}
                >
                  {`R$ ${parseInt(product.sku.colors[0]?.sizes[0]?.prices.salePrice)}`}
                  <Text
                    style={{
                      fontSize: 10.52,
                      includeFontPadding: false,
                    }}
                  >
                    {`,${product.sku.colors[0]?.sizes[0]?.prices.salePrice.toFixed(2).split('.')[1]}`}
                  </Text>
                  {'  '}
                </Text>
              ) : (
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 16.87,
                    includeFontPadding: false,
                    lineHeight: 23.01,
                    fontFamily: 'ReservaSans-Bold',
                  }}
                >
                  {`R$ ${parseInt(product.sku.colors[0]?.sizes[0]?.prices.listPrice)}`}
                  <Text
                    style={{
                      fontSize: 10.52,
                      includeFontPadding: false,
                    }}
                  >
                    {`,${product.sku.colors[0]?.sizes[0]?.prices.listPrice.toFixed(2).split('.')[1]}`}
                  </Text>
                  {'  '}
                </Text>
              )}
              {product.sku.colors[0]?.sizes[0]?.prices.salePrice !== 0 ? (
                <Text
                  style={{
                    color: '#999999',
                    textDecorationLine: 'line-through',
                    fontFamily: 'Nunito',
                    fontWeight: '400',
                    fontSize: 16.87,
                    includeFontPadding: false,
                    lineHeight: 23.01,
                  }}
                >
                  {`${parseInt(product.sku.colors[0]?.sizes[0]?.prices.listPrice)}`}
                  <Text
                    style={{
                      fontSize: 10.52,
                      includeFontPadding: false,
                    }}
                  >
                    {`,${product.sku.colors[0]?.sizes[0]?.prices.listPrice.toFixed(2).split('.')[1]}`}
                  </Text>
                </Text>
              ) : (
                null
              )}
            </View>

            <View style={{ position: 'absolute' }}>
              {product.sku.colors[0]?.sizes[0]?.prices.salePrice !== 0 ? (
                <Text
                  style={{
                    position: 'absolute',
                    top: 245,
                    left: 20,
                    color: 'white',
                    backgroundColor: 'black',
                    padding: 5,
                    width: 71,
                    height: 30,
                    borderRadius: 30,
                    fontFamily: 'WorkSans-Italic',
                    fontWeight: '500',
                    fontSize: 12.62,
                    lineHeight: 14.81,
                    letterSpacing: -1.5,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    includeFontPadding: false,
                  }}
                >
                  <Text style={{ fontWeight: 'bold', letterSpacing: 0 }}>
                    {calculateDiscountPercentage(
                      product.sku.colors[0]?.sizes[0]?.prices.listPrice || 0,
                      product.sku.colors[0]?.sizes[0]?.prices.salePrice || 0,
                    )}
                    %
                  </Text>
                  {'  '}
                  OFF
                </Text>
              ) : null}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  return (
    <View style={{ marginVertical: 10 }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.shelfName + index.toString()}
      />
    </View>
  );
}
