import {
  useLazyQuery,
  useMutation,
} from '@apollo/client';
import remoteConfig from '@react-native-firebase/remote-config';
import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types';
import { addDays, format } from 'date-fns';
import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Share from 'react-native-share';
import {
  Box,
  Button,
  Divider,
  Icon,
  OutlineInput,
  ProductDetailCard,
  ProductVerticalListCardProps,
  RadioButtons,
  SelectColor,
  Typography,
} from '@usereservaapp/reserva-ui';
import * as Yup from 'yup';
import Config from 'react-native-config';
import { images } from '../../../assets';
import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../context/CartContext';
import {
  GET_PRODUCTS,
  GET_SHIPPING,
  SUBSCRIBE_NEWSLETTER,
} from '../../../graphql/product/productQuery';
import type { Seller, SKU } from '../../../graphql/products/productSearch';
import wishListQueries from '../../../graphql/wishlist/wishList';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import { Attachment } from '../../../services/vtexService';
import { ProductUtils } from '../../../shared/utils/productUtils';
import { TopBarDefaultBackButton } from '../../Menu/components/TopBarDefaultBackButton';
import { ExpandProductDescription } from '../components/ExpandProductDescription';
import { ModalBag } from '../components/ModalBag';
import { ModalTermsAndConditions } from '../components/ModalTermsAndConditions';
import { ModalZoomImage } from '../components/ModalZoomImage';
import { Recommendation } from '../components/Recommendation';
import { SizeGuide, SizeGuideImages } from '../components/SizeGuide';
import { Tooltip } from '../components/Tooltip';
import { GET_PRODUCT_WITH_SLUG } from '../../../graphql/product/getProductWithSlug';
import { slugify } from '../../../utils/slugify';
import EventProvider from '../../../utils/EventProvider';
import { platformType } from '../../../utils/platformType';
import { getItemPrice, ItemPrice } from '../../../utils/getItemPrice';
import { getPercent } from '../../../utils/getPercent';

const screenWidth = Dimensions.get('window').width;

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
  ListPrice: number;
  spotPrice: number;
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

export type Variant = {
  ean: string;
  itemId: string;
  images: {
    imageUrl: string;
  }[];
  sellers: Seller[];
  variations: Facets[] | undefined;
};

type Field = {
  name: string;
  originalName: string;
};

type Specification = {
  field: Field;
  values: Field[];
};
type Properties = {
  name: string;
  originalName: string;
  values: string[];
};
type Product = {
  categoryTree: any[]; // doesnt matter
  productId: string;
  productName: string;
  clusterHighlights?: ClusterHighlight[];
  skuSpecifications: Specification[];
  priceRange: {
    sellingPrice: Price;
    listPrice: Price;
  };
  properties: Properties[];
  items: SKU[];
  description: string;
};

export interface ClusterHighlight {
  id?: string;
  name?: string;
}

type ItemsSKU = {
  color: string;
  images: string[];
  sizeList: [id: string, size: string, available: boolean];
};
type ShippingCost = {
  selectedSla?: string;
  slas: {
    name: string;
    friendlyName: string;
    price: number;
    shippingEstimate: string;
  }[];
};

export const ProductDetail: React.FC<Props> = ({
  route,
  navigation,
  recomendedProducts,
}) => {
  /**
   * States
   */
  const [idSku, setIdSku] = useState<string>('');
  const [imageSelected, setImageSelected] = useState<any>([]);
  const [itemsSKU, setItemsSKU] = useState<any>([]);
  const [selectedVariant, setSelectedVariant] = useState<SKU | null>(null);
  const [outOfStock, setoutOfStock] = useState(false);
  const [toolTipIsVisible, setToolTipIsVisible] = useState(false);
  const [colorFilters, setColorFilters] = useState<string[] | undefined>([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedNewColor, setSelectedNewColor] = useState('');
  const [sizeFilters, setSizeFilters] = useState<string[] | undefined>([]);
  const [unavailableSizes, setUnavailableSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [errorSize, setErrorSize] = useState(false);
  const [selectedSellerId, setSelectedSellerId] = useState<string>('');
  const [sellerProduct, setSellerProduct] = useState<Seller | undefined>();
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleZoomImage, setIsVisibleZoomImage] = useState(false);
  const [skip, setSkip] = useState(false);
  const [avaibleUnits, setAvaibleUnits] = useState(undefined);
  const [saleOffTag, setSaleOffTag] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState(false);
  const [loadingNewsLetter, setLoadingNewsLetter] = useState(false);
  const [acceptConditions, setAcceptConditions] = useState(true);
  const [
    modalTermsAndConditionsisVisible,
    setModalTermsAndConditionsisVisible,
  ] = useState(false);
  const [wishInfo, setWishInfo] = useState({
    listIds: [''],
    inList: false,
  });
  const [product, setProduct] = useState<Product | null>(null);
  const [{ data, loading }, setProductLoad] = useState({
    data: null,
    loading: true,
  });
  const [cep, setCep] = useState('');
  const [emailPromotions, setEmailPromotions] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [showMessageError, setShowMessageError] = useState(false);
  const [isLastUnits, setIsLastUnits] = useState(false);
  const [imageIndexActual, setImageIndexActual] = useState<number>(0);
  const scrollRef = useRef<ScrollView>();
  const [shippingData, setShippingData] = useState<any | null>({});
  const [shippingCost, setShippingCost] = useState<ShippingCost[]>([]);

  /** Contexts */
  const { addItem, orderForm } = useCart();
  const { email } = useAuth();

  /**
   * Queries
   */
  const [getProduct] = useLazyQuery(GET_PRODUCTS, {
    variables: {
      field: route?.params?.productId ? 'id' : 'sku',
      value: route?.params?.productId
        ? route?.params?.productId?.split('-')[0]
        : idSku,
      salesChannel: 4,
    },
  });

  const [checkListRefetch] = useLazyQuery(wishListQueries.CHECK_LIST, {
    fetchPolicy: 'no-cache',
    nextFetchPolicy: 'no-cache',
  });

  const [getProductWithSlug] = useLazyQuery(GET_PRODUCT_WITH_SLUG);

  const [getShippingData] = useLazyQuery(GET_SHIPPING, {
    fetchPolicy: 'no-cache',
  });

  /**
   * Mutations
   */
  const [subscribeNewsletter] = useMutation(SUBSCRIBE_NEWSLETTER);
  const [addWishList] = useMutation(wishListQueries.ADD_WISH_LIST);
  const [removeWishList] = useMutation(wishListQueries.REMOVE_WISH_LIST);

  const isAssinaturaSimples = useMemo(() => {
    const description = 'A Camiseta Simples® é 100% algodão e tem certificação BCI (Better Cotton Iniciative)';

    return product?.description.includes(description);
  }, [product]);

  const refetch = () => {
    setProductLoad({
      data: null,
      loading: true,
    });

    getProduct().then((response) => {
      setProductLoad({
        data: response.data,
        loading: false,
      });
    });
  };

  const getAllUnavailableColors = ({ items }: Product) => {
    const colorsUnavailable = items.map((item) => {
      if (item.sellers[0].commertialOffer.AvailableQuantity <= 0) {
        return item.variations?.find(
          (variant) => variant.name === 'ID_COR_ORIGINAL',
        );
      }
    });

    return colorsUnavailable;
  };

  const getUrlFromIdColor = (idColor: string) => ({
    url: `${Config.URL_VTEX_ASSETS}/color-thumb-${idColor}.jpg`,
    id: idColor,
  });

  const getAllColors = ({ skuSpecifications }: Product) => {
    const colors = skuSpecifications
      .find(({ field }) => field.name === 'ID_COR_ORIGINAL')
      ?.values.map(({ name }) => name);
    return colors;
  };

  const getSeller = (sellers: Seller[]) => {
    sellers.forEach((seller) => {
      if (seller.commertialOffer.AvailableQuantity > 0) {
        setSelectedSellerId(seller.sellerId);
      }
      setSellerProduct(seller);
    });
  };

  const refetchChecklist = async () => {
    setSkip(true);
    if (product && product.productId) {
      const {
        data: { checkList },
      } = await checkListRefetch({
        variables: {
          shopperId: email || '',
          productId: product?.productId?.split('-')[0],
        },
      });

      if (checkList) {
        setWishInfo({ ...checkList });
      }
    }
  };

  const handleOnFavorite = async (favorite: boolean) => {
    if (email) {
      if (product && product.productId) {
        setLoadingFavorite(true);

        if (favorite) {
          const { data } = await addWishList({
            variables: {
              shopperId: email || '',
              productId: product?.productId?.split('-')[0],
              sku: selectedVariant?.itemId,
            },
          });
        } else {
          await removeWishList({
            variables: {
              shopperId: email || '',
              id: wishInfo.listIds[0],
            },
          });
        }
        await refetchChecklist();
        setLoadingFavorite(false);
      }
    } else {
      navigation.navigate('Login', { comeFrom: 'Favorite' });
    }
  };

  const getInstallments = () => {
    const chosenInstallment = selectedVariant?.sellers[0].commertialOffer.Installments.filter(
      ({ PaymentSystemGroupName }) => PaymentSystemGroupName === 'creditCardPaymentGroup',
    ).reduce(
      (prev, next) => (prev.NumberOfInstallments > next.NumberOfInstallments ? prev : next),
      { NumberOfInstallments: 0, Value: 0 },
    );
    return chosenInstallment;
  };

  const onShare = async (url: string) => {
    const domain = url.match(/^[^:]+:\/\/[^/?#]+/g);
    const path = url.replace(`${domain ? domain[0] : ''}`, '');

    const options = {
      message: 'Olha o que acabei de encontrar na Reserva: \n',
      title: 'Compartilhar',
      url: `${Config.URL_USER}${path}?skuId=${selectedVariant.itemId}`,
    };

    Share.open(options);
  };

  const addTagsUponCartUpdate = (
    productName?: string,
    productImageURL?: string,
  ) => {
    const timestamp = Math.floor(Date.now() / 1000);
    EventProvider.sendPushTags('sendAbandonedCartTags', {
      cart_update: timestamp.toString(),
      product_name: productName,
      product_image: productImageURL,
    });
  };

  const onProductAdd = async () => {
    if (!selectedSize) {
      setErrorSize(true);
      return;
    }
    if (selectedVariant) {
      const quantities = orderForm?.items
        .filter((items) => items.id === selectedVariant?.itemId)
        .map((x) => x.quantity)[0] || 0;
      if (isAssinaturaSimples) {
        if (acceptConditions) {
          const addItemResponse = await addItem({
            quantity: 1,
            itemId: selectedVariant?.itemId,
            seller: selectedSellerId,
          });

          if (!addItemResponse?.ok) {
            Alert.alert('Produto sem estoque', addItemResponse?.message);
          } else {
            setIsVisible(true);
            await addAttachmentsInProducts();

            if (quantities === 0 && orderForm?.items.length === 0) {
              addTagsUponCartUpdate(
                product?.productName,
                selectedVariant?.images[0]?.imageUrl,
              );
            }
          }
        }
      } else {
        const addItemResponse = await addItem({
          quantity: quantities + 1,
          itemId: selectedVariant?.itemId,
          seller: selectedSellerId,
        });

        if (!addItemResponse?.ok) {
          Alert.alert('Produto sem estoque', addItemResponse?.message);
        } else {
          setIsVisible(true);

          if (quantities === 0 && orderForm?.items.length === 0) {
            addTagsUponCartUpdate(
              product?.productName,
              selectedVariant?.images[0]?.imageUrl,
            );
          }
        }
      }
    }
  };

  const getUnavailableColors = ({ items }: Product) => items.map((item) => {
    if (item.sellers[0].commertialOffer.AvailableQuantity <= 0) {
      return item.variations?.find(
        (variant) => variant.name === 'ID_COR_ORIGINAL',
      );
    }
  });

  const getColorsList = ({ skuSpecifications }: Product) => skuSpecifications
    .find(({ field }) => field.name === 'ID_COR_ORIGINAL')
    ?.values.map(({ name }) => name);

  const getSizeList = ({ skuSpecifications }: Product) => skuSpecifications
    .find(({ field }) => field.name === 'TAMANHO' || field.name === 'Tamanho')
    ?.values.map(({ name }) => name);

  const getImagesPerColor = ({ items }: Product, color: string) => items.flatMap((item) => {
    const images = item.variations
      ?.map((v) => {
        if (['ID_COR_ORIGINAL'].includes(v.name)) {
          if (v.values[0] === color) {
            return item.images;
          }
        }
      })
      .filter((a) => a !== undefined);

    return images;
  });

  const getSizePerColor = ({ items }: Product, color: string) => items.flatMap((item) => {
    const variants = item.variations
      ?.map((v) => {
        if (['ID_COR_ORIGINAL'].includes(v.name)) {
          if (v.values[0] === color) {
            return {
              item,
              size:
                item?.variations?.filter(
                  (i) => i.name === 'TAMANHO' || i.name === 'Tamanho',
                )[0]?.values[0] || '',
              available:
                item.sellers[0].commertialOffer.AvailableQuantity > 0,
            };
          }
        }
      })
      .filter((a) => a !== undefined);

    return variants;
  });

  const consultZipCode = async (cep: string) => {
    const { data } = await getShippingData({
      variables: {
        items: [
          {
            quantity: '1',
            id: selectedVariant?.itemId.trim(),
            seller: selectedSellerId.trim(),
          },
        ],
        postalCode: cep.trim(),
      },
    });

    setShippingData(data);
  };

  const newsAndPromotions = async () => {
    if (emailIsValid) {
      setLoadingNewsLetter(true);

      const { data } = await subscribeNewsletter({
        variables: {
          email: emailPromotions,
          isNewsletterOptIn: true,
        },
      });

      setLoadingNewsLetter(false);

      if (!!data && data.subscribeNewsletter) {
        setToolTipIsVisible(true);
      }
    } else {
      setShowMessageError(true);
    }
  };

  // TODO tentar adicionar tipagem para o salOff
  const getSaleOff = (salOff: any) => {
    const idImage = salOff.clusterHighlights?.find((x: any) => x.id === '371');
    if (!saleOffTag) return null;
    if (idImage) return images.saleOff;
  };

  const getLastUnits = () => {
    const lastUnits = data?.product.items[0].sellers[0].commertialOffer.AvailableQuantity;
    if (lastUnits <= 5) {
      setIsLastUnits(true);
    } else {
      setIsLastUnits(false);
    }
  };

  const addAttachmentsInProducts = async () => {
    try {
      const orderFormId = orderForm?.orderFormId;
      const productOrderFormIndex = orderForm?.items?.length;
      const attachmentName = 'Li e Aceito os Termos';

      Attachment(orderFormId, productOrderFormIndex, attachmentName);
    } catch (error) {
      EventProvider.captureException(error);
      throw error;
    }
  };

  const handleScrollToTheTop = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
    setShippingData({});
    setCep('');
  };

  const initializePdp = (responseGrapthQl: any): void => {
    if (responseGrapthQl) {
      const { product } = responseGrapthQl;
      setProduct(product);

      // set default first selected variant
      let variant = product.items.find(
        (x: any) => x.sellers[0].commertialOffer.AvailableQuantity > 0,
      );

      setAvaibleUnits(variant?.sellers[0].commertialOffer.AvailableQuantity);
      setSelectedVariant(variant);

      const disabledColors = getUnavailableColors(product);
      getAllUnavailableColors(product);

      // set colors filter
      getColorsList(product);

      const colorList = getAllColors(product);

      // set size filter
      const sizeList = getSizeList(product);
      setSizeFilters(sizeList);

      if (sizeList?.length) {
        setSelectedSize(sizeList[0]);
      }

      const colorItemId = product.items
        .find((item: any) => item.itemId == route.params?.itemId)
        ?.variations?.find((x: any) => x.name == 'ID_COR_ORIGINAL')?.values;

      setColorFilters(colorList);

      // set initial selected color

      if (route.params?.itemId) {
        if (colorItemId) {
          setSelectedColor(colorItemId[0]);
          setSelectedNewColor(colorItemId[0]);
          variant = product.items.find(
            (x: any) => x.variations?.find((v) => v.name == 'ID_COR_ORIGINAL')
              ?.values[0] == colorItemId[0],
          );
        } else if (colorList) {
          setSelectedColor(colorList[0]);
          setSelectedNewColor(colorList[0]);
          variant = product.items.find(
            (x: any) => x.variations?.find((v: any) => v.name == 'ID_COR_ORIGINAL')
              ?.values[0] == colorList[0],
          );
        }
      } else {
        const skuId = (() => {
          if (idSku) return idSku;
          if (product.items.length) return product.items[0].itemId;
        })();

        if (skuId) {
          variant = product.items.find((x: any) => x.itemId == skuId);

          setSelectedColor(
            variant?.variations?.find((v: any) => v.name == 'ID_COR_ORIGINAL')
              ?.values[0],
          );
          setSelectedNewColor(
            variant?.variations?.find((v: any) => v.name == 'ID_COR_ORIGINAL')
              ?.values[0],
          );
        } else {
          setSelectedColor(colorList ? route.params.colorSelected : '');
          setSelectedNewColor(colorList ? route.params.colorSelected : '');
          variant = product.items.find(
            (x: any) => x.variations?.find((v: any) => v.name == 'ID_COR_ORIGINAL')
              ?.values[0] == route.params.colorSelected,
          );
        }
      }

      setSelectedVariant(variant);

      const itemList = colorList?.map((color) => ({
        color,
        images: getImagesPerColor(product, color),
        sizeList: getSizePerColor(product, color),
      }));

      setItemsSKU(itemList);

      try {
        EventProvider.logEvent('product_view', {
          product_id: product?.productId,
          product_name: product?.productName,
          product_category: product?.categoryTree.map((x: any) => x.name).join(),
          product_price: product?.priceRange?.listPrice?.lowPrice,
          product_currency: 'BRL',
        });
      } catch (error) {
        EventProvider.captureException(error);
      }
    }
  };

  const initialComponentWithProductSlug = async (
    slug: string,
  ): Promise<void> => {
    const { data, error } = await getProductWithSlug({
      variables: { slug },
    });

    if (typeof error !== 'undefined') {
      navigation.goBack();
      return;
    }

    initializePdp(data);
  };

  /** *
   * Effects
   */
  useEffect(() => {
    if (route.params?.slug) {
      initialComponentWithProductSlug(route.params.slug);
    }
  }, []);

  useEffect(() => {
    if (route.params?.skuId) {
      setIdSku(route.params.skuId);
    } else if (route.params?.idsku) {
      setIdSku(route.params.idsku);
    }
  }, [route.params?.skuId, route.params?.idsku]);

  if (route.params?.productId) {
    delete route.params.idsku;
    delete route.params.skuId;
  }

  useEffect(() => {
    if (!product?.productId || !product.productName || !product?.categoryTree?.length) return;

    EventProvider.logEvent('view_item', {
      currency: 'BRL',
      items: [
        {
          item_id: product?.productId,
          price: product?.priceRange?.sellingPrice?.lowPrice,
          quantity: 1,
          item_variant: '',
          item_name: product?.productName,
          item_category: Object.values(product?.categoryTree?.map((i) => (i?.name)) || {}).join('|'),
        },
      ],
      value: product?.priceRange?.sellingPrice?.lowPrice,
    });
  }, [EventProvider, product]);

  useEffect(() => {
    refetch();
  }, [route.params?.productId]);

  useEffect(() => {
    remoteConfig().fetchAndActivate();
    const value = remoteConfig().getValue('sale_off_tag');
    setSaleOffTag(value.asBoolean());

    refetch();
  }, []);

  useEffect(() => {
    refetchChecklist();
  }, [product]);

  useEffect(() => {
    refetchChecklist();
  }, [selectedVariant]);

  useEffect(() => {
    initializePdp(data);
  }, [data]);

  const [itemPrice, setItemPrice] = useState<ItemPrice>();

  useEffect(() => {
    const itemPriceInfo = getItemPrice(selectedVariant);
    setItemPrice(itemPriceInfo);
  }, [sellerProduct]);

  useEffect(() => {
    if (itemsSKU !== undefined && itemsSKU.length > 0 && selectedColor !== '') {
      setImageSelected(
        itemsSKU
          .map((p: any) => p.color === selectedColor && p.images)
          .filter((a: any) => a !== false),
      );

      const sizeFilters = new ProductUtils().orderSizes(
        itemsSKU
          .map(
            (p: any) => p.color === selectedColor
              && p.sizeList.map((sizes: any) => sizes.size),
          )
          ?.filter((a: any) => a !== false)[0]
          ?.filter((x: any) => x !== ''),
      );
      setSizeFilters(sizeFilters);

      const unavailableSizes = itemsSKU
        .map(
          (p: any) => p.color === selectedColor
            && p.sizeList.map((sizes: any) => !sizes.available && sizes.size),
        )
        ?.filter((a: any) => a !== false)[0];

      setUnavailableSizes(unavailableSizes);

      const hasSize = sizeFilters?.map((x) => unavailableSizes.includes(x));
      const index = hasSize?.findIndex((x) => x === false);
      if (index === -1) {
        setoutOfStock(true);
      } else {
        setoutOfStock(false);
      }
    }
  }, [selectedColor, itemsSKU]);

  // change sku effect
  useEffect(() => {
    if (product && selectedColor && selectedSize) {
      const { items } = product;
      // map sku variant hex
      const sizeColorSkuVariations = items.flatMap((i) => {
        const variants = i.variations
          ?.map((v) => {
            if (['ID_COR_ORIGINAL', 'Tamanho'].includes(v.name)) return v;
          })
          .filter((a) => a !== undefined);

        return {
          ...i,
          variations: variants,
        };
      });

      if (selectedColor != selectedNewColor) {
        setSelectedNewColor(selectedColor);
      }

      if (sizeColorSkuVariations) {
        const selectedSkuVariations: Facets[] = [
          {
            name: 'Tamanho',
            originalName: null,
            values: [selectedSize],
          },
          {
            name: 'ID_COR_ORIGINAL',
            originalName: null,
            values: [selectedColor],
          },
        ];
        const getVariant = (variants: any, getVariantId: string) => variants.filter((v: any) => v.name === getVariantId)[0]?.values[0]
          || '';

        const isSkuEqual = (sku1: any, sku2: any) => {
          if (sku1 && sku2) {
            const size1 = getVariant(sku1, 'Tamanho');
            const color1 = getVariant(sku1, 'ID_COR_ORIGINAL');
            const size2 = getVariant(sku2, 'Tamanho');
            const color2 = getVariant(sku2, 'ID_COR_ORIGINAL');

            return size1 === size2 && color1 === color2;
          }
        };
        const variantToSelect = sizeColorSkuVariations.find((i) => {
          if (i.variations) {
            const a = i.variations.map(
              ({ name, originalName, values }: any) => ({
                name,
                originalName,
                values,
              }),
            );
            return isSkuEqual(a, selectedSkuVariations);
          }
        });
        setSelectedVariant(variantToSelect);
      }
    }
  }, [selectedColor, selectedSize]);

  useEffect(() => {
    if (selectedVariant) getSeller(selectedVariant?.sellers);
  }, [selectedVariant]);

  useEffect(() => {
    if (shippingData) {
      setShippingCost(shippingData?.shipping?.logisticsInfo);
    }
  }, [shippingData]);

  useEffect(() => {
    getLastUnits();
  }, [selectedColor, selectedSize]);

  useEffect(() => {
    if (route.params?.hasCep) {
      setCep(route.params.hasCep);
      consultZipCode(route.params.hasCep);
    }
  }, [route.params?.hasCep]);

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

        <TopBarDefaultBackButton loading={loading} navigateGoBack />
        <KeyboardAvoidingView
          enabled
          behavior={Platform.OS === platformType.IOS ? 'padding' : undefined}
          style={{ marginBottom: 100 }}
        >
          <ScrollView
            contentContainerStyle={{ paddingBottom: 100 }}
            style={{ marginBottom: 24 }}
            ref={scrollRef}
          >
            {product && sellerProduct && (
              <>
                <ModalZoomImage
                  isVisible={isVisibleZoomImage}
                  image={
                    imageSelected.length > 0
                      ? imageSelected[0][0].map((image: any) => image.imageUrl)
                      : []
                  }
                  setIsVisibleZoom={setIsVisibleZoomImage}
                  setIndexOpenImage={imageIndexActual}
                />
                {/* PRODUCT CARD SECTION */}
                <ProductDetailCard
                  {...product}
                  testID={`productdetail_card_${slugify(product.productId)}`}
                  imagesHeight={3 * (screenWidth / 2)}
                  loadingFavorite={loadingFavorite}
                  title={product.productName}
                  // selectedVariant?.itemId
                  isFavorited={
                    wishInfo.inList
                    && product.items.some(
                      (x) => x.itemId === selectedVariant?.itemId,
                    )
                  }
                  onClickFavorite={handleOnFavorite}
                  price={sellerProduct.commertialOffer.ListPrice || 0}
                  priceWithDiscount={sellerProduct.commertialOffer.Price || 0}
                  imagesWidth={screenWidth}
                  images={
                    imageSelected.length > 0
                      ? imageSelected[0][0].map((image: any) => image.imageUrl)
                      : []
                  }
                  installmentsNumber={
                    getInstallments()?.NumberOfInstallments || 1
                  }
                  installmentsPrice={
                    getInstallments()?.Value
                    || sellerProduct.commertialOffer.Price
                    || 0
                  }
                  onClickShare={() => onShare(product.link)}
                  discountTag={
                    getPercent(
                      sellerProduct.commertialOffer.Price,
                      sellerProduct.commertialOffer.ListPrice,
                    ) || 0
                  }
                  saleOff={getSaleOff(product)}
                  setModalZoom={() => setIsVisibleZoomImage(true)}
                  imageIndexActual={(imageIndex) => setImageIndexActual(imageIndex)}
                  avaibleUnits={!outOfStock && avaibleUnits}
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
                        size={30}
                        disabledColors={[]}
                        listColors={
                          itemsSKU.map((p) => getUrlFromIdColor(p.color)) || []
                        }
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
                      <Typography variant="subtituloSessoes">
                        Tamanhos:
                      </Typography>
                      {!!product.categoryTree.find((x) => Object.keys(SizeGuideImages).includes(x.name)) && <SizeGuide categoryTree={product.categoryTree} />}
                    </Box>
                    <Box alignItems="flex-start" mt="xxxs">
                      <RadioButtons
                        size={38}
                        fontSize={12}
                        disbledOptions={
                          unavailableSizes || []
                        }
                        onSelectedChange={(item) => {
                          setSelectedSize(item);
                        }}
                        optionsList={sizeFilters || []}
                        defaultSelectedItem=""
                        selectedItem={selectedSize}
                      />
                    </Box>
                    {errorSize && !selectedSize && (
                      <Box>
                        <Typography
                          fontFamily="nunitoRegular"
                          fontSize="13px"
                          color="vermelhoAlerta"
                        >
                          Selecione um tamanho para continuar
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  {outOfStock && (
                    <Box mt="xxs" flexDirection="row" alignItems="center">
                      <Icon
                        name="Alert"
                        size={20}
                        color="vermelhoRSV"
                        mr="nano"
                      />
                      <Typography
                        fontFamily="reservaSansBold"
                        fontSize={15}
                        color="vermelhoRSV"
                      >
                        Produto Esgotado
                      </Typography>
                    </Box>
                  )}
                  {/* ADD TO CART BUTTON */}
                  <Button
                    mt="xxs"
                    title="ADICIONAR À SACOLA"
                    variant="primarioEstreito"
                    disabled={
                      outOfStock || (isAssinaturaSimples && !acceptConditions)
                    }
                    onPress={onProductAdd}
                    inline
                    testID="productdetail_button_add_cart"
                  />
                  <Box mt="nano" flexDirection="row" />
                  <Divider variant="fullWidth" my="xs" />

                  {/* CHECKLIST ASSINATURA SIMPLES INFO */}

                  {isAssinaturaSimples && (
                    <>
                      <Box flexDirection="row" alignItems="center" mb="xxxs">
                        <Box
                          alignItems="center"
                          justifyContent="center"
                          backgroundColor="verdeSucesso"
                          width={20}
                          height={20}
                          borderRadius="xxxs"
                          mr="micro"
                        >
                          <Icon
                            name="Check"
                            size={18}
                            color="white"
                            mt="nano"
                            ml="quarck"
                          />
                        </Box>

                        <Box>
                          <Box flexDirection="row">
                            <Typography variant="tituloSessao">
                              Receba
                              {' '}
                            </Typography>

                            <Typography
                              variant="tituloSessao"
                              fontWeight="bold"
                            >
                              3 camisetas
                              {' '}
                            </Typography>

                            <Typography variant="tituloSessao">
                              nos 12 meses de
                            </Typography>
                          </Box>

                          <Typography variant="tituloSessao">
                            assinatura.
                          </Typography>
                        </Box>
                      </Box>

                      <Box flexDirection="row" mb="xxxs" alignItems="center">
                        <Box
                          alignItems="center"
                          justifyContent="center"
                          backgroundColor="verdeSucesso"
                          width={20}
                          height={20}
                          borderRadius="xxxs"
                          mr="micro"
                        >
                          <Icon
                            name="Check"
                            size={18}
                            color="white"
                            mt="nano"
                            ml="quarck"
                          />
                        </Box>

                        <Box flexDirection="row" alignItems="center">
                          <Typography variant="tituloSessao" fontWeight="bold">
                            Ganhe 100%
                            {' '}
                          </Typography>

                          <Typography variant="tituloSessao">de </Typography>

                          <Typography variant="tituloSessao" fontStyle="italic">
                            cashback
                            {' '}
                          </Typography>

                          <Box
                            flexDirection="row"
                            alignSelf="flex-start"
                            mb="nano"
                          >
                            <Typography fontSize={3}>*</Typography>
                            <Typography fontSize={2}>1</Typography>
                          </Box>

                          <Typography fontSize={2}>.</Typography>
                        </Box>
                      </Box>

                      <Box flexDirection="row" alignItems="center" mb="xxxs">
                        <Box
                          alignItems="center"
                          justifyContent="center"
                          backgroundColor="verdeSucesso"
                          width={20}
                          height={20}
                          borderRadius="xxxs"
                          mr="micro"
                        >
                          <Icon
                            name="Check"
                            size={18}
                            color="white"
                            mt="nano"
                            ml="quarck"
                          />
                        </Box>

                        <Box>
                          <Box flexDirection="row" alignItems="center">
                            <Typography
                              variant="tituloSessao"
                              fontWeight="bold"
                            >
                              Receba 20% OFF
                              {' '}
                            </Typography>

                            <Typography variant="tituloSessao">
                              em todas as compras
                            </Typography>

                            <Box
                              flexDirection="row"
                              alignSelf="flex-start"
                              mb="nano"
                            >
                              <Typography fontSize={3}>*</Typography>
                              <Typography fontSize={2}>2</Typography>
                            </Box>
                          </Box>

                          <Typography variant="tituloSessao">
                            acima de R$ 399.
                          </Typography>
                        </Box>
                      </Box>

                      <Box flexDirection="row" alignItems="center" mb="xxxs">
                        <Box
                          alignItems="center"
                          justifyContent="center"
                          backgroundColor="verdeSucesso"
                          width={20}
                          height={20}
                          borderRadius="xxxs"
                          mr="micro"
                        >
                          <Icon
                            name="Check"
                            size={18}
                            color="white"
                            mt="nano"
                            ml="quarck"
                          />
                        </Box>

                        <Box>
                          <Box flexDirection="row">
                            <Typography
                              variant="tituloSessao"
                              fontWeight="bold"
                            >
                              Ganhe R$ 75
                              {' '}
                            </Typography>

                            <Typography variant="tituloSessao">
                              em créditos ao fim da anuidade,
                              {' '}
                            </Typography>
                          </Box>

                          <Box flexDirection="row">
                            <Typography variant="tituloSessao">
                              caso queira devolver as 3 camisetas
                            </Typography>

                            <Box
                              flexDirection="row"
                              alignSelf="flex-start"
                              mb="nano"
                            >
                              <Typography fontSize={3}>*</Typography>
                              <Typography fontSize={2}>3</Typography>
                            </Box>

                            <Typography variant="tituloSessao">.</Typography>
                          </Box>
                        </Box>
                      </Box>

                      <Box flexDirection="row" alignItems="center" mb="xxs">
                        <Box
                          alignItems="center"
                          justifyContent="center"
                          backgroundColor="verdeSucesso"
                          width={20}
                          height={20}
                          borderRadius="xxxs"
                          mr="micro"
                        >
                          <Icon
                            name="Check"
                            size={18}
                            color="white"
                            mt="nano"
                            ml="quarck"
                          />
                        </Box>

                        <Box>
                          <Typography variant="tituloSessao">
                            Ciclo sustentável: as peças devolvidas serão
                            {' '}
                          </Typography>

                          <Typography variant="tituloSessao">
                            recicladas.
                          </Typography>
                        </Box>
                      </Box>

                      <Box p="nano" backgroundColor="backgoundDivider">
                        <Box flexDirection="row">
                          <Typography
                            variant="precoAntigo3"
                            fontSize={1}
                            color="searchBarTextColor"
                          >
                            *1
                          </Typography>
                          <Typography
                            variant="precoAntigo3"
                            color="searchBarTextColor"
                          >
                            : Créditos mensais não cumulativos, expiram a cada
                            30
                          </Typography>
                        </Box>

                        <Typography
                          variant="precoAntigo3"
                          color="searchBarTextColor"
                        >
                          dias.
                        </Typography>

                        <Box flexDirection="row" mt="quarck">
                          <Typography
                            variant="precoAntigo3"
                            fontSize={1}
                            color="searchBarTextColor"
                          >
                            *2
                          </Typography>
                          <Typography
                            variant="precoAntigo3"
                            color="searchBarTextColor"
                          >
                            : 20% de desconto exceto para itens já em promoção.
                          </Typography>
                        </Box>

                        <Box flexDirection="row" mt="quarck">
                          <Typography
                            variant="precoAntigo3"
                            fontSize={1}
                            color="searchBarTextColor"
                          >
                            *3
                          </Typography>
                          <Typography
                            variant="precoAntigo3"
                            color="searchBarTextColor"
                          >
                            : Ao final da anuidade, crédito de R$ 25 por
                            camiseta
                          </Typography>
                        </Box>

                        <Typography
                          variant="precoAntigo3"
                          color="searchBarTextColor"
                        >
                          SimplesⓇ devolvida em lojas Reserva
                        </Typography>
                      </Box>

                      <Box flexDirection="row" alignItems="center" mt="xxxs">
                        <TouchableOpacity
                          onPress={() => setAcceptConditions(!acceptConditions)}
                        >
                          <Box
                            backgroundColor={
                              acceptConditions ? 'preto' : 'white'
                            }
                            width={14}
                            height={14}
                            border="1px"
                            borderColor="preto"
                            borderRadius="pico"
                            mr="nano"
                            alignItems="center"
                            justifyContent="center"
                          >
                            {acceptConditions && (
                              <Icon
                                name="Check"
                                size={14}
                                color="white"
                                mt="nano"
                                ml="quarck"
                              />
                            )}
                          </Box>
                        </TouchableOpacity>

                        <Box>
                          <Box flexDirection="row" alignItems="center">
                            <Typography variant="precoAntigo3" color="preto">
                              Ao adquirir a assinatura você aceita os
                              {' '}
                            </Typography>

                            <TouchableOpacity
                              onPress={() => setModalTermsAndConditionsisVisible(true)}
                            >
                              <Typography
                                variant="precoAntigo3"
                                color="preto"
                                fontWeight="bold"
                                style={{ textDecorationLine: 'underline' }}
                              >
                                termos e
                              </Typography>
                            </TouchableOpacity>
                          </Box>

                          <TouchableOpacity
                            onPress={() => setModalTermsAndConditionsisVisible(true)}
                          >
                            <Typography
                              variant="precoAntigo3"
                              color="preto"
                              fontWeight="bold"
                              style={{ textDecorationLine: 'underline' }}
                            >
                              condições.
                            </Typography>
                          </TouchableOpacity>
                        </Box>
                      </Box>

                      <Divider variant="fullWidth" my="xs" />
                    </>
                  )}

                  {/* DELIVERY INFO */}
                  <Typography fontFamily="reservaSerifRegular" fontSize={16}>
                    Consultar prazo e valor do frete
                  </Typography>

                  <Box flexDirection="row" mt="xxxs">
                    <OutlineInput
                      onChangeText={(text) => {
                        setCep(text);
                      }}
                      accessibilityLabel="productdetail_input_cep"
                      value={cep}
                      placeholder="Digite seu CEP"
                      iconName="Search"
                      keyboardType="number-pad"
                      keyboardAppearance="light"
                      maskType="zip-code"
                      onPressIcon={consultZipCode}
                    />
                  </Box>
                  <Button
                    marginBottom="nano"
                    alignSelf="flex-start"
                    marginTop="quarck"
                    testID="productdetail_button_cep"
                    onPress={() => {
                      navigation.navigate('ChangeRegionalization', {
                        isCepProductDetail: true,
                      });
                    }}
                  >
                    <Typography fontFamily="nunitoRegular" fontSize={14}>
                      Não sei meu CEP
                    </Typography>
                  </Button>
                  {shippingCost?.length > 0
                    && shippingCost[0]?.slas.map((item, key) => (
                      <Box
                        key={key}
                        flexDirection="row"
                        justifyContent="space-between"
                        marginTop="nano"
                      >
                        <Box
                          width="50%"
                          justifyContent="center"
                          borderColor="divider"
                        >
                          <Typography fontFamily="nunitoRegular" fontSize={14}>
                            {item.friendlyName}
                          </Typography>
                        </Box>
                        <Box
                          width="20%"
                          alignItems="center"
                          justifyContent="center"
                          borderColor="divider"
                        >
                          <Typography fontFamily="nunitoRegular" fontSize={14}>
                            {format(
                              addDays(
                                Date.now(),
                                parseInt(item?.shippingEstimate?.split('bd')[0]),
                              ),
                              'dd/MM',
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
                            {item.price > 0
                              ? `R$ ${item.price / 100}`
                              : 'GRÁTIS'}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  <Divider variant="fullWidth" my="xs" />

                  <ExpandProductDescription
                    description={product?.description || ''}
                    composition={product?.properties[0]?.values[0]}
                    codeProduct={
                      product?.items.find(
                        (x) => x.itemId === selectedVariant?.itemId,
                      )?.ean || ''
                    }
                  />

                  <Recommendation handleScrollToTheTop={handleScrollToTheTop} />

                  <Box mb="xxxs">
                    <Tooltip
                      tooltipText="Email Cadastrado!"
                      isVisible={toolTipIsVisible}
                      setIsVisible={(isVisible) => setToolTipIsVisible(isVisible)}
                    />
                    <Typography fontFamily="reservaSerifRegular" fontSize={16}>
                      Receba novidades e promoções
                    </Typography>
                  </Box>
                  <OutlineInput
                    placeholder="Digite seu e-mail"
                    value={emailPromotions}
                    loading={loadingNewsLetter}
                    onChangeText={(email) => {
                      setEmailPromotions(email);
                      setEmailIsValid(
                        Yup.string().required().email().isValidSync(email),
                      );
                    }}
                    accessibilityLabel="productdetail_input_email"
                    iconName="ChevronRight"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onPressIcon={newsAndPromotions}
                  />
                  {showMessageError && !emailIsValid && (
                    <Box mt="quarck">
                      <Typography
                        color="vermelhoAlerta"
                        fontFamily="nunitoRegular"
                        fontSize={13}
                      >
                        E-mail invalido
                      </Typography>
                    </Box>
                  )}
                </Box>
              </>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </Box>
    </SafeAreaView>
  );
};
