import { useLazyQuery } from '@apollo/client';
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
  Toggle,
  Typography,
} from '@danilomsou/reserva-ui';
import { loadingSpinner } from '@danilomsou/reserva-ui/src/assets/animations';
import analytics from '@react-native-firebase/analytics';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  PixelRatio,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { createAnimatableComponent } from 'react-native-animatable';
import appsFlyer from 'react-native-appsflyer';
import Modal from 'react-native-modal';
import { chechoutService } from '../../../services/checkoutService';
import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../context/CartContext';
import { profileQuery } from '../../../graphql/profile/profileQuery';
import { RootStackParamList } from '../../../routes/StackNavigator';
import { Attachment, SetGiftSize } from '../../../services/vtexService';
import { CategoriesParserString } from '../../../utils/categoriesParserString';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import { getPercent } from '../../ProductCatalog/components/ListVerticalProducts/ListVerticalProducts';
import { CouponBadge } from '../components/CouponBadge';
import { EmptyBag } from '../components/EmptyBag';
import { PriceCustom } from '../components/PriceCustom';
import { Recommendation } from '../components/Recommendation';
import { ShippingBar } from '../components/ShippingBar';
import { Skeleton } from '../components/Skeleton';
import Sentry from '../../../config/sentryConfig';
import OneSignal from 'react-native-onesignal';

const screenWidth = Dimensions.get('window').width;

const BoxAnimation = createAnimatableComponent(Box);

type Props = StackScreenProps<RootStackParamList, 'BagScreen'>;

export const BagScreen = ({ route }: Props) => {
  const { email, cookie } = useAuth();
  const navigation = useNavigation();
  const {
    orderForm,
    addItem,
    orderform,
    removeItem,
    addCoupon,
    identifyCustomer,
    addSellerCoupon,
    removeCoupon,
    removeSellerCoupon,
    addCustomer,
    addShippingData,
  } = useCart();

  const { isProfileComplete } = route?.params;
  let fontTitle = Platform.OS === 'android' ? screenWidth * 0.0352 : screenWidth * 0.036;
  let subtitle = screenWidth * 0.032
  const [loading, setLoading] = useState(false);
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
    { id: string; index: number; seller: string; quantity: number } | undefined
  >();
  const [totalDiscountPrice, setTotalDiscountPrice] = useState(0);
  const [loadingShippingBar, setLoadingShippingBar] = useState(false);
  const [totalDelivery, setTotalDelivery] = useState(0);
  const [hasBagGift, setHasBagGift] = React.useState(false);
  const [showLikelyProducts, setShowLikelyProducts] = React.useState(true);
  const [showMoreSizes, setShowMoreSizes] = useState(false);
  const [sellerCoupon, setSellerCoupon] = React.useState<string>('');
  const [discountCoupon, setDiscountCoupon] = React.useState<string>('');
  const [sellerCode, setSellerCode] = React.useState<string | undefined>('');
  const [sellerName, setSellerName] = React.useState<string | undefined>('');
  const [sellerCouponIsValid, setSellerCouponIsValid] = useState<boolean>(true);
  const [selectedSizeGift, setSelectedSizeGift] = useState<string | undefined>(
    ''
  );
  const [couponIsInvalid, setCouponIsInvalid] = useState<boolean | undefined>(
    false
  );
  const [noProduct, setNoProduct] = useState<any>('');
  const [errorsMessages, setErrorsMessages] = useState<any>([]);
  const [optimistQuantities, setOptimistQuantities] = useState(
    orderForm?.items.map((x) => x.quantity) || []
  );
  const [installmentInfo, setInstallmentInfo] = useState({
    installmentsNumber: 0,
    installmentPrice: 0,
    totalPrice: 0,
  });

  useEffect(() => {
    Sentry.configureScope((scope) => scope.setTransactionName('BagScreen'));
  }, []);

  const hasSellerCoupon = useCallback(
    (): boolean => sellerCoupon.length > 0,
    [sellerCoupon]
  );

  const hasDiscountCoupon = useCallback(
    (): boolean => discountCoupon.length > 0,
    [discountCoupon]
  );

  const [isEmptyProfile, setIsEmptyProfile] = useState(false);
  const [profile, setProfile] = useState();

  const [{ data, loadingProfile, refetch }, setProfileData] = useState({
    data: {} as any,
    loadingProfile: true,
    refetch: () => { },
  });

  const [getProfile] = useLazyQuery(profileQuery, { fetchPolicy: 'no-cache' });

  useEffect(() => {
    getProfile().then((response) => {
      setProfileData({
        data: response.data,
        loadingProfile: false,
        refetch: response.refetch,
      });
    });
  }, []);

  const firstLoadOrderForm = async () => {
    setLoading(true);
    orderform();
    setLoading(false);
  };

  const setCustomer = async (email: string) => await identifyCustomer(email);

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
        profile?.firstName?.length === 0 ||
        profile?.firstName === null ||
        profile?.lastName?.length === 0 ||
        profile?.lastName === null ||
        profile?.birthDate?.length === 0 ||
        profile?.birthDate === null ||
        profile?.homePhone?.length === 0 ||
        profile?.homePhone === null ||
        profile?.document?.length === 0 ||
        profile?.document === null ||
        profile?.gender?.length === 0 ||
        profile?.gender === null
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

  useEffect(() => {
    firstLoadOrderForm();

    if (email) {
      setCustomer(email);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (data) {
        refetch();
      }
    }, [])
  );

  useEffect(() => {
    const totalItensPrice =
      (orderForm?.totalizers.find((x) => x.id === 'Items')?.value || 0) / 100;
    const totalDiscountPrice =
      (orderForm?.totalizers.find((x) => x.id === 'Discounts')?.value || 0) /
      100;
    const totalDelivery =
      (orderForm?.totalizers.find((x) => x.id === 'Shipping')?.value || 0) /
      100;

    const errorMessages = orderForm?.messages.map(({ text }: any) => text);
    setErrorsMessages(errorMessages);

    const sellerCode =
      orderForm?.marketingData?.marketingTags[1]?.split('=')[1];
    const sellerName = orderForm?.marketingData?.marketingTags[2]
      ?.split('=')[1]
      .split(' ')[0];
    const installment =
      orderForm?.paymentData?.installmentOptions
        ?.find((x) => x.paymentSystem == 4)
        ?.installments?.reverse()[0] || null;

    const quantities = orderForm?.items.map((x) => x.quantity) || [];

    let giftSize: string | undefined;
    const alreadySelectedGift = orderForm?.items.find(
      (x) => x.isGift == true && x.sellingPrice == 0
    );
    if (!!alreadySelectedGift) {
      setSelectedSizeGift(alreadySelectedGift?.skuName.split('-')[1]);
    } else {
      giftSize =
        orderForm?.selectableGifts[0]?.availableGifts[0]?.skuName.split('-')[1];
      if (!!giftSize) fetchSelectGiftSize(giftSize);
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
        }
    );

    setOptimistQuantities(quantities);
    setTotalBag(totalItensPrice);
    setTotalDiscountPrice(totalDiscountPrice);
    setTotalDelivery(totalDelivery);
    setSellerCode(sellerCode);
    setSellerName(sellerName);
  }, [orderForm]);

  useEffect(() => {
    if (orderForm && orderForm.items.length > 0) {
      if (isRemoveCartTags) {
        let timestamp = Math.floor(Date.now() / 1000);
        OneSignal.sendTags({
          cart_update: timestamp.toString(),
          product_name: orderForm?.items[0]?.name,
          product_image: orderForm?.items[0]?.imageUrl.replace('http', 'https'),
        })
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
          error: error,
        },
      });
    }
  };

  const handleAddSellerCoupons = async () => {
    setLoadingGoDelivery(true);
    const dataSellerCoupon = await addSellerCoupon(sellerCoupon).then(
      (response) => {
        if (response) {
          setSellerCouponIsValid(true);
          setTimeout(() => {
            setLoadingGoDelivery(false);
          }, 2000);
        } else {
          setSellerCouponIsValid(false);
          setLoadingGoDelivery(false);
        }
      }
    );

    setSellerCoupon('');
    orderform();
  };

  //! ALTERAR PARA O FLUXO CORRETO

  const onGoToDelivery = async () => {
    setLoadingGoDelivery(true);
    if (orderForm) {
      const { clientProfileData, shippingData } = orderForm;
      const hasCustomer =
        clientProfileData &&
        clientProfileData.email &&
        clientProfileData.firstName;

      const hasAddress =
        shippingData && shippingData.availableAddresses.length > 0;

      const af_content_id = orderForm.items.map((i) => i.productId);
      const af_content_type = orderForm.items.map((i) =>
        CategoriesParserString(i.productCategories)
      );
      const af_quantity = orderForm.items.map((i) => i.quantity);

      appsFlyer.logEvent('af_initiated_checkout', {
        af_price: totalBag + totalDiscountPrice + totalDelivery,
        af_content_id,
        af_content_type,
        af_currency: 'BRL',
        af_quantity,
      });

      analytics().logEvent('checkout_initiated', {
        price: totalBag + totalDiscountPrice + totalDelivery,
        content_type: af_content_type,
        content_ids: af_content_id,
        currency: 'BRL',
        quantity: af_quantity,
      });

      if (!email) {
        setLoadingGoDelivery(false);

        navigation.navigate('Login', { comeFrom: 'Checkout' });
      } else if (isEmptyProfile && !isProfileComplete) {
        // updateClientProfileData(profile);
        setLoadingGoDelivery(false);
        navigation.navigate('EditProfile', { isRegister: true });
      } else {
        // updateClientProfileData(profile);
        try {
          await identifyCustomer(email)
            .then(() => setLoadingGoDelivery(false))
            .then(() => navigation.navigate('DeliveryScreen', {}));
        } catch (error) {
          Sentry.addBreadcrumb({
            message: 'Erro na chamada para tela de entrega',
            data: {
              error: error,
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
    try {
      const orderFormId = orderForm?.orderFormId;
      const productOrderFormIndex = orderForm?.items.length; // because it will be the new last element
      const attachmentName = 'Li e Aceito os Termos';
      Attachment(orderFormId, productOrderFormIndex, attachmentName);
    } catch (error) {
      throw error;
    }
  };

  const fetchSelectGiftSize = async (size: string) => {
    const availableGifts = orderForm.selectableGifts[0].availableGifts.find(
      (x) => x.skuName.split('-')[1] === size
    );

    try {
      setLoadingGift(true);
      const data = await SetGiftSize(
        orderForm?.orderFormId,
        orderForm?.selectableGifts[0]?.id.trim(),
        availableGifts.id,
        availableGifts.seller
      );
      if (data) {
        orderform();
        setSelectedSizeGift(size);
      }
      setLoadingGift(false);
    } catch (error) {
      throw error;
    }
  };

  const removeAbandonedCartTags = () => {
    OneSignal.sendTags({
      cart_update: "",
      product_name: "",
      product_image: "",
    })
  }

  return (
    <SafeAreaView
      style={{
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}
    >
      <TopBarBackButton showShadow loading={loadingGoDelivery || loadingGift} />
      {loading ? (
        <Box>
          <Skeleton>
            <Box marginRight={15} marginLeft={21}>
              <Box bg="neutroFrio1" height={35} width={175} marginTop={23} />

              <Box flexDirection="row" marginTop={30}>
                <Box bg="neutroFrio1" width={99} height={148} marginRight={8} />

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

                  <Box bg="neutroFrio1" width={167} height={18} marginTop={7} />
                  <Box bg="neutroFrio1" width={221} height={18} marginTop={7} />
                  <Box bg="neutroFrio1" width={115} height={22} marginTop={7} />
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

              <Box bg="neutroFrio1" width="100%" height={47} marginTop={19} />

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
      ) : orderForm && orderForm?.items.length > 0 ? (
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
                boxShadow={Platform.OS === 'ios' ? 'topBarShadow' : null}
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
                <Button flex={1} onPress={() => setNoProduct('')}>
                  <Icon name="Close" size={15} color="preto" ml="xxxs" />
                </Button>
              </Box>
            </Animatable.View>
          )}

          <ScrollView>
            <Modal isVisible={loadingModal}>
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
                  let removedProductIndex = removeProduct?.index;

                  const { ok } = await removeItem(
                    removeProduct?.id,
                    removeProduct?.index,
                    removeProduct?.seller,
                    0
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
                <Typography variant="tituloSessoes">
                  Sacola (
                  {optimistQuantities.reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    0
                  )}
                  )
                </Typography>
              </Box>

              <ShippingBar
                loading={loadingShippingBar}
                sumPriceShipping={totalBag + totalDiscountPrice}
                totalDelivery={totalDelivery != 0 ? totalDelivery : 0}
              />
              {orderForm && orderForm.selectableGifts.length > 0 && (
                <Box flexDirection="row" minHeight={152} mt={20}>
                  <Image
                    source={orderForm?.selectableGifts[0]?.availableGifts[0].imageUrl
                      .replace('http', 'https')
                      .split('-55-55')
                      .join('')}
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

                      <Box minHeight={48} >
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
                            1{' '}
                            {
                              `${orderForm?.selectableGifts[0]?.availableGifts[0]?.name.split(
                                '-'
                              )[0].trim()}.`
                            }
                          </Typography>
                        </Typography>
                      </Box>
                    </Box>

                    <Box minHeight={59}>
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

                        {orderForm &&
                          orderForm.selectableGifts[0].availableGifts.map(
                            (x) => x.skuName.split('-')[1]
                          ).length > 5 && (
                            <Button
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
                                      ? { transform: [{ rotate: '-90deg' }] }
                                      : { transform: [{ translateY: 4 }] }
                                  }
                                  name={
                                    showMoreSizes ? 'ChevronRight' : 'ArrowDown'
                                  }
                                  color="preto"
                                  marginLeft="nano"
                                  size={12}
                                />
                              </BoxAnimation>
                            </Button>
                          )}
                      </Box>
                      <Box flex={1} justifyContent='flex-end'>
                        <Box>
                          <RadioButtons
                            size={screenWidth * 0.080}
                            fontSize={11.5}
                            disbledOptions={[]}
                            onSelectedChange={(item) => {
                              fetchSelectGiftSize(item);
                            }}
                            optionsList={
                              showMoreSizes
                                ? orderForm.selectableGifts[0].availableGifts
                                  .map((x) => x.skuName.split('-')[1].trim())
                                  .reverse()
                                : orderForm.selectableGifts[0].availableGifts
                                  .map((x) => x.skuName.split('-')[1].trim())
                                  .slice(0, 5)
                                  .reverse()
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
                (item, index, array) =>
                  item.sellingPrice !== 0 &&
                  item.isGift === false && (
                    <Box key={index} bg="white" marginTop="xxxs">
                      {item.priceTags.find(
                        (x) =>
                          x.identifier ===
                          'd51ad0ed-150b-4ed6-92de-6d025ea46368'
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
                        (x) =>
                          x.identifier ===
                          'd51ad0ed-150b-4ed6-92de-6d025ea46368'
                      ) && (
                          <Box position="absolute" zIndex={5} top={84} right={21}>
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
                        discountApi={
                          item.priceTags.find(
                            (x) =>
                              x.identifier ===
                              'd51ad0ed-150b-4ed6-92de-6d025ea46368'
                          )
                            ? parseInt(`${item.priceTags[0].rawValue}`)
                            : undefined
                        }
                        disableCounter={
                          item.priceTags.find(
                            (x) =>
                              x.identifier ===
                              'd51ad0ed-150b-4ed6-92de-6d025ea46368'
                          ) &&
                          array.filter((x) => x.uniqueId == item.uniqueId)
                            .length > 1
                        }
                        currency="R$"
                        discountTag={getPercent(
                          item.sellingPrice,
                          item.listPrice
                        )}
                        itemColor={item.skuName.split('-')[0] || ''}
                        ItemSize={item.skuName.split('-')[1] || ''}
                        productTitle={item.name.split(' - ')[0]}
                        // installmentsNumber={item.installmentNumber}
                        // installmentsPrice={item.installmentPrice}
                        price={item.listPrice / 100}
                        priceWithDiscount={
                          item.sellingPrice !== 0 ? item.sellingPrice / 100 : 0
                        }
                        count={optimistQuantities[index]}
                        onClickAddCount={async (countUpdated) => {
                          const itemIndex = array.findIndex(
                            (x) => x.refId == item.refId
                          );

                          let isAssinaturaSimples =
                            item?.attachmentOfferings?.find(
                              (x) => x.schema.aceito
                            )?.required || false;

                          const quantities = isAssinaturaSimples
                            ? 1
                            : countUpdated;

                          const { ok } = await addItem(
                            quantities,
                            item.id,
                            item.seller
                          );
                          if (!ok) {
                            const erros = errorsMessages?.filter((erro) =>
                              erro.includes(item.name)
                            );
                            setNoProduct(erros[0]);
                          } else {
                            if (!isAssinaturaSimples) {
                              setOptimistQuantities([
                                ...optimistQuantities.slice(0, itemIndex),
                                countUpdated,
                                ...optimistQuantities.slice(itemIndex + 1),
                              ]);
                            } else {
                              await addAttachmentsInProducts();
                            }
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
                              item.quantity - 1
                            );
                            if (!ok)
                              setOptimistQuantities([
                                ...optimistQuantities.slice(0, index),
                                prevCont,
                                ...optimistQuantities.slice(index + 1),
                              ]);
                          }
                        }}
                        onClickClose={() => {
                          setShowModal(true);
                          setRemoveProduct({
                            id: item.id,
                            index,
                            seller: item.seller,
                          });
                        }}
                        imageSource={item.imageUrl
                          .replace('http', 'https')
                          .split('-55-55')
                          .join('')}
                        handleNavigateToProductDetail={() => {
                          navigation.navigate('ProductDetail', {
                            productId: item.productId,
                            itemId: item.id,
                            sizeSelected: item.skuName.split('-')[1] || '',
                          });
                        }}
                      />
                      {/* <Box
                    key={index}
                    flexDirection="row"
                    marginY="xxs"
                    alignItems="center"
                  >
                    <Box marginRight="micro">
                      <Icon name="Presente" size={20} />
                    </Box>
                    <Box flex={1}>
                      <Typography variant="subtituloSessoes">
                        Embalagem para presente
                      </Typography>
                    </Box>
                    <Box marginLeft="micro">
                      <Toggle
                        onValueChange={(value) => {
                          if (cookie)
                            chechoutService.activeGitEmballage(
                              orderForm.orderFormId,
                              index,
                              cookie
                            );

                          console.log(
                            'BOOLEANNN',
                            index,
                            orderForm.orderFormId,
                            item.bundleItems
                          );
                        }}
                        thumbColor="vermelhoAlerta"
                        color="preto"
                        value={hasBagGift}
                      />
                    </Box>
                  </Box> */}
                    </Box>
                  )
              )}
            </Box>

            {/* <Box paddingX={'xxxs'}>
          <Divider variant={'fullWidth'} />
          <Button onPress={() => setShowLikelyProducts(!showLikelyProducts)}>
            <Box flexDirection={'row'} marginY={'xxs'} alignItems={'center'}>
              <Box marginRight="micro">
                <Icon name={'Handbag'} size={20} />
              </Box>
              <Box flex={1}>
                <Typography variant={'subtituloSessoes'}>
                  Você vai gostar destas aqui
                </Typography>
              </Box>
              <Box marginRight="micro">
                <Icon
                  style={
                    showLikelyProducts
                      ? {
                          transform: [{ rotate: '-180deg' }, { translateY: 8 }],
                        }
                      : { transform: [{ translateY: 4 }] }
                  }
                  name={'ArrowDown'}
                  size={20}
                />
              </Box>
            </Box>
          </Button>
          <Divider variant={'fullWidth'} />
        </Box> */}

            {/* {showLikelyProducts && (
          <BoxAnimated
            paddingX={'xxxs'}
            bg={'whiteSecondary'}
            animation={showLikelyProducts ? 'fadeIn' : ''}
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                flex: 1,
              }}
            >
              {lisProduct.map((product, index) => (
                <Box mt="xxs" mr="xxs" key={`${index}-${product.productTitle}`}>
                  <Box flex={1} mb="micro">
                    <ProductVerticalListCard
                      bg={'whiteSecondary'}
                      small
                      {...product}
                      productTitle={product.productTitle.toUpperCase()}
                    />
                  </Box>
                  <Button
                    width="100%"
                    title="ADICIONAR"
                    variant="primarioEstreitoSmall"
                  />
                </Box>
              ))}
            </ScrollView>
          </BoxAnimated>
        )} */}

            <Recommendation />

            <Box paddingX="micro">
              {showLikelyProducts && <Divider variant="fullWidth" />}

              {/* {orderForm.items.map((index) => (
                <Box
                  key={index}
                  flexDirection="row"
                  marginY="xxs"
                  alignItems="center"
                >
                  <Box marginRight="micro">
                    <Icon name="Presente" size={20} />
                  </Box>
                  <Box flex={1}>
                    <Typography variant="subtituloSessoes">
                      Embalagem para presente
                    </Typography>
                  </Box>
                  <Box marginLeft="micro">
                    <Toggle
                      onValueChange={setHasBagGift}
                      thumbColor="vermelhoAlerta"
                      color="preto"
                      value={hasBagGift}
                    />
                  </Box>
                </Box>
              ))} */}

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
                    Código promocional{' '}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography variant="tituloSessao">
                  Insira aqui o código do vendedor(a) e/ou cupom de desconto.
                </Typography>
              </Box>
              <Box flexDirection="row">
                {/* cupom vendedor */}
                {!!sellerCode && (
                  <CouponBadge
                    value={`${sellerName} | ${sellerCode.toUpperCase()}`}
                    onPress={async () => {
                      setLoading(true);
                      await removeSellerCoupon(''); // remove passando ''
                      setLoading(false);
                    }}
                  />
                )}
                {/* cupom desconto */}
                {orderForm?.marketingData?.coupon && (
                  <CouponBadge
                    value={orderForm?.marketingData?.coupon}
                    onPress={async () => {
                      setLoading(true);
                      await removeCoupon(''); // remove passando ''
                      setLoading(false);
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
                    width="100%"
                    title="APLICAR"
                    onPress={handleAddSellerCoupons}
                    variant="primarioEstreito"
                    disabled={!hasSellerCoupon() || loadingGoDelivery}
                  />
                </Box>
              </Box>
              {!sellerCouponIsValid && (
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
                    width="100%"
                    title="APLICAR"
                    onPress={handleAddCoupons}
                    variant="primarioEstreito"
                    disabled={!hasDiscountCoupon()}
                  />
                </Box>
              </Box>
              {couponIsInvalid && (
                <Box marginRight="micro">
                  <Typography color="vermelhoAlerta" variant="precoAntigo3">
                    Digite um cupom válido
                  </Typography>
                </Box>
              )}

              <Divider variant="fullWidth" marginY="xs" />
              <>
                {totalDiscountPrice != 0 || totalDelivery ? (
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
                {totalDiscountPrice != 0 && (
                  <Box
                    marginBottom="micro"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="precoAntigo3">Descontos</Typography>

                    <PriceCustom
                      fontFamily="nunitoSemiBold"
                      negative
                      sizeInterger={15}
                      sizeDecimal={11}
                      num={Math.abs(totalDiscountPrice)}
                    />
                  </Box>
                )}
                {/* {totalDelivery > 0 && (
                  <Box
                    marginBottom="micro"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="precoAntigo3">Entrega</Typography>

                    <PriceCustom
                      fontFamily="nunitoSemiBold"
                      sizeInterger={15}
                      sizeDecimal={11}
                      num={Math.abs(totalDelivery)}
                    />
                  </Box>
                )} */}
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
      ) : (
        <EmptyBag onPress={() => navigation.navigate('Offers')} />
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
                  <Box bg="neutroFrio1" width={95} height={22} marginTop={6} />
                </Box>

                <Box alignItems="flex-end">
                  <Box bg="neutroFrio1" width={63} height={22} />
                  <Box bg="neutroFrio1" width={95} height={22} marginTop={6} />
                </Box>
              </Box>

              <Box bg="neutroFrio1" width="100%" height={50} marginTop={10} />
            </Box>
          </Box>
        ) : (
          orderForm &&
          orderForm?.items.length > 0 && (
            <Box
              width="100%"
              bg="white"
              height={145}
              px="xxs"
              style={{ elevation: Platform.OS == 'android' ? 10 : 0 }}
              boxShadow={Platform.OS == 'android' ? null : 'bottomBarShadow'}
            >
              <Box flexDirection="row" justifyContent="space-between" py="xxs">
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
                        {installmentInfo.installmentsNumber}x de{' '}
                      </Typography>

                      <PriceCustom
                        fontFamily="nunitoBold"
                        color="vermelhoRSV"
                        sizeInterger={15}
                        sizeDecimal={11}
                        num={
                          (totalBag + totalDiscountPrice) /
                          installmentInfo.installmentsNumber
                        }
                      />
                    </Box>
                  </Box>
                )}
              </Box>

              <Button
                disabled={
                  !!(orderForm && orderForm?.items?.length === 0) ||
                  loadingProfile ||
                  loadingGoDelivery
                }
                onPress={onGoToDelivery}
                title="IR PARA ENTREGA"
                variant="primarioEstreito"
                inline
              />
            </Box>
          )
        )}
      </Box>
    </SafeAreaView>
  );
};
