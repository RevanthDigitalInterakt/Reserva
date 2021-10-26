import React, { createRef, useEffect, useMemo, useState } from 'react';
import { Alert, Dimensions, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
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
import * as Yup from "yup";
import Share from 'react-native-share';

import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types';
import { RootStackParamList } from '../../../routes/StackNavigator';
import { useCart } from '../../../context/CartContext';
import { QueryResult, useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { GET_PRODUCTS, GET_SHIPPING, SUBSCRIBE_NEWSLETTER } from '../../../graphql/product/productQuery';
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
import { images } from '../../../assets';
import { url } from '../../../config/vtexConfig';
import { Tooltip } from '../components/Tooltip';
import { ModalTermsAndConditions } from '../components/ModalTermsAndConditions';

import axios from "axios";

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
  clusterHighlights?: ClusterHighlight[]
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
export interface ClusterHighlight {
  id?: string
  name?: string
}

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

  const [subscribeNewsletter, { loading: newsletterLoading, data: newsletterData, error: newsletterError }] = useMutation(SUBSCRIBE_NEWSLETTER)

  const [shippingCost, setShippingCost] = useState<ShippingCost[]>([]);

  const [getShippingData, { loading: shippingLoading, error, data: shippingData, refetch: shippingRefetch }] = useLazyQuery(GET_SHIPPING, { fetchPolicy: "no-cache" });

  const [imageSelected, setImageSelected] = useState<any>([]);
  const [itemsSKU, setItemsSKU] = useState<any>([]);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [outOfStock, setoutOfStock] = useState(false);
  const [toolTipIsVisible, setToolTipIsVisible] = useState(false)
  const [colorFilters, setColorFilters] = useState<string[] | undefined>([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [sizeFilters, setSizeFilters] = useState<string[] | undefined>([]);
  const [unavailableSizes, setUnavailableSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedSellerId, setSelectedSellerId] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const [skip, setSkip] = useState(false)
  const [loadingFavorite, setLoadingFavorite] = useState(false)
  const [loadingNewsLetter, setLoadingNewsLetter] = useState(false)
  const [acceptConditions, setAcceptConditions] = useState(false)
  const [modalTermsAndConditionsisVisible, setModalTermsAndConditionsisVisible] = useState(false)
  const [wishInfo, setWishInfo] = useState({
    listIds: [''],
    inList: false
  })
  const { addItem, sendUserEmail, orderForm, removeItem } = useCart();

  const [cep, setCep] = useState('');
  const [emailPromotions, setEmailPromotions] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [showMessageError, setShowMessageError] = useState(false);
  const { refetch: checkListRefetch } = useQuery(wishListQueries.CHECK_LIST, { skip })

  const [addWishList, { data: addWishListData, error: addWishListError, loading: addWishLoading }] = useMutation(wishListQueries.ADD_WISH_LIST)
  const [removeWishList, { data: removeWishListData, error: removeWishListError, loading: removeWishLoading }] = useMutation(wishListQueries.REMOVE_WISH_LIST)

  const { email } = useAuth()
  const [isLastUnits, setIsLastUnits] = useState(false)

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
      //console.log(product.items.find((x: any) => x.sellers[0].commertialOffer.AvailableQuantity > 0))
      setSelectedVariant(product.items.find((x: any) => x.sellers[0].commertialOffer.AvailableQuantity > 0));

      const disabledColors = getUnavailableColors(product)

      // set colors filter
      const colorList = getColorsList(product);

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

      let defaultSize = itemList?.find(item => item.color == route.params.colorSelected)?.sizeList.find(size => size?.available)
      defaultSize?.size && setSelectedSize(defaultSize?.size)

      console.log("item", itemList);

      setItemsSKU(itemList);

    }
  }, [data]);

  useEffect(() => {
    if (itemsSKU.length > 0) {

      setImageSelected(
        itemsSKU
          .map(p => p.color === selectedColor && p.images)
          .filter(a => a !== false)
      );

      console.log("selectedCOlor", selectedColor);

      console.log("sku", itemsSKU
        .map(p => p.color === selectedColor && p.sizeList.map(sizes => sizes.size))
        .filter(a => a !== false)[0]);

      setSizeFilters(
        new ProductUtils().orderSizes(
          itemsSKU
            .map(p => p.color === selectedColor && p.sizeList.map(sizes => sizes.size))
            .filter(a => a !== false)[0]
        )
      );

      const unavailableSizes = itemsSKU
        .map(p => p.color === selectedColor && p.sizeList.map(sizes => !sizes.available && sizes.size))
        .filter(a => a !== false)[0]

      setUnavailableSizes(unavailableSizes);

      const index = unavailableSizes.findIndex((x) => x === false)
      if (index === -1) {
        setoutOfStock(true)
      } else {
        setoutOfStock(false)
      }
    }
  }, [selectedColor, route.params.productId])


  // change sku effect
  useEffect(() => {
    if (product && selectedColor && selectedSize) {
      const { items } = product;
      // map sku variant hex
      const sizeColorSkuVariations = items.flatMap((i) => {
        const variants = i.variations
          ?.map((v) => {
            if (['VALOR_HEX_ORIGINAL', 'Tamanho'].includes(v.name)) return v;
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
            name: 'Tamanho',
            originalName: null,
            values: [selectedSize],
          },
          {
            name: 'VALOR_HEX_ORIGINAL',
            originalName: null,
            values: [selectedColor],
          },
        ];
        const getVariant = (variants: any, getVariantId: string) => variants.filter((v: any) => v.name === getVariantId)[0].values[0];

        const isSkuEqual = (sku1: any, sku2: any) => {
          console.log("sku1", sku1);
          console.log("sku2", sku2);
          if (sku1 && sku2) {
            const size1 = getVariant(sku1, "Tamanho");
            const color1 = getVariant(sku1, "VALOR_HEX_ORIGINAL");
            const size2 = getVariant(sku2, "Tamanho");
            const color2 = getVariant(sku2, "VALOR_HEX_ORIGINAL");

            return size1 === size2 && color1 === color2;
          }
        }

        const variantToSelect = sizeColorSkuVariations.find((i) => {
          if (i.variations) {
            const a = i.variations.map(
              ({ name, originalName, values }: any) => ({
                name,
                originalName,
                values: values,
              })
            );
            return isSkuEqual(a, selectedSkuVariations);
          }
        });
        setSelectedVariant(variantToSelect);
      }
    }
  }, [selectedColor, selectedSize]);


  const getSeller = (sellers: Seller[]) => {
    sellers.map((seller) => {
      if (seller.commertialOffer.AvailableQuantity > 0) {
        setSelectedSellerId(seller.sellerId);
      }
    })
  }

  useEffect(() => {
    if (selectedVariant)
      getSeller(selectedVariant?.sellers)
  }, [selectedVariant])

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
        setLoadingFavorite(true)
        if (favorite) {
          const { data } = await addWishList({
            variables: {
              shopperId: email,
              productId: product.productId.split('-')[0],
              sku: selectedVariant?.itemId
            }
          })
        } else {
          await removeWishList({
            variables: {
              shopperId: email,
              id: wishInfo.listIds[0]
            }
          })
        }
        await refetchChecklist()
        setLoadingFavorite(false)

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
    console.log(selectedVariant)
    return chosenInstallment;
  };

  const onShare = async (url: string) => {
    const domain = url.match(/^[^:]+:\/\/[^/?#]+/g)
    const path = url.replace(`${domain ? domain[0] : ''}`, '')

    const options = {
      message: 'Olha o que acabei de encontrar na Reserva: \n',
      title: 'Compartilhar',
      url: `https://www.usereserva.com${path}?skuId=${selectedVariant.itemId}`,
    };

    Share.open(options);
  };

  const onProductAdd = async () => {
    if (selectedVariant) {
      if (isAssinaturaSimples) {
        if (!acceptConditions) return

        const { message, ok } = await addItem(1, selectedVariant?.itemId, selectedSellerId);

        setIsVisible(true);

        if (!ok) {
          Alert.alert('Produto sem estoque', message);
        } else {
          await addAttachmentsInProducts()
        }
      } else {
        const { message, ok } = await addItem(1, selectedVariant?.itemId, selectedSellerId);

        setIsVisible(true);

        if (!ok) {
          Alert.alert('Produto sem estoque', message);
        }
      }
    }
  };

  const getUnavailableColors = ({ items, skuSpecifications }: Product) => {
    return items.map(item => {
      if (item.sellers[0].commertialOffer.AvailableQuantity <= 0)
        return item.variations?.find(variant => variant.name === 'VALOR_HEX_ORIGINAL')
    })
  }

  const getColorsList = ({ skuSpecifications }: Product) =>
    skuSpecifications
      .find(({ field }) => field.name === 'VALOR_HEX_ORIGINAL')
      ?.values.map(({ name }) => name);

  const getSizeList = ({ skuSpecifications }: Product) =>
    skuSpecifications
      .find(({ field }) => field.name === 'TAMANHO' || field.name === 'Tamanho')
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
                size: item.variations?.filter(i => i.name === "TAMANHO" || i.name === "Tamanho")[0].values[0],
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
            seller: selectedSellerId
          }
        ],
        postalCode: cep
      },
    })
  }

  const newsAndPromotions = async () => {
    if (emailIsValid) {
      setLoadingNewsLetter(true)
      console.log('asdasd')
      const { data } = await subscribeNewsletter({
        variables: {
          email: emailPromotions,
          isNewsletterOptIn: true
        }
      })
      console.log('passou do newsletter!!', data)
      setLoadingNewsLetter(false)

      if (!!data && data.subscribeNewsletter) {
        setToolTipIsVisible(true)
      }

    } else {
      setShowMessageError(true)
    }
  }

  useEffect(() => {
    if (shippingData) {
      setShippingCost(shippingData.shipping.logisticsInfo)
    }
  }, [shippingData]);

  const getSaleOff = (salOff) => {
    const idImage = salOff.clusterHighlights?.find(x => x.id === '371')
    if (idImage) return images.saleOff
  }

  const getLastUnits = () => {
    const lastUnits = data?.product.items[0].sellers[0].commertialOffer.AvailableQuantity;
    if (lastUnits <= 5) {
      setIsLastUnits(true)
    } else {
      setIsLastUnits(false)
    }
    console.log("LASTUNITS", isLastUnits)
    console.log("LASTUNITSQTD", lastUnits)
  }

  useEffect(() => {
    getLastUnits();
  }, [selectedColor, selectedSize])
  const addAttachmentsInProducts = async () => {
    try {
      const orderFormId = orderForm?.orderFormId
      const productOrderFormIndex = orderForm?.items.length // because it will be the new last element
      const attachmentName = "Li e Aceito os Termos"

      await axios.post(
        `https://www.usereserva.com/api/checkout/pub/orderForm/${orderFormId}/items/${productOrderFormIndex}/attachments/${attachmentName}`,
        { content: { aceito: "true" } },
        { headers: { 'Content-Type': 'application/json' } }
      )

    } catch (error) {
      console.log("error - addAttachmentsInProducts", error)
      throw error
    }
  }

  const isAssinaturaSimples = useMemo(() => {
    const description = "A Camiseta Simples® é 100% algodão e tem certificação BCI (Better Cotton Iniciative)"

    return product?.description.includes(description)
  }, [product])

  return (
    <SafeAreaView>

      <Box bg="white">
        <ModalTermsAndConditions
          isVisible={modalTermsAndConditionsisVisible}
          setIsVisible={setModalTermsAndConditionsisVisible}
        />

        <ModalBag
          isVisible={isVisible}
          onBackdropPress={() => {
            setIsVisible(false);
          }}
        />
        <TopBarDefaultBackButton loading={loading} navigateGoBack={true} />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ marginBottom: 100 }}
        >
          <ScrollView contentContainerStyle={{ paddingBottom: 100, }} style={{ marginBottom: 24 }}>
            {product && selectedVariant && (
              <>

                {/* PRODUCT CARD SECTION */}
                <ProductDetailCard
                  {...product}
                  imagesHeight={3 * (screenWidth / 2)}
                  loadingFavorite={loadingFavorite}
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
                  installmentsPrice={getInstallments()?.Value || product.priceRange.sellingPrice.lowPrice || 0}
                  onClickShare={() => onShare(
                    product.link
                  )}
                  discountTag={
                    getPercent(
                      product.priceRange.sellingPrice.lowPrice,
                      product.priceRange.listPrice.lowPrice
                    ) || 0
                  }
                  saleOff={getSaleOff(product)}
                />

                {
                  /*
                    isLastUnits && !outOfStock ?
                    <Box position='absolute' top={650} right={20} zIndex={4}>
                      <Typography color="vermelhoAlerta" fontWeight="SemiBold" fontFamily="nunitoRegular" fontSize={18} textAlign="center" style={{textTransform: "uppercase"}}>Últimas unidades!</Typography>
                    </Box>
                    : null
                    */
                }


                {/* COLORS SECTION */}
                <Box mt="xs">
                  <Box px="xxxs" mb="xxxs">
                    <Typography variant="subtituloSessoes">Cores:</Typography>
                  </Box>
                  <Box>
                    <ScrollView horizontal>
                      <SelectColor
                        onPress={(color) => setSelectedColor(color)}
                        size={30}
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
                    <Box alignItems="flex-start" mt="xxxs">
                      <RadioButtons
                        size={38}
                        fontSize={12}
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
                  {outOfStock &&
                    <Box
                      mt="xxs"
                      flexDirection="row"
                      alignItems="center"
                    >
                      <Icon name="Alert" size={20} color="vermelhoRSV" mr="nano" />
                      <Typography
                        fontFamily="reservaSansBold"
                        fontSize={15}
                        color="vermelhoRSV"
                      >
                        Produto Esgotado
                      </Typography>
                    </Box>
                  }
                  {/* ADD TO CART BUTTON */}
                  <Button
                    mt="xxs"
                    title="ADICIONAR À SACOLA"
                    variant="primarioEstreito"
                    disabled={!!!selectedSize || (isAssinaturaSimples && !acceptConditions)}
                    onPress={onProductAdd}
                    inline
                  />
                  <Box mt="nano" flexDirection="row"></Box>
                  <Divider variant="fullWidth" my="xs" />

                  {/* CHECKLIST ASSINATURA SIMPLES INFO */}

                  {isAssinaturaSimples &&
                    <>
                      <Box
                        flexDirection='row'
                        alignItems='center'
                        mb='xxxs'
                      >
                        <Box
                          alignItems='center'
                          justifyContent='center'
                          backgroundColor='verdeSucesso'
                          width={20}
                          height={20}
                          borderRadius='xxxs'
                          mr='micro'
                        >
                          <Icon name="Check" size={18} color='white' mt='nano' ml='quarck' />
                        </Box>

                        <Box>
                          <Box
                            flexDirection='row'
                          >
                            <Typography variant='tituloSessao'>Receba </Typography>

                            <Typography variant='tituloSessao' fontWeight='bold'>3 camisetas </Typography>

                            <Typography variant='tituloSessao'>nos 12 meses de</Typography>
                          </Box>

                          <Typography variant='tituloSessao'>assinatura.</Typography>
                        </Box>
                      </Box>

                      <Box
                        flexDirection='row'
                        mb='xxxs'
                        alignItems='center'
                      >
                        <Box
                          alignItems='center'
                          justifyContent='center'
                          backgroundColor='verdeSucesso'
                          width={20}
                          height={20}
                          borderRadius='xxxs'
                          mr='micro'
                        >
                          <Icon name="Check" size={18} color='white' mt='nano' ml='quarck' />
                        </Box>

                        <Box
                          flexDirection='row'
                          alignItems='center'
                        >
                          <Typography variant='tituloSessao' fontWeight='bold'>Ganhe 100% </Typography>

                          <Typography variant='tituloSessao'>de </Typography>

                          <Typography variant='tituloSessao' fontStyle='italic' >cashback </Typography>

                          <Box
                            flexDirection='row'
                            alignSelf='flex-start'
                            mb='nano'
                          >
                            <Typography fontSize={3} >*</Typography>
                            <Typography fontSize={2} >1</Typography>
                          </Box>

                          <Typography fontSize={2} >.</Typography>
                        </Box>
                      </Box>

                      <Box
                        flexDirection='row'
                        alignItems='center'
                        mb='xxxs'
                      >
                        <Box
                          alignItems='center'
                          justifyContent='center'
                          backgroundColor='verdeSucesso'
                          width={20}
                          height={20}
                          borderRadius='xxxs'
                          mr='micro'
                        >
                          <Icon name="Check" size={18} color='white' mt='nano' ml='quarck' />
                        </Box>

                        <Box>
                          <Box
                            flexDirection='row'
                            alignItems='center'
                          >
                            <Typography variant='tituloSessao' fontWeight='bold'>Receba 20% OFF </Typography>

                            <Typography variant='tituloSessao'>em todas as compras</Typography>

                            <Box
                              flexDirection='row'
                              alignSelf='flex-start'
                              mb='nano'
                            >
                              <Typography fontSize={3} >*</Typography>
                              <Typography fontSize={2} >2</Typography>
                            </Box>
                          </Box>

                          <Typography variant='tituloSessao'>acima de R$ 399.</Typography>
                        </Box>
                      </Box>

                      <Box
                        flexDirection='row'
                        alignItems='center'
                        mb='xxxs'
                      >
                        <Box
                          alignItems='center'
                          justifyContent='center'
                          backgroundColor='verdeSucesso'
                          width={20}
                          height={20}
                          borderRadius='xxxs'
                          mr='micro'
                        >
                          <Icon name="Check" size={18} color='white' mt='nano' ml='quarck' />
                        </Box>

                        <Box>
                          <Box
                            flexDirection='row'
                          >
                            <Typography variant='tituloSessao' fontWeight='bold'>Ganhe R$ 75 </Typography>

                            <Typography variant='tituloSessao'>em créditos ao fim da anuidade, </Typography>
                          </Box>

                          <Box
                            flexDirection='row'
                          >
                            <Typography variant='tituloSessao'>caso queira devolver as 3 camisetas</Typography>

                            <Box
                              flexDirection='row'
                              alignSelf='flex-start'
                              mb='nano'
                            >
                              <Typography fontSize={3} >*</Typography>
                              <Typography fontSize={2} >3</Typography>
                            </Box>

                            <Typography variant='tituloSessao'>.</Typography>
                          </Box>
                        </Box>
                      </Box>

                      <Box
                        flexDirection='row'
                        alignItems='center'
                        mb='xxs'
                      >
                        <Box
                          alignItems='center'
                          justifyContent='center'
                          backgroundColor='verdeSucesso'
                          width={20}
                          height={20}
                          borderRadius='xxxs'
                          mr='micro'
                        >
                          <Icon name="Check" size={18} color='white' mt='nano' ml='quarck' />
                        </Box>

                        <Box>
                          <Typography variant='tituloSessao'>Ciclo sustentável: as peças devolvidas serão </Typography>

                          <Typography variant='tituloSessao'>recicladas.</Typography>
                        </Box>
                      </Box>

                      <Box
                        p='nano'
                        backgroundColor='backgoundDivider'
                      >
                        <Box
                          flexDirection='row'
                        >
                          <Typography variant='precoAntigo3' fontSize={1} color='searchBarTextColor'>*1</Typography>
                          <Typography variant='precoAntigo3' color='searchBarTextColor'>: Créditos mensais não cumulativos, expiram a cada 30</Typography>
                        </Box>

                        <Typography variant='precoAntigo3' color='searchBarTextColor'>dias.</Typography>

                        <Box
                          flexDirection='row'
                          mt='quarck'
                        >
                          <Typography variant='precoAntigo3' fontSize={1} color='searchBarTextColor'>*2</Typography>
                          <Typography variant='precoAntigo3' color='searchBarTextColor'>: 20% de desconto exceto para itens já em promoção.</Typography>
                        </Box>

                        <Box
                          flexDirection='row'
                          mt='quarck'
                        >
                          <Typography variant='precoAntigo3' fontSize={1} color='searchBarTextColor'>*3</Typography>
                          <Typography variant='precoAntigo3' color='searchBarTextColor'>: Ao final da anuidade, crédito de R$ 25 por camiseta</Typography>
                        </Box>

                        <Typography variant='precoAntigo3' color='searchBarTextColor'>SimplesⓇ devolvida em lojas Reserva</Typography>
                      </Box>

                      <Box
                        flexDirection='row'
                        alignItems='center'
                        mt='xxxs'
                      >
                        <TouchableOpacity
                          onPress={() => setAcceptConditions(!acceptConditions)}
                        >
                          <Box
                            backgroundColor={acceptConditions ? 'preto' : 'white'}
                            width={14}
                            height={14}
                            border='1px'
                            borderColor='preto'
                            borderRadius='pico'
                            mr='nano'
                            alignItems='center'
                            justifyContent='center'
                          >
                            {acceptConditions && <Icon name="Check" size={14} color='white' mt='nano' ml='quarck' />}
                          </Box>
                        </TouchableOpacity>

                        <Box>
                          <Box
                            flexDirection='row'
                            alignItems='center'
                          >
                            <Typography variant='precoAntigo3' color='preto'>Ao adquirir a assinatura você aceita os </Typography>

                            <TouchableOpacity
                              onPress={() => setModalTermsAndConditionsisVisible(true)}
                            >
                              <Typography
                                variant='precoAntigo3'
                                color='preto'
                                fontWeight='bold'
                                style={{ textDecorationLine: 'underline' }}
                              >termos e</Typography>
                            </TouchableOpacity>
                          </Box>

                          <TouchableOpacity
                            onPress={() => setModalTermsAndConditionsisVisible(true)}
                          >
                            <Typography
                              variant='precoAntigo3'
                              color='preto'
                              fontWeight='bold'
                              style={{ textDecorationLine: 'underline' }}
                            >condições.</Typography>
                          </TouchableOpacity>
                        </Box>
                      </Box>

                      <Divider variant="fullWidth" my="xs" />
                    </>
                  }

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
                  <Box mb="xxxs">
                    <Tooltip tooltipText='Email Cadastrado!' isVisible={toolTipIsVisible} setIsVisible={(isVisible) => setToolTipIsVisible(isVisible)} />
                    <Typography fontFamily="reservaSerifRegular" fontSize={16}>
                      Receba novidades e promoções
                    </Typography>
                  </Box>
                  <OutlineInput
                    placeholder="Digite seu e-mail"
                    value={emailPromotions}
                    loading={loadingNewsLetter}
                    onChangeText={(email) => {
                      setEmailPromotions(email)
                      setEmailIsValid(
                        Yup.string()
                          .required()
                          .email()
                          .isValidSync(email)
                      );
                    }}
                    iconName="ChevronRight"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onPressIcon={newsAndPromotions}
                  />
                  {showMessageError && !emailIsValid &&
                    <Box mt="quarck">
                      <Typography
                        color="vermelhoAlerta"
                        fontFamily="nunitoRegular"
                        fontSize={13}
                      >
                        E-mail invalido
                      </Typography>
                    </Box>
                  }
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
        </KeyboardAvoidingView>
      </Box>

    </SafeAreaView>
  );
};


