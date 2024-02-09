import React from 'react';
import {
  View, FlatList, Text, Image, TouchableOpacity,
} from 'react-native';
import { trackClickSmartHintStore } from '../../../../zustand/useTrackClickSmartHint/useTrackClickSmartHint';
import { TrackPageTypeEnum } from '../../../../base/graphql/generated';
import { styles } from './HomeShowcase.styles';
import { COLORS, FONTS } from '../../../../base/styles';
import { decimalPart, integerPart } from '../../../../utils/numberUtils';

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

  const renderItem = ({ item: shelf }: { item: IShelf }) => (
    <View style={{ marginTop: 10 }}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{
          fontFamily: FONTS.RESERVA_DISPLAY_REGULAR, fontSize: 24, lineHeight: 23, letterSpacing: 0,
        }}
        >
          {shelf.shelfName}
        </Text>
      </View>
      <FlatList
        horizontal
        data={shelf.products}
        keyExtractor={(item) => item.productId}
        renderItem={({ item: product }) => (
          <TouchableOpacity
            style={{ padding: 10, borderRadius: 10 }}
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
              fontFamily: FONTS.RESERVA_SANS_BOLD,
              fontSize: 15,
              lineHeight: 20,
            }}
            >
              {product.productName.length > 22 ? `${product.productName.substring(0, 20).trim()}..` : product.productName}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {product.prices.salePrice !== 0 ? (
                <>
                  <Text
                    style={{
                      fontSize: 17,
                      lineHeight: 23,
                      fontFamily: FONTS.RESERVA_SANS_BOLD,
                    }}
                  >
                    {`R$ ${integerPart(product.prices.salePrice || 0)}`}
                  </Text>
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: FONTS.RESERVA_SANS_BOLD,
                      marginTop: -4,
                    }}
                  >
                    {`,${decimalPart(product.prices.salePrice || 0)}`}
                  </Text>
                </>
              ) : (
                <>
                  <Text
                    style={{
                      fontSize: 17,
                      lineHeight: 23,
                      fontFamily: FONTS.RESERVA_SANS_BOLD,
                    }}
                  >
                    {`R$ ${integerPart(product.prices.listPrice || 0)}`}
                  </Text>
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: FONTS.RESERVA_SANS_BOLD,
                      marginTop: -4,
                    }}
                  >
                    {`,${decimalPart(product.prices.listPrice || 0)}`}
                  </Text>
                </>
              )}
              {product.prices.salePrice !== 0 ? (
                <>
                  <Text
                    style={{
                      marginLeft: 10,
                      color: COLORS.LIGHT_GRAY,
                      textDecorationLine: 'line-through',
                      fontFamily: FONTS.NUNITO_REGULAR,
                      fontSize: 17,
                      lineHeight: 23,
                    }}
                  >
                    {`${integerPart(product.prices.listPrice || 0)}`}
                  </Text>
                  <Text
                    style={{
                      color: COLORS.LIGHT_GRAY,
                      fontFamily: FONTS.NUNITO_REGULAR,
                      lineHeight: 17,
                      fontSize: 11,
                    }}
                  >
                    {`,${decimalPart(product.prices.listPrice || 0)}`}
                  </Text>
                </>
              ) : (
                null
              )}
            </View>
            {product.flags.map((flag) => {
              if (flag.type === 'savings') {
                return (
                  <View style={{
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    top: 245,
                    left: 20,
                    backgroundColor: COLORS.BLACK,
                    width: 71,
                    height: 30,
                    borderRadius: 30,
                  }}
                  >
                    <Text
                      key={flag.type}
                      style={{
                        color: COLORS.WHITE,
                        fontFamily: FONTS.WORK_SANS_BOLD_ITALIC,
                        fontSize: 13,
                        lineHeight: 15,
                      }}
                    >
                      {`${flag.value}%`}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.WHITE,
                        fontFamily: FONTS.WORK_SANS_ITALIC,
                        fontSize: 13,
                        lineHeight: 15,
                        letterSpacing: -1.5,
                        marginLeft: 5,
                      }}
                    >
                      OFF
                    </Text>
                  </View>
                );
              }
              if (flag.type === 'cashback') {
                return (
                  <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: COLORS.LIGHT_GREY_BLUE,
                    width: 150,
                    height: 15,
                    borderRadius: 30,
                    flexDirection: 'row',
                  }}
                  >
                    <Text
                      key={flag.type}
                      style={{
                        color: COLORS.BLACK,
                        fontFamily: FONTS.WORK_SANS_BOLD,
                        fontSize: 12,
                        lineHeight: 15,
                      }}
                    >
                      {`Ganhe ${flag.value}%`}
                    </Text>
                    <Text
                      key={flag.type}
                      style={{
                        color: COLORS.BLACK,
                        fontFamily: FONTS.WORK_SANS_REGULAR,
                        fontSize: 12,
                        lineHeight: 15,
                      }}
                    >
                      {' de cashback'}
                    </Text>
                  </View>
                );
              }
              return null;
            })}

          </TouchableOpacity>
        )}
      />
    </View>
  );

  return (
    <View style={styles.conteiner}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.shelfName + index.toString()}
      />
    </View>
  );
}
