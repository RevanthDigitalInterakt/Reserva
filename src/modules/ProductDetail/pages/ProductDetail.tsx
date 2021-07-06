import React, { createRef, useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  PickerItemProps,
} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { ceil } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Box,
  Button,
  Divider,
  Icon,
  Picker,
  PickerItem,
  ProductDetailCard,
  SelectColor,
  Typography,
  OutlineInput,
  RadioButtons,
  ProductVerticalListCard,
  ProductVerticalListCardProps,
  TopBar,
  theme,
  ExpansePanel,
} from 'reserva-ui';
import { Input } from 'reserva-ui/src/components/TextField/TextField.styles';
import { TopBarDefaultBackButton } from '../../Menu/components/TopBarDefaultBackButton';
import { ModalBag } from '../components/ModalBag';

import Share from 'react-native-share';
import { useDispatch, useSelector } from 'react-redux';
import { load } from '../../../store/ducks/shippingMethod/actions';
import { shippingMethodStateSelector } from '../../../store/ducks/shippingMethod';
import { add, addDays, format } from 'date-fns';

import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types';
import { RootStackParamList } from '../../../routes/StackNavigator';
import { ApplicationState } from '../../../store';
import {
  loadProduct,
  loadProductSuccess,
} from '../../../store/ducks/product/actions';
import { ProductSKU } from '../../../store/ducks/product/types';
import { appendOrders } from '../../../store/ducks/orders/actions';
import { useCart } from '../../../context/CartContext';
import { QueryResult, useQuery } from '@apollo/client';
import { productQuery } from '../../../graphql/product/productQuery';
import {
  ProductQL,
  SKU,
  SkuSpecification,
} from '../../../graphql/products/productSearch';
import { getPercent } from '../../ProductCatalog/components/ListVerticalProducts/ListVerticalProducts';
import { id } from 'date-fns/locale';
const screenWidth = Dimensions.get('window').width;

let recomendedScroll = createRef<ScrollView>();

interface ProductDetailProps {
  recomendedProducts?: ProductVerticalListCardProps[];
}

type Props = StackScreenProps<RootStackParamList, 'ProductDetail'> &
  ProductDetailProps;

export const ProductDetail: React.FC<Props> = ({
  route,
  recomendedProducts,
}) => {
  const productId = route.params.productId.split('-')[0];
  const [productsQuery, setProduct] = useState<ProductQL>();
  const [isFavorited, setIsFavorited] = useState(false);
  const [skuSizes, setSkuSises] = useState<(string | undefined)[]>();
  const [skuColors, setSkuColors] = useState<(string | undefined)[]>();
  const [itemSelected, setItemSelected] = useState('43205');

  const [isVisible, setIsVisible] = useState(false);
  const [actualRecomendedindex, setActualRecomendedindex] = useState(0);
  const { addItem } = useCart();

  const { data, loading, refetch }: QueryResult = useQuery(productQuery, {
    variables: {
      id: productId,
    },
  });

  useEffect(() => {
    if (!loading) {
      setProduct(data.product);
    }
  }, [data]);

  useEffect(() => {
    let sizes: (string | undefined)[] = [];
    let colors: (string | undefined)[] = [];
    productsQuery?.skuSpecifications.forEach((sku) => {
      if (sku.field.name === 'TAMANHO') {
        sizes = sku.values.map((value) => value.name);
      }
    });
    setSkuSises(sizes);

    productsQuery?.skuSpecifications.forEach((sku) => {
      if (sku.field.name === 'VALOR_HEX_CONSOLIDADA') {
        colors = sku.values.map((value) => value.name);
      }
    });
    setSkuColors(colors);

    console.log(colors, sizes);
  }, [productsQuery]);

  recomendedProducts = [
    {
      productTitle: 'Camiseta Básica Reserva',
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      imageSource:
        'https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png',
    },
    {
      productTitle: 'Camiseta Básica Reserva',
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      imageSource:
        'https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png',
    },
    {
      productTitle: 'Camiseta Básica Reserva',
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      imageSource:
        'https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png',
    },
    {
      productTitle: 'Camiseta Básica Reserva',
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      imageSource:
        'https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png',
    },
    {
      productTitle: 'Camiseta Básica Reserva',
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      imageSource:
        'https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png',
    },
    {
      productTitle: 'Camiseta Básica Reserva',
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      imageSource:
        'https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png',
    },
    {
      productTitle: 'Camiseta Básica Reserva',
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      imageSource:
        'https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png',
    },
    {
      productTitle: 'Camiseta Básica Reserva',
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      imageSource:
        'https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png',
    },
    {
      productTitle: 'Camiseta Básica Reserva',
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      imageSource:
        'https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png',
    },
    {
      productTitle: 'Camiseta Básica Reserva',
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      imageSource:
        'https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png',
    },
    {
      productTitle: 'Camiseta Básica Reserva',
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      imageSource:
        'https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png',
    },
    {
      productTitle: 'Camiseta Básica Reserva',
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      imageSource:
        'https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png',
    },
  ];

  const onChangeRecomended = (
    scrollEvent: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const actualItem = Math.ceil(
      scrollEvent.nativeEvent.contentOffset.x / ((138 + theme.space.micro) * 2)
    );
    if (
      actualItem !== actualRecomendedindex &&
      recomendedProducts &&
      actualItem <= Math.ceil(recomendedProducts.length / 2)
    ) {
      setActualRecomendedindex(actualItem);
    }
  };

  const onProductAdd = () => {
    // todo - change hardcoded product
    const { message, ok } = addItem(1, itemSelected, '1');

    if (!ok) {
      Alert.alert('Produto sem estoque', message);
    }
  };

  const dispatch = useDispatch();
  const shippingMethodState = useSelector(shippingMethodStateSelector);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState<string | number>('');
  let product = useSelector((state: ApplicationState) => state.product);
  const [selectedItemsSku, setSelectedItemsSku] = useState<SKU[]>();

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    setSelectedColor(
      product.data.skuList ? product.data.skuList[0]?.color : ''
    );
    setSelectedSize(product.data.skuList ? product.data.skuList[0]?.size : '');
  }, [product]);

  const [cep, setCep] = useState('');

  useEffect(() => {
    let selectedSku: SKU[] = [];
    productsQuery?.items.forEach((x) => {
      x.variations?.forEach((variation) => {
        if (variation.name === 'VALOR_HEX_CONSOLIDADA') {
          variation.values?.forEach((value) => {
            if (value === selectedColor) {
              selectedSku = selectedSku.concat(x);
            }
          });
        }
      });
    });
    setSelectedItemsSku(selectedSku);
  }, [selectedColor]);

  useEffect(() => {
    selectedItemsSku?.forEach((item) => {
      item.variations?.forEach((variation) => {
        if (variation.name === 'TAMANHO') {
          variation.values?.forEach((value) => {
            if (value === selectedSize) {
              setItemSelected(item.itemId);
            }
          });
        }
      });
    });
  }, [selectedSize]);

  useEffect(() => {
    console.log(itemSelected);
  }, [itemSelected]);

  return (
    <SafeAreaView>
      {!loading && productsQuery && (
        <Box bg="white">
          <ModalBag
            isVisible={isVisible}
            onBackdropPress={() => {
              setIsVisible(false);
            }}
          />
          <TopBarDefaultBackButton loading={product.loading} />
          <ScrollView>
            <ProductDetailCard
              installmentsNumber={0}
              installmentsPrice={0}
              title={productsQuery.productName}
              price={productsQuery.priceRange?.listPrice?.lowPrice}
              priceWithDiscount={
                productsQuery.priceRange?.sellingPrice.lowPrice
              }
              discountTag={getPercent(
                productsQuery.priceRange?.sellingPrice.lowPrice,
                productsQuery.priceRange?.listPrice?.lowPrice
              )}
              imagesWidth={screenWidth}
              images={productsQuery.items[0].images.map(
                (image) => image.imageUrl
              )}
              isFavorited={isFavorited}
              onClickFavorite={(favoriteState: any) => {
                setIsFavorited(favoriteState);
              }}
              onClickShare={() => {
                const options = {
                  message: 'Aqui está um produto que você pode gostar',
                  title: 'Compartilhar',
                };
                Share.open(options)
                  .then((res) => {
                    //console.log(res)
                  })
                  .catch((err) => {
                    //err && console.log(err)
                  });
              }}
            />

            <Box mt="xs">
              <Box px="xxxs" mb="xxxs">
                <Typography variant={'subtituloSessoes'}>Cores:</Typography>
              </Box>
              <Box>
                <ScrollView horizontal>
                  <SelectColor
                    onPress={(color: any) => setSelectedColor(color)}
                    size={40}
                    listColors={skuColors}
                    selectedColors={selectedColor}
                  />
                </ScrollView>
              </Box>
            </Box>
            <Box px="xxxs">
              <Box mt="xxxs">
                <Box
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant={'subtituloSessoes'}>
                    Tamanhos:
                  </Typography>
                  <Button>
                    <Box flexDirection="row" alignItems="center">
                      <Icon name="Ruler" size={35} />
                      <Typography fontFamily="nunitoRegular" fontSize={'11px'}>
                        Guia de medidas
                      </Typography>
                    </Box>
                  </Button>
                </Box>
                <Box alignItems="center" mt="xxxs">
                  <RadioButtons
                    size={44}
                    fontSize={14}
                    onSelectedChange={(item) => {
                      setSelectedSize(item);
                    }}
                    optionsList={skuSizes}
                    defaultSelectedItem={selectedSize}
                  />
                </Box>
              </Box>

              <Button
                mt="xxs"
                title="ADICIONAR À SACOLA"
                variant="primarioEstreito"
                onPress={() => {
                  onProductAdd();
                  setIsVisible(true);
                }}
                inline
              />

              <Box mt="nano" flexDirection="row"></Box>
              <Divider variant="fullWidth" my="xs" />
              <Typography fontFamily="reservaSerifRegular" fontSize="16px">
                Consultar prazo e valor do frete
              </Typography>
              <Box flexDirection="row" mt="xxxs">
                <OutlineInput
                  onChangeText={(text) => {
                    setCep(text);
                  }}
                  value={cep}
                  placeholder="Digite seu CEP"
                  iconName="Search"
                  keyboardType="number-pad"
                  keyboardAppearance="light"
                  maskType="zip-code"
                  onPressIcon={() => {
                    dispatch(load({ cep }));
                  }}
                />
              </Box>

              {shippingMethodState.shippingMethods && cep
                ? shippingMethodState.shippingMethods.map((method) => {
                  return (
                    <Box flexDirection="row" justifyContent="space-between">
                      <Box flexDirection="row">
                        <Typography
                          fontFamily="nunitoRegular"
                          fontSize={'14px'}
                        >
                          R$ {method.shippingCost}{' '}
                        </Typography>

                        <Typography
                          fontFamily="nunitoRegular"
                          fontSize={'14px'}
                        >
                          {method.displayName}
                        </Typography>
                      </Box>
                      <Typography
                        fontFamily="nunitoRegular"
                        fontSize={'14px'}
                      >
                        {format(
                          addDays(Date.now(), method.deliveryDays),
                          'dd/MM'
                        )}
                      </Typography>
                    </Box>
                  );
                })
                : null}

              <Divider variant="fullWidth" my="xs" />
              <Box>
                <ExpansePanel
                  information={{
                    title: 'Descrição do produto',
                    content: productsQuery.description
                      ? productsQuery.description
                      : 'teste',
                  }}
                />
              </Box>

              <Divider variant="fullWidth" my="xs" />
              <Typography fontFamily="reservaSerifRegular" fontSize="16px">
                Receba novidades e promoções
              </Typography>
              <Box flexDirection="column" mt="xxxs">
                <OutlineInput
                  placeholder="Digite seu e-mail"
                  iconName="ChevronRight"
                  keyboardType="email-address"
                />
              </Box>
              <Box mt="xs" mb="xxl">
                <Box mb="xxxs">
                  <Typography fontFamily="nunitoBold" fontSize={14}>
                    Seu produto combina com
                  </Typography>
                </Box>
                <Box mb="md">
                  <ScrollView
                    horizontal
                    pagingEnabled
                    scrollEventThrottle={138}
                    snapToInterval={(138 + theme.space.micro) * 2}
                    ref={recomendedScroll}
                    showsHorizontalScrollIndicator={false}
                    onScroll={onChangeRecomended}
                  >
                    {recomendedProducts.map((product, index) => (
                      <>
                        <Box mr={'micro'} key={index} height={230}>
                          <ProductVerticalListCard
                            imageWidth={138}
                            small
                            {...product}
                          />
                        </Box>
                        <Box
                          width={
                            recomendedProducts?.length - 1 == index
                              ? 138 / 2 + theme.space.micro
                              : 0
                          }
                        />
                      </>
                    ))}
                  </ScrollView>
                  <Box
                    paddingTop="nano"
                    flexDirection="row"
                    justifyContent="center"
                  >
                    {recomendedProducts.map(
                      (i, k) =>
                        k % 2 == 0 && (
                          <Button
                            paddingX="quarck"
                            variant="icone"
                            onPress={() => {
                              let width = (138 + theme.space.micro) * 2;
                              console.log(`k/2: ${k / 2}`);
                              recomendedScroll.current?.scrollTo({
                                x: width * (k / 2),
                              });
                            }}
                            icon={
                              <Icon
                                name="Circle"
                                size={6}
                                color={
                                  actualRecomendedindex == Math.ceil(k / 2)
                                    ? 'preto'
                                    : 'neutroFrio1'
                                }
                              />
                            }
                          />
                        )
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </ScrollView>
        </Box>
      )}
    </SafeAreaView>
  );
};
