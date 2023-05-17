import { useLazyQuery } from '@apollo/client';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import {
  Alert,
  Box,
  Button,
  Divider,
  Icon,
  Image,
  ProductHorizontalListCard,
  RadioButtons,
  TextField,
  Typography,
} from '@usereservaapp/reserva-ui';
import { loadingSpinner } from '@usereservaapp/reserva-ui/src/assets/animations';
import LottieView from 'lottie-react-native';
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { createAnimatableComponent } from 'react-native-animatable';
import Modal from 'react-native-modal';
import appsFlyer from 'react-native-appsflyer';
import analytics from '@react-native-firebase/analytics';
import { instance2 } from '../../../config/vtexConfig';
import ToastProvider, { showToast } from '../../../utils/Toast';
import Sentry from '../../../config/sentryConfig';
import { useAuth } from '../../../context/AuthContext';
import { IOrderFormItem, OrderForm, useCart } from '../../../context/CartContext';
import { profileQuery } from '../../../graphql/profile/profileQuery';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import { Attachment, RemoveItemFromCart } from '../../../services/vtexService';
import { ProductUtils } from '../../../shared/utils/productUtils';
import EventProvider from '../../../utils/EventProvider';
import { slugify } from '../../../utils/slugify';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import { CouponBadge } from '../components/CouponBadge';
import { EmptyBag } from '../components/EmptyBag';
import { PriceCustom } from '../components/PriceCustom';
import { Recommendation } from '../components/Recommendation';
import { ShippingBar } from '../components/ShippingBar';
import { Skeleton } from '../components/Skeleton';
import { platformType } from '../../../utils/platformType';
import { getPercent } from '../../../utils/getPercent';
import { MktplaceName } from '../../MarketplaceIn/components/MktPlaceName';
import {
  getAFContent,
  getAFContentId, getAFContentType, getQuantity, sumQuantity,
} from '../../../utils/checkoutInitiatedEvents';
import testProps from '../../../utils/testProps';

const screenWidth = Dimensions.get('window').width;

const BoxAnimation = createAnimatableComponent(Box);

type Props = StackScreenProps<RootStackParamList, 'BagScreen'>;

const WithAvoidingView = ({ children }: { children: React.ReactNode }) => {
  if (Platform.OS === platformType.IOS) {
    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        {children}
      </KeyboardAvoidingView>
    );
  }

  return <>{children}</>;
};

export const BagScreen = ({ route }: Props) => {
  const { email, cookie } = useAuth();
  const navigation = useNavigation();
  const {
    loading,
    topBarLoading,
    orderForm,
    addItem,
    orderform,
    setGiftSizeRequest,
    removeItem,
    addCoupon,
    identifyCustomer,
    removeCoupon,
    removeSellerCoupon,
    addCustomer,
    restoreCart,
    sellerCode,
    sellerName,
    applyCouponOnPressed,
    hasErrorApplyCoupon,
    toggleGiftWrapping,
  } = useCart();

  const { isProfileComplete } = route?.params;
  const orderFormIdByDeepLink = route?.params?.orderFormId;
  const fontTitle = screenWidth * (Platform.OS === platformType.ANDROID ? 0.0352 : 0.036);

  const subtitle = screenWidth * 0.032;
  const [loadingGoDelivery, setLoadingGoDelivery] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const modalRef = useRef(false);
  const viewRef = useRef(null);
  const [totalBag, setTotalBag] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [isRemoveCartTags, setIsRemoveCartTags] = useState(false);
  const [loadingGift, setLoadingGift] = useState(false);
  const [removeProduct, setRemoveProduct] = useState<
  { id: string; index: number; seller: string; quantity?: number } | undefined
  >();
  const [totalDiscountPrice, setTotalDiscountPrice] = useState(0);
  const [loadingShippingBar, setLoadingShippingBar] = useState(false);
  const [totalDelivery, setTotalDelivery] = useState(0);
  const [showLikelyProducts, setShowLikelyProducts] = React.useState(true);
  const [showMoreSizes, setShowMoreSizes] = useState(false);
  const [sellerCoupon, setSellerCoupon] = React.useState<string>('');
  const [discountCoupon, setDiscountCoupon] = React.useState<string>('');
  const [selectedSizeGift, setSelectedSizeGift] = useState<string | undefined>(
    '',
  );
  const [giftColors, setGiftColors] = useState<string[]>([]);
  const [giftSizeList, setGiftSizeList] = useState<string[]>([]);
  const [selectableGifts, setSelectableGifts] = useState<IOrderFormItem[]>([]);
  const [selectedGiftColor, setSelectedGiftColor] = useState<string>('');
  const [couponIsInvalid, setCouponIsInvalid] = useState<boolean | undefined>(
    false,
  );
  const [noProduct, setNoProduct] = useState<any>('');
  const [errorsMessages, setErrorsMessages] = useState<any>([]);
  const [optimistQuantities, setOptimistQuantities] = useState(
    orderForm?.items.map((x) => x.quantity) || [],
  );
  const [installmentInfo, setInstallmentInfo] = useState({
    installmentsNumber: 0,
    installmentPrice: 0,
    totalPrice: 0,
  });

  const [restoreCartLoading, setRestoreCartLoading] = useState(false);

  const showMoreGiftSize = giftSizeList && giftSizeList.length > 5;

  useEffect(() => {
    Sentry.configureScope((scope) => scope.setTransactionName('BagScreen'));
  }, []);

  const hasSellerCoupon = useCallback(
    (): boolean => sellerCoupon.length > 0,
    [sellerCoupon],
  );

  const hasDiscountCoupon = useCallback(
    (): boolean => discountCoupon.length > 0,
    [discountCoupon],
  );

  const [isEmptyProfile, setIsEmptyProfile] = useState(false);
  const [profile, setProfile] = useState();

  const [{ data, loadingProfile, refetch }, setProfileData] = useState({
    data: {} as any,
    loadingProfile: true,
    refetch: () => { },
  });

  const [getProfile] = useLazyQuery(profileQuery, { fetchPolicy: 'no-cache' });

  const createSkuIds = () => orderForm?.items.map(({ id }) => `fq=skuId:${id}`).join('&');

  const removeUnavailableItems = useCallback(async (): Promise<boolean> => {
    let hasError = false;

    try {
      const skuIds = createSkuIds();
      const path = `catalog_system/pub/products/search?${skuIds}`;
      const { data: productsData } = await instance2.get(path);

      orderForm?.items.map(async ({
        id, seller: sellerId, productId, quantity,
      }, index) => {
        const product = productsData.filter((
          productData: any,
        ) => productData?.productId === productId)[0];

        const skuItem = product?.items?.filter((item: any) => item?.itemId === id)[0];

        const sellerItem = skuItem?.sellers?.filter(
          (seller: any) => seller?.sellerId === sellerId,
        )[0];

        const availableQuantity = sellerItem?.commertialOffer?.AvailableQuantity;

        const emptyQuantity = availableQuantity === 0 && !sellerItem?.IsAvailable;

        const hasAvailableQuantityFromStock = availableQuantity >= quantity;

        const updateQuantity = hasAvailableQuantityFromStock ? quantity : availableQuantity;

        if (emptyQuantity || !hasAvailableQuantityFromStock) {
          await RemoveItemFromCart(orderForm?.orderFormId, id, index, sellerId, updateQuantity);
          hasError = true;
          showToast({ type: 'error', text1: 'Alguns produtos da sua sacola estão indisponiveis' });
        }
      });

      return hasError;
    } catch (e) {
      hasError = true;
      return hasError;
    }
  }, []);

  useEffect(() => {
    removeUnavailableItems();
  }, [removeUnavailableItems]);

  useEffect(() => {
    getProfile().then((response) => {
      setProfileData({
        data: response.data,
        loadingProfile: false,
        refetch: response.refetch,
      });
    });
  }, []);

  const setCustomer = async (email: string) => identifyCustomer(email);

  // Updating ClientProfileData in orderForm
  const updateClientProfileData = async (profile: any) => {
    if (profile) {
      const addCustomerData = await addCustomer({
        firstName: profile?.firstName,
        lastName: profile?.lastName,
        document: profile?.document,
        documentType: 'cpf',
        phone: profile?.homePhone,
      });
    }
  };

  const validateFieldsProfile = async (profile: any) => {
    if (profile) {
      if (
        profile?.firstName?.length === 0
        || profile?.firstName === null
        || profile?.lastName?.length === 0
        || profile?.lastName === null
        || profile?.birthDate?.length === 0
        || profile?.birthDate === null
        || profile?.homePhone?.length === 0
        || profile?.homePhone === null
        || profile?.document?.length === 0
        || profile?.document === null
        || profile?.gender?.length === 0
        || profile?.gender === null
      ) {
        setIsEmptyProfile(true);
      } else {
        setIsEmptyProfile(false);
      }
    }
  };

  useEffect(() => {
    if (data) {
      const { profile } = data;
      if (profile) {
        updateClientProfileData(profile);
        validateFieldsProfile(profile);
        setProfile(profile);
      }
    }
  }, [data]);

  const initialCartExecute = useCallback(async () => {
    await orderform();

    if (orderFormIdByDeepLink) {
      await restoreCart(orderFormIdByDeepLink).then(() => orderform());
      return;
    }

    if (orderForm) {
      await restoreCart(orderForm?.orderFormId);
    }
  }, [orderFormIdByDeepLink]);

  useEffect(() => {
    initialCartExecute();

    if (email) {
      setCustomer(email);
    }
  }, [initialCartExecute, orderFormIdByDeepLink]);

  useFocusEffect(
    useCallback(() => {
      if (data) {
        refetch();
      }
    }, []),
  );

  useEffect(() => {
    const totalItensPrice = (orderForm?.totalizers.find((x) => x.id === 'Items')?.value || 0) / 100;
    const totalDiscountPrice = (orderForm?.totalizers.find((x) => x.id === 'Discounts')?.value || 0)
      / 100;
    const totalDelivery = (orderForm?.totalizers.find((x) => x.id === 'Shipping')?.value || 0)
      / 100;

    const errorMessages = orderForm?.messages.map(({ text }: any) => text);
    setErrorsMessages(errorMessages);

    const installment = orderForm?.paymentData?.installmentOptions
      ?.find((x) => x.paymentSystem === '4')
      ?.installments?.reverse()[0] || null;

    const quantities = orderForm?.items.map((x) => x.quantity) || [];

    let sizeFilters: string[] = [];
    let giftSizeList: IOrderFormItem[] = [];
    const alreadySelectedGift = orderForm?.items.find(
      (x) => x.isGift == true && x.sellingPrice == 0,
    );

    const giftColors = orderForm?.selectableGifts[0]?.availableGifts.map(
      (x) => x?.skuName?.split('-')[0],
    );
    const uniqueGiftColors = [...new Set(giftColors)];

    setGiftColors(uniqueGiftColors);
    if (alreadySelectedGift) {
      const result = orderForm?.selectableGifts[0]?.availableGifts.filter(
        (x) => x?.skuName?.split('-')[0] === alreadySelectedGift?.skuName?.split('-')[0],
      );
      if (result?.length) {
        giftSizeList = result;
      }
    } else {
      const result = orderForm?.selectableGifts[0]?.availableGifts.filter(
        (x) => x?.skuName?.split('-')[0] === uniqueGiftColors[0],
      );
      if (result?.length) {
        giftSizeList = result;
      }
      setSelectedGiftColor(uniqueGiftColors[0]);
    }
    if (giftSizeList.length) {
      setSelectableGifts(giftSizeList);
      sizeFilters = new ProductUtils().orderSizes(
        giftSizeList.map((x) => x?.skuName?.split('-')[1]?.trim()),
      );
      setGiftSizeList(sizeFilters);
    }
    if (alreadySelectedGift) {
      setSelectedGiftColor(alreadySelectedGift?.skuName?.split('-')[0]);
      setSelectedSizeGift(alreadySelectedGift?.skuName?.split('-')[1]);
    } else if (sizeFilters?.length) {
      handleSelectGiftSize(sizeFilters[0]);
      setSelectedGiftColor(sizeFilters[0]);
    }

    setInstallmentInfo(
      installment
        ? {
          installmentPrice: installment.value,
          installmentsNumber: installment.count,
          totalPrice: installment.total,
        }
        : {
          ...installmentInfo,
        },
    );

    setOptimistQuantities(quantities);
    setTotalBag(totalItensPrice);
    setTotalDiscountPrice(totalDiscountPrice);
    setTotalDelivery(totalDelivery);

    if (orderForm?.items.length === 0) {
      setRestoreCartLoading(false);
    }
  }, [orderForm]);

  useEffect(() => {
    if (orderForm && orderForm.items.length > 0) {
      if (isRemoveCartTags) {
        const timestamp = Math.floor(Date.now() / 1000);
        EventProvider.sendPushTags('sendAbandonedCartTags', {
          cart_update: timestamp.toString(),
          product_name: orderForm?.items[0]?.name,
          product_image: orderForm?.items[0]?.imageUrl?.replace('http', 'https')?.split('-55-55')?.join(''),
        });
      }
    }
  }, [isRemoveCartTags]);

  useEffect(() => {
    if (viewRef.current) {
      viewRef?.current?.slideInDown();
    }
  }, [noProduct]);

  const handleAddCoupons = async () => {
    try {
      const isCouponInvalid = await addCoupon(discountCoupon);
      setCouponIsInvalid(isCouponInvalid);
      setDiscountCoupon('');
      orderform();
    } catch (error) {
      Sentry.addBreadcrumb({
        message: 'Erro ao inserir o cupom de desconto',
        data: {
          error,
        },
      });
    }
  };

  const handleAddSellerCoupons = async () => {
    setSellerCoupon('');
    await applyCouponOnPressed(sellerCoupon);
  };

  const onGoToDelivery = async () => {
    const hasError = await removeUnavailableItems();

    if (hasError) {
      return;
    }

    setLoadingGoDelivery(true);
    if (orderForm && orderForm?.items) {
      const arr = getQuantity(orderForm.items);

      try {
        const { items } = orderForm;
        if (items.length) {
          const newItems = items.map((item) => ({
            price: item?.price / 100 ?? 0,
            item_id: item?.productId,
            quantity: item?.quantity,
            item_name: item?.name,
            item_variant: item?.skuName,
            item_category: 'product',
          }));

          EventProvider.logEvent('begin_checkout', {
            coupon: '',
            currency: 'BRL',
            items: newItems,
            value: totalBag + totalDiscountPrice + totalDelivery,
          });
        }

        appsFlyer.logEvent('af_initiated_checkout', {
          af_content_type: 'product',
          af_price: totalBag + totalDiscountPrice + totalDelivery,
          af_currency: 'BRL',
          af_content_id: getAFContentId(orderForm.items),
          af_quantity: sumQuantity(orderForm.items),
          af_content: getAFContent(orderForm.items),
        });

        const contentTypeItems = getAFContentType(orderForm.items);
        const contentIdsItems = getAFContentId(orderForm.items);

        await analytics().logEvent('checkout_initiated', {
          price: totalBag + totalDiscountPrice + totalDelivery,
          content_type: JSON.stringify(contentTypeItems),
          content_ids: JSON.stringify(contentIdsItems),
          currency: 'BRL',
          quantity: getAFContent(arr),
        });
      } catch (error) {
        EventProvider.captureException(error);
      }

      if (!email) {
        setLoadingGoDelivery(false);

        navigation.navigate('Login', { comeFrom: 'Checkout' });
      } else if (isEmptyProfile && !isProfileComplete) {
        setLoadingGoDelivery(false);
        navigation.navigate('EditProfile', { isRegister: true });
      } else {
        try {
          await identifyCustomer(email)
            .then(() => setLoadingGoDelivery(false))
            .then(() => navigation.navigate('DeliveryScreen', {}));
        } catch (error) {
          Sentry.addBreadcrumb({
            message: 'Erro na chamada para tela de entrega',
            data: {
              error,
            },
          });
        }
      }
    }
  };

  useEffect(() => {
    setLoadingShippingBar(true);
  }, [optimistQuantities]);

  const addAttachmentsInProducts = async () => {
    const orderFormId = orderForm?.orderFormId;
    const productOrderFormIndex = orderForm?.items.length;
    const attachmentName = 'Li e Aceito os Termos';
    Attachment(orderFormId, productOrderFormIndex, attachmentName);
  };

  const fetchSelectGiftSize = async (gift: IOrderFormItem) => {
    await setGiftSizeRequest(
      orderForm?.orderFormId,
      orderForm?.selectableGifts[0]?.id.trim(),
      gift.id,
      gift.seller,
    );
  };

  const handleSelectedGiftColor = async (color: string) => {
    const giftSizeList = orderForm?.selectableGifts[0]?.availableGifts.filter(
      (x) => x.skuName?.split('-')[0] === color,
    );
    let sizeFilters: string[] = [];
    if (giftSizeList?.length) {
      setSelectableGifts(giftSizeList);
      setSelectedGiftColor(giftSizeList[0]?.skuName?.split('-')[0]);
      sizeFilters = new ProductUtils().orderSizes(
        giftSizeList.map((x) => x?.skuName?.split('-')[1]?.trim()),
      );
      if (sizeFilters.length > 0) {
        let hasSize: IOrderFormItem[] = [];
        hasSize = giftSizeList.filter(
          (item) => item?.skuName?.split('-')[1]?.trim() === selectedSizeGift?.trim(),
        );
        const firstSize = giftSizeList?.find(
          (item) => item?.skuName?.split('-')[1]?.trim() === sizeFilters[0],
        );
        setGiftSizeList(sizeFilters);
        if (hasSize.length > 0) {
          await fetchSelectGiftSize(hasSize[0]);
          setSelectedSizeGift(hasSize[0]?.skuName?.split('-')[1]?.trim());
        } else if (firstSize) {
          await fetchSelectGiftSize(firstSize);
          setSelectedSizeGift(firstSize?.skuName?.split('-')[1]?.trim());
        }
      }
    }
  };

  const handleSelectGiftSize = async (size: string) => {
    const availableGifts = selectableGifts.find(
      (x) => x?.skuName?.split('-')[1]?.trim() === size?.trim(),
    );
    if (availableGifts) {
      await fetchSelectGiftSize(availableGifts);
    }
    setSelectedSizeGift(size);
  };

  const removeAbandonedCartTags = () => {
    EventProvider.sendPushTags('sendAbandonedCartTags', {
      cart_update: '',
      product_name: '',
      product_image: '',
    });
  };

  const handleToggleGiftCheckbox = async (
    value: boolean,
    index: number,
    item: IOrderFormItem,
    orderForm: OrderForm,
  ) => {
    const { orderFormId } = orderForm;

    if (!orderFormId) return;

    await toggleGiftWrapping(
      value,
      orderFormId,
      item,
      index,
      cookie ?? undefined,
    );
  };

  const giftImage = React.useMemo(() => selectableGifts[0]?.imageUrl?.replace('http', 'https')?.split('-55-55')?.join(''), [selectableGifts]);

  return (
    <SafeAreaView
      {...testProps('com.usereserva:id/page_bag')}
      style={{
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}
    >

      <TopBarBackButton
        showShadow
        loading={loadingGoDelivery || loadingGift || topBarLoading}
      />

      {(!orderForm?.items.length && !loading && !restoreCartLoading) ? (
        <Box flex={1}>
          <EmptyBag onPress={() => navigation.navigate('Offers')} />
        </Box>
      ) : (
        <WithAvoidingView>
          {loading ? (
            <Box>
              <Skeleton>
                <Box marginRight={15} marginLeft={21}>
                  <Box
                    bg="neutroFrio1"
                    height={35}
                    width={175}
                    marginTop={23}
                  />

                  <Box flexDirection="row" marginTop={30}>
                    <Box
                      bg="neutroFrio1"
                      width={99}
                      height={148}
                      marginRight={8}
                    />

                    <Box width={217} height={148}>
                      <Box bg="neutroFrio1" width={217} height={22} />

                      <Box width="100%" flexDirection="row">
                        <Box
                          bg="neutroFrio1"
                          width={79}
                          height={18}
                          marginTop={7}
                          marginRight={9}
                        />
                        <Box
                          bg="neutroFrio1"
                          width={79}
                          height={18}
                          marginTop={7}
                        />
                      </Box>

                      <Box
                        bg="neutroFrio1"
                        width={167}
                        height={18}
                        marginTop={7}
                      />
                      <Box
                        bg="neutroFrio1"
                        width={221}
                        height={18}
                        marginTop={7}
                      />
                      <Box
                        bg="neutroFrio1"
                        width={115}
                        height={22}
                        marginTop={7}
                      />
                    </Box>
                  </Box>

                  <Box
                    bg="neutroFrio1"
                    width="100%"
                    height={2}
                    marginTop={28}
                    marginBottom={23}
                  />

                  <Box flexDirection="row">
                    <Box
                      bg="neutroFrio1"
                      width={232}
                      height={22}
                      marginRight={15}
                    />
                    <Box bg="neutroFrio1" width={77} height={22} />
                  </Box>

                  <Box
                    bg="neutroFrio1"
                    width="100%"
                    height={2}
                    marginTop={19}
                    marginBottom={19}
                  />

                  <Box bg="neutroFrio1" width={232} height={22} />

                  <Box
                    bg="neutroFrio1"
                    width="100%"
                    height={47}
                    marginTop={19}
                  />

                  <Box flexDirection="row" marginTop={19} width="100%">
                    <Box
                      bg="neutroFrio1"
                      width={200}
                      height={50}
                      marginRight={12}
                    />
                    <Box bg="neutroFrio1" width={122} height={50} />
                  </Box>

                  <Box flexDirection="row" marginTop={19} width="100%">
                    <Box
                      bg="neutroFrio1"
                      width={200}
                      height={50}
                      marginRight={12}
                    />
                    <Box bg="neutroFrio1" width={122} height={50} />
                  </Box>

                  <Box flexDirection="row" marginTop={19} width="100%">
                    <Box
                      bg="neutroFrio1"
                      width={200}
                      height={50}
                      marginRight={12}
                    />
                    <Box bg="neutroFrio1" width={122} height={50} />
                  </Box>
                </Box>
              </Skeleton>
            </Box>
          ) : (
            <>
              {noProduct?.length > 0 && (
                <Animatable.View
                  ref={viewRef}
                  animation="slideInDown"
                  style={{
                    elevation: 10,
                    position: 'absolute',
                    right: 0,
                    left: 0,
                    zIndex: 2,
                  }}
                >
                  <Box
                    minHeight={60}
                    bg="white"
                    paddingLeft="xxxs"
                    py="micro"
                    flexDirection="row"
                    alignItems="center"
                    paddingRight="xxxs"
                    boxShadow={Platform.OS === platformType.IOS ? 'topBarShadow' : null}
                    style={{ elevation: 10 }}
                  >
                    <Box flex={1}>
                      <Typography
                        fontFamily="nunitoRegular"
                        fontSize={13}
                        color="preto"
                      >
                        {noProduct}
                      </Typography>
                    </Box>
                    <Button testID="com.usereserva:id/close_bag_button" flex={1} onPress={() => setNoProduct('')}>
                      <Icon name="Close" size={15} color="preto" ml="xxxs" />
                    </Button>
                  </Box>
                </Animatable.View>
              )}

              <ScrollView>
                <Modal testID="com.usereserva:id/modal_delet_product_bag" isVisible={loadingModal}>
                  <Box
                    zIndex={5}
                    height="100%"
                    width="100%"
                    opacity={0.65}
                    position="absolute"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <LottieView
                      source={loadingSpinner}
                      style={{
                        width: 60,
                      }}
                      autoPlay
                      loop
                    />
                  </Box>
                </Modal>

                <Alert
                  onModalHide={() => {
                    modalRef.current && setSuccessModal(true);
                  }}
                  isVisible={showModal}
                  title="Excluir produto"
                  subtitle="Tem certeza que deseja excluir o produto salvo em sua sacola?"
                  confirmText="SIM"
                  cancelText="NÃO"
                  disabled={loadingModal}
                  onConfirm={async () => {
                    modalRef.current = true;
                    if (removeProduct) {
                      setShowModal(false);
                      setLoadingModal(true);
                      const removedProductIndex = removeProduct?.index;

                      const { ok } = await removeItem(
                        removeProduct?.id,
                        removeProduct?.index,
                        removeProduct?.seller,
                        0,
                      );

                      if (ok) {
                        if (removedProductIndex === 0) {
                          setIsRemoveCartTags(true);
                          removeAbandonedCartTags();
                        }
                      }
                      setRemoveProduct(undefined);
                      setLoadingModal(false);
                    }
                    setShowModal(false);
                  }}
                  onCancel={() => {
                    setShowModal(false);
                  }}
                  onClose={() => {
                    setShowModal(false);
                  }}
                />
                <Box paddingX="xxxs" paddingY="xxs">
                  <Box bg="white" marginTop="xxs">
                    <Typography testID="com.usereserva:id/title_bag" variant="tituloSessoes">
                      Sacola (
                      {optimistQuantities.reduce(
                        (accumulator, currentValue) => accumulator + currentValue,
                        0,
                      )}
                      )
                    </Typography>
                  </Box>

                  <ShippingBar
                    loading={loadingShippingBar}
                    sumPriceShipping={totalBag + totalDiscountPrice}
                    totalDelivery={totalDelivery != 0 ? totalDelivery : 0}
                  />
                  {orderForm
                  && orderForm.selectableGifts.length > 0
                  && giftImage && (
                    <Box flexDirection="row" minHeight={152} mt={20}>
                      <Image
                        source={giftImage}
                        width={screenWidth * 0.25}
                        height={152}
                      />

                      <Box ml={12} flex={1} minHeight={152}>
                        <Box minHeight={93}>
                          <Box>
                            <Typography
                              fontFamily="reservaSerifBold"
                              fontSize={fontTitle}
                            >
                              Parabéns, você ganhou um brinde!
                            </Typography>
                          </Box>

                          <Box minHeight={48}>
                            <Typography
                              fontFamily="reservaSansLight"
                              fontSize={subtitle}
                            >
                              Sua compra tem uma vantagem especial:
                            </Typography>
                            <Typography
                              fontFamily="reservaSansLight"
                              fontSize={subtitle}
                            >
                              você ganhou
                              <Typography
                                fontFamily="reservaSansBold"
                                fontSize={subtitle}
                              >
                                {' '}
                                1
                                {' '}
                                {selectableGifts[0]?.name?.split('-')[0]?.trim()}
                              </Typography>
                            </Typography>
                          </Box>
                          <ScrollView {...testProps('com.usereserva:id/bag_selected_color_bag')} horizontal>
                            <Box
                              alignItems="flex-start"
                              flexWrap="wrap"
                              flexDirection="row"
                            >
                              {giftColors.map((item, index) => (
                                <Button
                                  testID="com.usereserva:id/selected_color_product_bag"
                                  key={`${index}_btn`}
                                  onPress={() => {
                                    selectedGiftColor !== item
                                      && handleSelectedGiftColor(item);
                                  }}
                                >
                                  <Box
                                    borderWidth="hairline"
                                    borderColor="divider"
                                    borderRadius="pico"
                                    height={screenWidth * 0.06}
                                    bg={
                                      selectedGiftColor === item
                                        ? 'preto'
                                        : 'white'
                                    }
                                    alignItems="center"
                                    justifyContent="center"
                                    paddingX="nano"
                                    marginRight={
                                      index < item.length ? 'micro' : null
                                    }
                                  >
                                    <Typography
                                      color={
                                        selectedGiftColor === item
                                          ? 'white'
                                          : 'preto'
                                      }
                                      fontFamily="reservaSansBold"
                                      fontSize={10.3}
                                    >
                                      {item}
                                    </Typography>
                                  </Box>
                                </Button>
                              ))}
                            </Box>
                          </ScrollView>
                        </Box>

                        <Box testID="com.usereserva:id/selected_size_bag" minHeight={59}>
                          <Box
                            mb={10}
                            flexDirection="row"
                            justifyContent="space-between"
                          >
                            <Typography
                              fontFamily="reservaSansBold"
                              fontSize={subtitle}
                            >
                              Selecione o tamanho
                            </Typography>

                            {showMoreGiftSize && (
                              <Button
                                testID="com.usereserva:id/show_more_size_button"
                                onPress={() => setShowMoreSizes(!showMoreSizes)}
                                hitSlop={{ left: 50, top: 15, bottom: 15 }}
                              >
                                <BoxAnimation
                                  flexDirection="row"
                                  justifyContent="space-between"
                                  alignItems="center"
                                >
                                  <Typography
                                    fontFamily="reservaSansRegular"
                                    fontSize={subtitle}
                                  >
                                    Ver mais
                                  </Typography>

                                  <Icon
                                    style={
                                      showMoreSizes
                                        ? {
                                          transform: [{ rotate: '-90deg' }],
                                        }
                                        : { transform: [{ translateY: 4 }] }
                                    }
                                    name={
                                      showMoreSizes
                                        ? 'ChevronRight'
                                        : 'ArrowDown'
                                    }
                                    color="preto"
                                    marginLeft="nano"
                                    size={12}
                                  />
                                </BoxAnimation>
                              </Button>
                            )}
                          </Box>
                          <Box flex={1} justifyContent="flex-end">
                            <Box>
                              <RadioButtons
                                testID="com.usereserva:id/selected_size_gift"
                                size={screenWidth * 0.08}
                                fontSize={11.5}
                                disbledOptions={[]}
                                onSelectedChange={(item) => {
                                  selectedSizeGift?.trim() !== item
                                    && handleSelectGiftSize(item);
                                }}
                                optionsList={
                                  showMoreSizes
                                    ? giftSizeList
                                    : giftSizeList?.slice(0, 5)
                                }
                                showMoreSizes={showMoreSizes}
                                defaultSelectedItem=""
                                selectedItem={selectedSizeGift?.trim()}
                              />
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  )}
                  {orderForm?.items.map(
                    (item, index, array) => item.sellingPrice !== 0
                      && item.isGift === false && (
                        <Box key={index} bg="white" marginTop="xxxs">
                          {item.priceTags.find(
                            (x) => x.identifier
                              === 'd51ad0ed-150b-4ed6-92de-6d025ea46368',
                          ) && (
                          <Box paddingBottom="nano">
                            <Typography
                              fontFamily="nunitoRegular"
                              fontSize={11}
                              color="verdeSucesso"
                            >
                              Desconto de 1° compra aplicado neste produto!
                            </Typography>
                          </Box>
                          )}
                          {item.priceTags.find(
                            (x) => x.identifier
                              === 'd51ad0ed-150b-4ed6-92de-6d025ea46368',
                          ) && (
                          <Box
                            position="absolute"
                            zIndex={5}
                            top={84}
                            right={21}
                          >
                            <Typography
                              color="verdeSucesso"
                              fontFamily="nunitoRegular"
                              fontSize={11}
                            >
                              -R$ 50
                            </Typography>
                          </Box>
                          )}
                          <ProductHorizontalListCard
                            isBag
                            mktplaceNameComponent={
                              <MktplaceName sellerId={item.seller} showIconModalInfo />
                            }
                            discountApi={
                              item.priceTags.find(
                                (x) => x.identifier
                                  === 'd51ad0ed-150b-4ed6-92de-6d025ea46368',
                              )
                                ? parseInt(`${item.priceTags[0].rawValue}`)
                                : undefined
                            }
                            disableCounter={
                              item.priceTags.find(
                                (x) => x.identifier
                                  === 'd51ad0ed-150b-4ed6-92de-6d025ea46368',
                              )
                              && array.filter((x) => x.uniqueId == item.uniqueId)
                                .length > 1
                            }
                            currency="R$"
                            discountTag={getPercent(
                              item.sellingPrice,
                              item.listPrice,
                            )}
                            itemColor={item?.skuName?.split('-')[0] || ''}
                            ItemSize={item?.skuName?.split('-')[1] || ''}
                            productTitle={item?.name?.split(' - ')[0] || ''}
                            price={item.listPrice / 100}
                            priceWithDiscount={
                              item.sellingPrice !== 0
                                ? item.sellingPrice / 100
                                : 0
                            }
                            count={optimistQuantities[index]}
                            testID={`com.usereserva:id/product_card_bag_${slugify(item.productId + item.skuName)}`}
                            isGift={item.bundleItems.length > 0}
                            isGiftable={item.offerings.some(
                              (offering) => offering?.type === 'Embalagem pra Presente',
                            )}
                            handleToggleGift={(value) => handleToggleGiftCheckbox(
                              value,
                              index,
                              item,
                              orderForm,
                            )}
                            onClickAddCount={async (countUpdated) => {
                              const itemIndex = array.findIndex(
                                (x) => x.refId === item.refId,
                              );

                              const isAssinaturaSimples = item?.attachmentOfferings?.find(
                                (x) => x.schema.aceito,
                              )?.required || false;

                              const quantities = isAssinaturaSimples
                                ? 1
                                : countUpdated;

                              const addItemResponse = await addItem({
                                quantity: quantities,
                                itemId: item.id,
                                seller: item.seller,
                                index,
                                hasBundleItems: !!item.bundleItems?.length,
                                isUpdate: true,
                              });

                              if (!addItemResponse?.ok) {
                                const erros = errorsMessages?.filter((erro) => erro.includes(item.name));
                                setNoProduct(erros[0]);
                              } else if (!isAssinaturaSimples) {
                                setOptimistQuantities([
                                  ...optimistQuantities.slice(0, itemIndex),
                                  countUpdated,
                                  ...optimistQuantities.slice(itemIndex + 1),
                                ]);
                              } else {
                                await addAttachmentsInProducts();
                              }
                            }}
                            onClickSubCount={async (count) => {
                              const prevCont = optimistQuantities[index];
                              if (prevCont <= 1) {
                                setShowModal(true);
                                setRemoveProduct({
                                  id: item.id,
                                  index,
                                  seller: item.seller,
                                });
                              } else {
                                setOptimistQuantities([
                                  ...optimistQuantities.slice(0, index),
                                  count,
                                  ...optimistQuantities.slice(index + 1),
                                ]);
                                const { ok } = await removeItem(
                                  item.id,
                                  index,
                                  item.seller,
                                  item.quantity - 1,
                                );
                                if (!ok) {
                                  setOptimistQuantities([
                                    ...optimistQuantities.slice(0, index),
                                    prevCont,
                                    ...optimistQuantities.slice(index + 1),
                                  ]);
                                }
                              }
                            }}
                            onClickClose={() => {
                              setShowModal(true);
                              setRemoveProduct({
                                id: item?.id,
                                index,
                                seller: item?.seller,
                              });
                            }}
                            imageSource={item?.imageUrl?.replace('http', 'https')?.split('-55-55')?.join('')}
                            handleNavigateToProductDetail={() => {
                              EventProvider.logEvent('select_item', {
                                item_list_id: item?.productId,
                                item_list_name: item?.name,
                              });
                              navigation.navigate('ProductDetail', {
                                productId: item?.productId,
                                itemId: item?.id,
                                sizeSelected: item?.skuName?.split('-')[1] || '',
                              });
                            }}
                          />

                        </Box>
                    ),
                  )}
                </Box>

                <Recommendation />

                <Box paddingX="micro">
                  {showLikelyProducts && <Divider variant="fullWidth" />}

                  <Divider variant="fullWidth" />
                  <Box
                    flexDirection="row"
                    marginTop="xxs"
                    marginBottom="xxxs"
                    alignItems="center"
                  >
                    <Box marginRight="micro">
                      <Icon name="Tag" size={20} color="preto" />
                    </Box>
                    <Box flex={1}>
                      <Typography variant="subtituloSessoes">
                        Código promocional
                        {' '}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="tituloSessao">
                      Insira aqui o código do vendedor(a) e/ou cupom de
                      desconto
                    </Typography>
                  </Box>
                  <Box flexDirection="row">
                    {/* cupom vendedor */}
                    {!!sellerCode && (
                      <CouponBadge
                        testID="com.usereserva:id/remove_seller_coupon_badge_button"
                        value={`${sellerName} | ${sellerCode.toUpperCase()}`}
                        onPress={async () => {
                          await removeSellerCoupon('');
                        }}
                      />
                    )}
                    {/* cupom desconto */}
                    {orderForm?.marketingData?.coupon && (
                      <CouponBadge
                        testID="com.usereserva:id/remove_coupon_badge_button"
                        value={orderForm?.marketingData?.coupon}
                        onPress={async () => {
                          await removeCoupon('');
                        }}
                      />
                    )}
                  </Box>

                  <Box marginTop="nano" flexDirection="row">
                    <Box flex={1} marginRight="micro">
                      <TextField
                        height={50}
                        value={sellerCoupon}
                        onChangeText={(text) => setSellerCoupon(text)}
                        placeholder="Código do vendedor"
                      />
                    </Box>
                    <Box>
                      <Button
                        testID="com.usereserva:id/aply_coupon_seller_bag_button"
                        width="100%"
                        title="APLICAR"
                        onPress={handleAddSellerCoupons}
                        variant="primarioEstreito"
                        disabled={!hasSellerCoupon() || loadingGoDelivery}
                      />
                    </Box>
                  </Box>
                  {hasErrorApplyCoupon && (
                    <Box marginRight="micro">
                      <Typography color="vermelhoAlerta" variant="precoAntigo3">
                        Digite um código válido
                      </Typography>
                    </Box>
                  )}
                  <Box marginTop="xxxs" flexDirection="row">
                    <Box flex={1} marginRight="micro">
                      <TextField
                        height={50}
                        value={discountCoupon}
                        onChangeText={(text) => setDiscountCoupon(text)}
                        placeholder="Cupom de desconto"
                      />
                    </Box>
                    <Box>
                      <Button
                        testID="com.usereserva:id/aply_coupon_discount_bag_button"
                        width="100%"
                        title="APLICAR"
                        onPress={handleAddCoupons}
                        variant="primarioEstreito"
                        disabled={!hasDiscountCoupon()}
                      />
                    </Box>
                  </Box>
                  {/* TODO refactor use hasErrorApplyCoupon or create hasErrorInvalidCoupon */}
                  {couponIsInvalid && (
                    <Box marginRight="micro">
                      <Typography color="vermelhoAlerta" variant="precoAntigo3">
                        Digite um cupom válido
                      </Typography>
                    </Box>
                  )}

                  <Divider variant="fullWidth" marginY="xs" />
                  <>
                    {totalDiscountPrice !== 0 || totalDelivery ? (
                      <Box
                        marginBottom="micro"
                        flexDirection="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography variant="precoAntigo3">Subtotal</Typography>
                        <PriceCustom
                          fontFamily="nunitoSemiBold"
                          sizeInterger={15}
                          sizeDecimal={11}
                          num={totalBag}
                        />
                      </Box>
                    ) : null}
                    {totalDiscountPrice !== 0 && (
                      <Box
                        marginBottom="micro"
                        flexDirection="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography variant="precoAntigo3">
                          Descontos
                        </Typography>

                        <PriceCustom
                          fontFamily="nunitoSemiBold"
                          negative
                          sizeInterger={15}
                          sizeDecimal={11}
                          num={Math.abs(totalDiscountPrice)}
                        />
                      </Box>
                    )}
                  </>

                  <Box
                    marginBottom="micro"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="precoAntigo3">Total</Typography>
                    <PriceCustom
                      fontFamily="nunitoBold"
                      sizeInterger={20}
                      sizeDecimal={11}
                      num={totalBag + totalDiscountPrice}
                    />
                  </Box>
                </Box>
              </ScrollView>
            </>
          )}

          <Box width="100%" height={145} bg="white">
            {loading ? (
              <Box px="xxs">
                <Box>
                  <Box
                    flexDirection="row"
                    justifyContent="space-between"
                    marginTop={15}
                  >
                    <Box>
                      <Box bg="neutroFrio1" width={63} height={22} />
                      <Box
                        bg="neutroFrio1"
                        width={95}
                        height={22}
                        marginTop={6}
                      />
                    </Box>

                    <Box alignItems="flex-end">
                      <Box bg="neutroFrio1" width={63} height={22} />
                      <Box
                        bg="neutroFrio1"
                        width={95}
                        height={22}
                        marginTop={6}
                      />
                    </Box>
                  </Box>

                  <Box
                    bg="neutroFrio1"
                    width="100%"
                    height={50}
                    marginTop={10}
                  />
                </Box>
              </Box>
            ) : (
              orderForm
              && orderForm?.items.length > 0 && (
                <Box
                  width="100%"
                  bg="white"
                  height={145}
                  px="xxs"
                  style={{ elevation: Platform.OS === platformType.ANDROID ? 10 : 0 }}
                  boxShadow={
                    Platform.OS === platformType.ANDROID ? null : 'bottomBarShadow'
                  }
                >
                  <Box
                    flexDirection="row"
                    justifyContent="space-between"
                    py="xxs"
                  >
                    <Box>
                      <Typography fontFamily="nunitoRegular" fontSize={13}>
                        Total:
                      </Typography>

                      <PriceCustom
                        fontFamily="nunitoBold"
                        sizeInterger={15}
                        sizeDecimal={11}
                        num={totalBag + totalDiscountPrice}
                      />
                    </Box>
                    {totalBag > 0 && (
                      <Box alignItems="flex-end">
                        <Typography fontFamily="nunitoRegular" fontSize={13}>
                          em até
                        </Typography>
                        <Box flexDirection="row">
                          <Typography
                            fontFamily="nunitoBold"
                            fontSize={15}
                            color="vermelhoRSV"
                          >
                            {installmentInfo.installmentsNumber}
                            x de
                            {' '}
                          </Typography>

                          <PriceCustom
                            fontFamily="nunitoBold"
                            color="vermelhoRSV"
                            sizeInterger={15}
                            sizeDecimal={11}
                            num={
                              (totalBag + totalDiscountPrice)
                              / installmentInfo.installmentsNumber
                            }
                          />
                        </Box>
                      </Box>
                    )}
                  </Box>

                  <Button
                    disabled={
                      !!(orderForm && orderForm?.items?.length === 0)
                      || loadingProfile
                      || loadingGoDelivery
                      || topBarLoading
                    }
                    onPress={onGoToDelivery}
                    testID="com.usereserva:id/going_shooping_button"
                    title="IR PARA ENTREGA"
                    variant="primarioEstreito"
                    inline
                  />
                </Box>
              )
            )}
          </Box>
        </WithAvoidingView>
      )}
      <ToastProvider />
    </SafeAreaView>
  );
};
