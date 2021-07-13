import React, { createRef, useEffect, useState } from 'react';
import { Alert, Dimensions } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Box,
  Button,
  Divider,
  Icon,
  ProductDetailCard,
  SelectColor,
  Typography,
  OutlineInput,
  RadioButtons,
  ProductVerticalListCardProps,
  ExpansePanel,
} from 'reserva-ui';
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
import { useCart } from '../../../context/CartContext';
import { QueryResult, useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../../graphql/product/productQuery';
import {
  Installment,
  ProductQL,
  Seller,
  SKU,
  SkuSpecification,
} from '../../../graphql/products/productSearch';
import { getPercent } from '../../ProductCatalog/components/ListVerticalProducts/ListVerticalProducts';
import { id } from 'date-fns/locale';
import { ProductUtils } from '../../../shared/utils/productUtils';
const screenWidth = Dimensions.get('window').width;

let recomendedScroll = createRef<ScrollView>();

interface ProductDetailProps {
  recomendedProducts?: ProductVerticalListCardProps[];
}

type Props = StackScreenProps<RootStackParamList, 'ProductDetail'> &
  ProductDetailProps;

type Price = {
  highPrice: number;
  lowPrice: number;
};

type CommercialOffer = {
  Tax: number;
  taxPercentage: number;
  AvailableQuantity: number;
  Price: number;
  PriceWithoutDiscont: number;
  discountHighlights: any[];
  Installments: {
    Value: number;
    TotalValuePlusInterestRate: number;
    NumberOfInstallments: number;
    PaymentSystemGroupName: string;
    PaymentSystemName: string;
  }[];
};

type Facets = {
  name: string;
  originalName: string | null;
  values: string[];
};

type Variant = {
  itemId: string;
  images: {
    imageUrl: string;
  }[];
  sellers: Seller[];
  variations: Facets[] | undefined;
};

type Seller = {
  sellerId: string,
  commertialOffer: CommercialOffer
}

type Field = {
  name: string;
  originalName: string;
};

type Specification = {
  field: Field;
  values: Field[];
};

type Product = {
  categoryTree: any[]; // doesnt matter
  productId: string;
  productName: string;
  skuSpecifications: Specification[];
  priceRange: {
    sellingPrice: Price;
    listPrice: Price;
  };
  items: Variant[];
  description: string;
};

type ProductQueryResponse = {
  product: Product;
};

export const ProductDetail: React.FC<Props> = ({
  route,
  recomendedProducts,
}) => {
  /**
   * States, queries and mutations
   */

  const [product, setProduct] = useState<Product | null>(null);
  const { data, loading, refetch }: QueryResult<ProductQueryResponse> =
    useQuery<ProductQueryResponse>(GET_PRODUCTS, {
      variables: {
        id: route.params.productId.split('-')[0],
      },
    });
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [colorFilters, setColorFilters] = useState<string[] | undefined>([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [sizeFilters, setSizeFilters] = useState<string[] | undefined>([]);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const { addItem } = useCart();
  const dispatch = useDispatch();
  const shippingMethodState = useSelector(shippingMethodStateSelector);
  const [cep, setCep] = useState('');

  /***
   * Effects
   */
  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data) {
      const { product } = data;
      setProduct(product);

      // set default first selected variant
      setSelectedVariant(product.items[0]);

      const disabledColors = getUnavailableColors(product)
      console.log(disabledColors)

      // set colors filter
      const colorList = getColorsList(product);
      setColorFilters(colorList);

      // set initial selected color
      setSelectedColor(colorList ? colorList[0] : '');

      // set size filter
      const sizeList = getSizeList(product);
      setSizeFilters(sizeList);
    }
  }, [data]);

  // change sku effect
  useEffect(() => {
    if (product && selectedColor && selectedSize) {
      const { items } = product;

      // map sku variant hex
      const sizeColorSkuVariations = items.flatMap((i) => {
        const variants = i.variations
          ?.map((v) => {
            if (['VALOR_HEX_CONSOLIDADA', 'TAMANHO'].includes(v.name)) return v;
          })
          .filter((a) => a !== undefined);

        return {
          ...i,
          variations: variants,
        };
      });

      if (sizeColorSkuVariations) {
        const selectedSkuVariations: Facets[] = [
          {
            name: 'TAMANHO',
            originalName: null,
            values: [selectedSize],
          },
          {
            name: 'VALOR_HEX_CONSOLIDADA',
            originalName: null,
            values: [selectedColor],
          },
        ];

        const variantToSelect = sizeColorSkuVariations.find((i) => {
          if (i.variations) {
            const a = i.variations.map(
              ({ name, originalName, values }: any) => ({
                name,
                originalName,
                values,
              } as Facets)
            );

            return JSON.stringify(a) === JSON.stringify(selectedSkuVariations);
          }
        });

        setSelectedVariant(variantToSelect);
      }
    }
  }, [selectedColor, selectedSize]);

  const getInstallments = () => {
    const chosenInstallment =
      selectedVariant?.sellers[0].commertialOffer.Installments.filter(
        ({ PaymentSystemGroupName }) =>
          PaymentSystemGroupName === 'creditCardPaymentGroup'
      ).reduce(
        (prev, next) =>
          prev.NumberOfInstallments > next.NumberOfInstallments ? prev : next,
        { NumberOfInstallments: 0, Value: 0 }
      );

    return chosenInstallment;
  };

  const onShare = async () => {
    const options = {
      message: 'Aqui está um produto que você pode gostar',
      title: 'Compartilhar',
    };

    Share.open(options);
  };

  const onProductAdd = async () => {
    if (selectedVariant) {
      const { message, ok } = await addItem(1, selectedVariant?.itemId, '1');

      if (!ok) {
        Alert.alert('Produto sem estoque', message);
      }
    }
  };

  const getUnavailableColors = ({ items, skuSpecifications }: Product) => {
    console.log('lengths', items.length, skuSpecifications.length)
    return items.map(item => {
      console.log('getUnavailableColors', item.sellers[0])
      if (item.sellers[0].commertialOffer.AvailableQuantity <= 0)
        console.log(item.variations?.find(variant => variant.name === 'VALOR_HEX_CONSOLIDADA'))
    })
  }

  const getColorsList = ({ skuSpecifications }: Product) =>
    skuSpecifications
      .find(({ field }) => field.name === 'VALOR_HEX_CONSOLIDADA')
      ?.values.map(({ name }) => name);

  const getSizeList = ({ skuSpecifications }: Product) =>
    skuSpecifications
      .find(({ field }) => field.name === 'TAMANHO')
      ?.values.map(({ name }) => name);

  return (
    <SafeAreaView>
      <Box bg="white">
        <ModalBag
          isVisible={isVisible}
          onBackdropPress={() => {
            setIsVisible(false);
          }}
        />
        <TopBarDefaultBackButton loading={loading} />
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          {product && selectedVariant && (
            <>
              {/* PRODUCT CARD SECTION */}
              <ProductDetailCard
                {...product}
                title={product.productName}
                price={product.priceRange.listPrice.lowPrice || 0}
                priceWithDiscount={
                  product.priceRange.sellingPrice.lowPrice || 0
                }
                imagesWidth={screenWidth}
                images={selectedVariant.images.map(({ imageUrl }) => imageUrl)}
                installmentsNumber={
                  getInstallments()?.NumberOfInstallments || 1
                }
                installmentsPrice={getInstallments()?.Value || product.priceRange.listPrice.lowPrice || 0}
                onClickShare={onShare}
                discountTag={
                  getPercent(
                    product.priceRange.sellingPrice.lowPrice,
                    product.priceRange.listPrice.lowPrice
                  ) || 0
                }
              />

              {/* COLORS SECTION */}
              <Box mt="xs">
                <Box px="xxxs" mb="xxxs">
                  <Typography variant="subtituloSessoes">Cores:</Typography>
                </Box>
                <Box>
                  <ScrollView horizontal>
                    <SelectColor
                      onPress={(color) => setSelectedColor(color)}
                      size={40}
                      disabledColors={colorFilters?.length ? [colorFilters[1]] : []}
                      listColors={colorFilters || []}
                      selectedColors={
                        selectedColor || (colorFilters && colorFilters[0])
                      }
                    />
                  </ScrollView>
                </Box>
              </Box>

              {/* SIZE SELECTION */}
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
                    {/* <Button>
                      <Box flexDirection="row" alignItems="center">
                        <Icon name="Ruler" size={35} />
                        <Typography fontFamily="nunitoRegular" fontSize={11}>
                          Guia de medidas
                        </Typography>
                      </Box>
                    </Button> */}
                  </Box>
                  <Box alignItems="center" mt="xxxs">
                    <RadioButtons
                      size={44}
                      fontSize={14}
                      disbledOptions={['G']}
                      onSelectedChange={(item) => {
                        setSelectedSize(item);
                      }}
                      optionsList={new ProductUtils().orderSizes(sizeFilters) || []}
                      defaultSelectedItem=""
                    />
                  </Box>
                </Box>

                {/* ADD TO CART BUTTON */}
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

                {/* DELIVERY INFO */}
                <Typography fontFamily="reservaSerifRegular" fontSize={16}>
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
                            fontSize={14}
                          >
                            R$ {method.shippingCost}{' '}
                          </Typography>

                          <Typography
                            fontFamily="nunitoRegular"
                            fontSize={14}
                          >
                            {method.displayName}
                          </Typography>
                        </Box>
                        <Typography fontFamily="nunitoRegular" fontSize={14}>
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
                      content: product.description || '',
                    }}
                  />
                </Box>

                <Divider variant="fullWidth" my="xs" />

                <Typography fontFamily="reservaSerifRegular" fontSize={16}>
                  Receba novidades e promoções
                </Typography>

                <Box flexDirection="column" mt="xxxs">
                  <OutlineInput
                    placeholder="Digite seu e-mail"
                    iconName="ChevronRight"
                    keyboardType="email-address"
                  />
                </Box>
              </Box>
            </>
          )}

          {/*
        
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
         */}
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
};
