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
import { add, addDays, format } from 'date-fns';

import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types';
import { RootStackParamList } from '../../../routes/StackNavigator';
import { ApplicationState } from '../../../store';
import { useCart } from '../../../context/CartContext';
import { QueryResult, useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { GET_PRODUCTS, GET_SHIPPING } from '../../../graphql/product/productQuery';
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
import wishListQueries from '../../../graphql/wishlist/wishList';
import { useAuth } from '../../../context/AuthContext';


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

type ItemsSKU = {
  color: string;
  images: string[];
  sizeList: [
    id: string,
    size: string,
    available: boolean
  ]
}
type ShippingCost = {
  selectedSla?: string;
  slas: {
    name: string;
    friendlyName: string;
    price: number;
    shippingEstimate: string;
  }[];
}
export const ProductDetail: React.FC<Props> = ({
  route,
  navigation,
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

  const [shippingCost, setShippingCost] = useState<ShippingCost[]>([]);

  const [getShippingData, { loading: shippingLoading, error, data: shippingData, refetch: shippingRefetch }] = useLazyQuery(GET_SHIPPING, { fetchPolicy: "no-cache" });

  const [imageSelected, setImageSelected] = useState<any>([]);
  const [itemsSKU, setItemsSKU] = useState<any>([]);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [colorFilters, setColorFilters] = useState<string[] | undefined>([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [sizeFilters, setSizeFilters] = useState<string[] | undefined>([]);
  const [unavailableSizes, setUnavailableSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const [skip, setSkip] = useState(false)
  const [wishInfo, setWishInfo] = useState({
    listIds: [''],
    inList: false
  })
  const { addItem } = useCart();
  const dispatch = useDispatch();

  const [cep, setCep] = useState('');

  const { refetch: checkListRefetch } = useQuery(wishListQueries.CHECK_LIST, { skip })

  const [addWishList, { data: addWishListData, error: addWishListError, loading: addWishLoading }] = useMutation(wishListQueries.ADD_WISH_LIST)
  const [removeWishList, { data: removeWishListData, error: removeWishListError, loading: removeWishLoading }] = useMutation(wishListQueries.REMOVE_WISH_LIST)

  const { email } = useAuth()

  /***
   * Effects
   */
  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    refetchChecklist();
  }, [product])

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
      console.log("colorList", colorList);

      setColorFilters(colorList);

      // set initial selected color
      setSelectedColor(colorList ? route.params.colorSelected : '');

      // set size filter
      const sizeList = getSizeList(product);
      setSizeFilters(sizeList);

      let itemList = colorList?.map((color) => {
        return {
          color,
          images: getImagesPerColor(product, color),
          sizeList: getSizePerColor(product, color)
        }
      });
      setItemsSKU(itemList);
      console.log(itemList);

    }
  }, [data]);

  useEffect(() => {
    if (itemsSKU.length > 0) {
      setImageSelected(
        itemsSKU
          .map(p => p.color === selectedColor && p.images)
          .filter(a => a !== false)
      );
      setSizeFilters(
        new ProductUtils().orderSizes(
          itemsSKU
            .map(p => p.color === selectedColor && p.sizeList.map(sizes => sizes.size))
            .filter(a => a !== false)[0]
        )

      );
      setUnavailableSizes(
        itemsSKU
          .map(p => p.color === selectedColor && p.sizeList.map(sizes => !sizes.available && sizes.size))
          .filter(a => a !== false)[0]
      );

      setSelectedSize(null);
    }
  }, [selectedColor])

  useEffect(() => {
    console.log("selectedSize", selectedSize);

  }, [selectedSize])

  // change sku effect
  useEffect(() => {
    if (product && selectedColor && selectedSize) {
      const { items } = product;

      // map sku variant hex
      const sizeColorSkuVariations = items.flatMap((i) => {
        const variants = i.variations
          ?.map((v) => {
            if (['VALOR_HEX_ORIGINAL', 'TAMANHO'].includes(v.name)) return v;
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
            name: 'VALOR_HEX_ORIGINAL',
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

  const refetchChecklist = async () => {
    setSkip(true)
    if (product && product.productId) {
      const { data: { checkList } } = await checkListRefetch({
        shopperId: email,
        productId: product.productId.split('-')[0],
      })
      setWishInfo({ ...checkList })
    }
  }

  const handleOnFavorite = async (favorite: boolean) => {
    if (!!email) {
      if (product && product.productId) {
        if (favorite) {
          const { data } = await addWishList({
            variables: {
              shopperId: email,
              productId: product.productId.split('-')[0]
            }
          })
          console.log('add data', data)
        } else {
          await removeWishList({
            variables: {
              shopperId: email,
              id: wishInfo.listIds[0]
            }
          })
        }
        await refetchChecklist()
      }
    } else {
      navigation.navigate('Login', { comeFrom: 'Favorite' })
    }
  }

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
        console.log(item.variations?.find(variant => variant.name === 'VALOR_HEX_ORIGINAL'))
    })
  }

  const getColorsList = ({ skuSpecifications }: Product) =>
    skuSpecifications
      .find(({ field }) => field.name === 'VALOR_HEX_ORIGINAL')
      ?.values.map(({ name }) => name);

  const getSizeList = ({ skuSpecifications }: Product) =>
    skuSpecifications
      .find(({ field }) => field.name === 'TAMANHO')
      ?.values.map(({ name }) => name);

  const getImagesPerColor = ({ items }: Product, color: string) => {
    return items.flatMap((item) => {
      const images = item.variations
        ?.map((v) => {
          if (['VALOR_HEX_ORIGINAL'].includes(v.name)) {
            if (v.values[0] === color) {
              return item.images
            }
          }
        })
        .filter((a) => a !== undefined);

      return images;
    });
  }

  const getSizePerColor = ({ items }: Product, color: string) => {
    return items.flatMap((item) => {
      const variants = item.variations
        ?.map((v) => {
          if (['VALOR_HEX_ORIGINAL'].includes(v.name)) {
            if (v.values[0] === color) {
              return {
                item,
                size: item.variations?.filter(i => i.name === "TAMANHO")[0].values[0],
                available: item.sellers[0].commertialOffer.AvailableQuantity > 0
              };
            }

          }
        })
        .filter((a) => a !== undefined);

      return variants;
    });
  }

  const consultZipCode = () => {
    getShippingData({
      variables: {
        items: [
          {
            quantity: "1",
            id: selectedVariant?.itemId,
            seller: "1"
          }
        ],
        postalCode: cep
      },
    })
  }

  useEffect(() => {
    if (shippingData) {
      setShippingCost(shippingData.shipping.logisticsInfo)
    }
  }, [shippingData]);

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
        <ScrollView contentContainerStyle={{ paddingBottom: 100, }}>
          {product && selectedVariant && (
            <>
              {/* PRODUCT CARD SECTION */}
              <ProductDetailCard
                {...product}
                title={product.productName}
                isFavorited={wishInfo.inList}
                onClickFavorite={handleOnFavorite}
                price={product.priceRange.listPrice.lowPrice || 0}
                priceWithDiscount={
                  product.priceRange.sellingPrice.lowPrice || 0
                }
                imagesWidth={screenWidth}
                images={imageSelected.length > 0 ? imageSelected[0][0].map(image => image.imageUrl) : []}
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
                      disabledColors={[]}
                      listColors={itemsSKU.map(p => p.color) || []}
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
                      disbledOptions={unavailableSizes ? unavailableSizes : []}
                      onSelectedChange={(item) => {
                        setSelectedSize(item);
                      }}
                      optionsList={sizeFilters || []}
                      defaultSelectedItem=""
                      selectedItem={selectedSize}
                    />
                  </Box>
                </Box>

                {/* ADD TO CART BUTTON */}
                <Button
                  mt="xxs"
                  title="ADICIONAR À SACOLA"
                  variant="primarioEstreito"
                  disabled={!!!selectedSize}
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
                    onPressIcon={consultZipCode}
                  />
                </Box>
                {shippingCost?.length > 0 &&
                  shippingCost[0]?.slas.map((item) => (
                    <Box
                      flexDirection="row"
                      justifyContent="space-between"
                      marginTop="nano"
                    >
                      <Box
                        width="50%"
                        justifyContent="center"
                        borderColor="divider"
                      >
                        <Typography
                          fontFamily="nunitoRegular"
                          fontSize={14}
                        >
                          {item.friendlyName}
                        </Typography>
                      </Box>
                      <Box
                        width="20%"
                        alignItems="center"
                        justifyContent="center"
                        borderColor="divider"
                      >
                        <Typography
                          fontFamily="nunitoRegular"
                          fontSize={14}
                        >
                          {format(
                            addDays(Date.now(), parseInt(item.shippingEstimate.split('bd')[0])),
                            'dd/MM'
                          )}
                        </Typography>
                      </Box>

                      <Box
                        width="30%"
                        alignItems="flex-end"
                        justifyContent="center"
                      >
                        <Typography
                          fontFamily="nunitoRegular"
                          fontSize={14}
                          color="verdeSucesso"
                        >
                          {item.price > 0 ?
                            `R$ ${(item.price) / 100}`
                            :
                            `GRÁTIS`
                          }
                        </Typography>
                      </Box>
                    </Box>
                  ))
                }
                <Divider variant="fullWidth" my="xs" />

                <Box>
                  <ExpansePanel
                    style={{
                      fontFamily: "reservaSerifRegular",
                      fontSize: 20
                    }}
                    information={{
                      title: 'Sobre este produto',
                      content: product.description || '',
                    }}
                  />
                </Box>

                <Divider variant="fullWidth" my="xs" />

                <Typography fontFamily="reservaSerifRegular" fontSize={16}>
                  Receba novidades e promoções
                </Typography>

                <Box flexDirection="column" mt="xxxs" mb="xxs">
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
