import React, { useEffect, useState, useCallback, useRef } from "react";
import { Platform, SafeAreaView, ScrollView } from "react-native";
import {
  Typography,
  Box,
  ProgressBar,
  ProductHorizontalListCard,
  ProductDetailCard,
  Divider,
  Button,
  Icon,
  Toggle,
  TextField,
  Alert,
  ProductVerticalListCard,
} from "reserva-ui";
import { PriceCustom } from "../components/PriceCustom";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import { useNavigation } from "@react-navigation/native";
import { createAnimatableComponent } from "react-native-animatable";
import * as Animatable from "react-native-animatable";
import { CouponBadge } from "../components/CouponBadge";
import {
  CouponsOrders,
  OrderItems,
  OrderRequest,
  PaymentType,
} from "../../../store/ducks/orders/types";
import { ApplicationState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import {
  appendCoupons,
  increaseOrderCount,
  removeOrders,
} from "../../../store/ducks/orders/actions";
import { Product } from "../../../store/ducks/product/types";
import { useCart } from "../../../context/CartContext";
import SkeletonPlaceholder from "@thevsstech/react-native-skeleton";
import { Skeleton } from "../components/Skeleton";
import { useAuth } from "../../../context/AuthContext";
import { EmptyBag } from "../components/EmptyBag";
import Modal from "react-native-modal";
import { getPercent } from "../../ProductCatalog/components/ListVerticalProducts/ListVerticalProducts";
import { ModalBook } from "../components/ModalBook";

const BoxAnimated = createAnimatableComponent(Box);

export const BagScreen = () => {
  const { email } = useAuth();
  const { navigate } = useNavigation();
  const {
    orderForm,
    addItem,
    orderform,
    removeItem,
    addCoupon,
    identifyCustomer,
    addSellerCoupon,
    removeCoupon,
    removeSellerCoupon
  } = useCart();

  const [isVisibleModalBook, setIsVisibleModalBook] = useState(false)
  const [WasBookOffered, setWasBookOffered] = useState(false)
  const [loading, setLoading] = useState(false)
  const [successModal, setSuccessModal] = useState(false);
  const modalRef = useRef(false);
  const viewRef = useRef(null);
  const [totalBag, setTotalBag] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [removeProduct, setRemoveProduct] = useState<{ id: string, index: number, seller: string, quantity: number } | undefined>();
  const [totalDiscountPrice, setTotalDiscountPrice] = useState(0);
  const [totalDelivery, setTotalDelivery] = useState(0);
  const [hasBagGift, setHasBagGift] = React.useState(false);
  const [showLikelyProducts, setShowLikelyProducts] = React.useState(true);
  const [sellerCoupon, setSellerCoupon] = React.useState<string>("");
  const [discountCoupon, setDiscountCoupon] = React.useState<string>("");
  const [sellerCode, setSellerCode] = React.useState<string | undefined>("");
  const [sellerCouponIsValid, setSellerCouponIsValid] = useState<boolean>(true);
  const [couponIsInvalid, setCouponIsInvalid] = useState<boolean>(false);
  const [noProduct, setNoProduct] = useState<any>('');
  const [errorsMessages, setErrorsMessages] = useState<any>([]);
  const [optimistQuantities, setOptimistQuantities] = useState(orderForm?.items.map(x => x.quantity) || [])
  const [installmentInfo, setInstallmentInfo] = useState({
    installmentsNumber: 0,
    installmentPrice: 0,
    totalPrice: 0,
  });

  const hasSellerCoupon = useCallback((): boolean => {
    return sellerCoupon.length > 0;
  }, [sellerCoupon]);

  const hasDiscountCoupon = useCallback((): boolean => {
    return discountCoupon.length > 0;
  }, [discountCoupon]);

  const firstLoadOrderForm = async () => {
    setLoading(true);
    await orderform();
    setLoading(false);
  };

  const setCustomer = async (email: string) => await identifyCustomer(email)


  useEffect(() => {
    firstLoadOrderForm();
    if (orderForm) {
      const { clientProfileData, shippingData } = orderForm;
      const hasCustomer =
        clientProfileData &&
        clientProfileData.email &&
        clientProfileData.firstName;

      if (email && !hasCustomer) {
        setCustomer(email);
      }
    }
  }, []);

  useEffect(() => {
    const totalItensPrice =
      (orderForm?.totalizers.find((x) => x.id === "Items")?.value || 0) / 100;
    const totalDiscountPrice =
      (orderForm?.totalizers.find((x) => x.id === "Discounts")?.value || 0) /
      100;
    const totalDelivery =
      (orderForm?.totalizers.find((x) => x.id === "Shipping")?.value || 0) /
      100;

    const errorMessages = orderForm?.messages.map(({ text }: any) => text)
    setErrorsMessages(errorMessages)

    const sellerCode =
      orderForm?.marketingData?.marketingTags[1]?.split("=")[1];

    const installment =
      orderForm?.paymentData?.installmentOptions
        ?.find((x) => x.paymentSystem == 4)
        ?.installments?.reverse()[0] || null;

    const quantities = orderForm?.items.map(x => x.quantity) || []

    setInstallmentInfo(
      !!installment
        ? {
          installmentPrice: installment.value,
          installmentsNumber: installment.count,
          totalPrice: installment.total,
        }
        : {
          ...installmentInfo,
        }
    );

    setOptimistQuantities(quantities)

    setTotalBag(totalItensPrice);
    setTotalDiscountPrice(totalDiscountPrice);
    setTotalDelivery(totalDelivery);
    setSellerCode(sellerCode);
  }, [orderForm]);

  useEffect(() => {
    if (viewRef.current) {
      viewRef?.current?.slideInDown()
    }
  }, [noProduct])

  const handleAddCoupons = async () => {
    const isCouponInvalid = await addCoupon(discountCoupon);
    setCouponIsInvalid(isCouponInvalid);
    setDiscountCoupon("");
    orderform();
  };

  const handleAddSellerCoupons = async () => {
    const dataSellerCoupon = await addSellerCoupon(sellerCoupon);
    setSellerCouponIsValid(dataSellerCoupon);
    setSellerCoupon("");
    orderform();
  };


  //! ALTERAR PARA O FLUXO CORRETO

  const onGoToDelivery = async () => {
    if (!WasBookOffered) {
      setIsVisibleModalBook(true)
    } else {

      if (orderForm) {
        const { clientProfileData, shippingData } = orderForm;
        const hasCustomer =
          clientProfileData &&
          clientProfileData.email &&
          clientProfileData.firstName;

        const hasAddress =
          shippingData && shippingData.availableAddresses.length > 0;

        if (!email) {
          navigate("EnterYourEmail");
        } else {
          navigate("DeliveryScreen");
        }
      }
    }
  };



  useEffect(() => {
    console.log('optimistQuantities', optimistQuantities)
    console.log('orderForm items', orderForm?.items)

  }, [optimistQuantities])

  return (
    <SafeAreaView
      style={{
        justifyContent: "space-between",
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <ModalBook
        isVisible={isVisibleModalBook}
        onClose={() => {
          setIsVisibleModalBook(false)
          setWasBookOffered(true)
        }} />
      <TopBarBackButton showShadow loading={loading} />
      {loading ?
        <Box >
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
        :
        orderForm && orderForm?.items.length > 0 ?
          <>
            {noProduct?.length > 0 &&
              <Animatable.View ref={viewRef} animation="slideInDown" style={{ elevation: 10, position: "absolute", right: 0, left: 0, zIndex: 2 }}>
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
                  <Button
                    flex={1}
                    onPress={() => setNoProduct('')}
                  >
                    <Icon name='Close' size={15} color='preto' ml="xxxs" />
                  </Button>
                </Box>
              </Animatable.View>
            }

            <ScrollView>

              <Alert
                onModalHide={() => {
                  modalRef.current && setSuccessModal(true);
                }}
                isVisible={showModal}
                title={"Excluir produto"}
                subtitle={"Tem certeza que deseja excluir o produto salvo em sua sacola?"}
                confirmText={"SIM"}
                cancelText={"NÃO"}
                onConfirm={async () => {
                  modalRef.current = true;
                  if (removeProduct) {
                    await removeItem(removeProduct?.id, removeProduct?.index, removeProduct?.seller, 0);
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
                    Sacola ({orderForm?.items.length})
                  </Typography>
                </Box>
                {orderForm?.items.map((item, index, array) => (
                  <Box key={index} bg="white" marginTop="xxxs">
                    {item.priceTags.find(x => x.identifier === 'd51ad0ed-150b-4ed6-92de-6d025ea46368') && <Box paddingBottom="nano">
                      <Typography fontFamily='nunitoRegular' fontSize={11} color='verdeSucesso'>
                        Desconto de 1° compra aplicado neste produto!
                      </Typography>
                    </Box>}
                    {item.priceTags.find(x => x.identifier === 'd51ad0ed-150b-4ed6-92de-6d025ea46368') && <Box position='absolute' zIndex={5} top={84} right={21}>
                      <Typography color='verdeSucesso' fontFamily='nunitoRegular' fontSize={11}>
                        -R$ 50
                      </Typography>
                    </Box>}
                    <ProductHorizontalListCard
                      isBag
                      discountApi={item.priceTags.find(x => x.identifier === 'd51ad0ed-150b-4ed6-92de-6d025ea46368') ? parseInt(`${item.priceTags[0].rawValue}`) : undefined}
                      disableCounter={item.priceTags.find(x => x.identifier === 'd51ad0ed-150b-4ed6-92de-6d025ea46368') && array.filter(x => x.uniqueId == item.uniqueId).length > 1}
                      currency={"R$"}
                      discountTag={
                        getPercent(
                          item.sellingPrice,
                          item.listPrice
                        )
                      }
                      itemColor={item.skuName.split("-")[0] || ""}
                      ItemSize={item.skuName.split("-")[1] || ""}
                      productTitle={item.name.split(" - ")[0]}
                      // installmentsNumber={item.installmentNumber}
                      // installmentsPrice={item.installmentPrice}
                      price={item.listPrice / 100}
                      priceWithDiscount={item.sellingPrice / 100}
                      count={optimistQuantities[index]}
                      onClickAddCount={async (count) => {
                        const firstItemIndex = array.findIndex(x => x.productId == item.productId)
                        console.log(firstItemIndex)
                        const prevCont = optimistQuantities[firstItemIndex]
                        await setOptimistQuantities([...optimistQuantities.slice(0, firstItemIndex), count, ...optimistQuantities.slice(firstItemIndex + 1)])
                        const { ok } = await addItem(count, item.id, item.seller);

                        if (!ok)
                          setOptimistQuantities([...optimistQuantities.slice(0, firstItemIndex), prevCont, ...optimistQuantities.slice(firstItemIndex + 1)])
                        //console.log('ok addCount', ok)

                        const erros = errorsMessages?.filter((erro) => erro.includes(item.name))
                        if (item.quantity != count) {
                          setNoProduct(erros[0])
                        }
                      }}
                      onClickSubCount={
                        async (count) => {
                          const prevCont = optimistQuantities[index]
                          if (prevCont <= 1) {
                            setShowModal(true)
                            setRemoveProduct({
                              id: item.id,
                              index: index,
                              seller: item.seller
                            })
                          } else {
                            setOptimistQuantities([...optimistQuantities.slice(0, index), count, ...optimistQuantities.slice(index + 1)])
                            const { ok } = await removeItem(
                              item.id,
                              index,
                              item.seller,
                              item.quantity - 1
                            )
                            if (!ok)
                              setOptimistQuantities([...optimistQuantities.slice(0, index), prevCont, ...optimistQuantities.slice(index + 1)])
                            console.log('ok subCount', ok)

                          }
                        }}
                      onClickClose={() => {
                        setShowModal(true)
                        setRemoveProduct({
                          id: item.id,
                          index: index,
                          seller: item.seller
                        })
                      }}
                      imageSource={item.imageUrl
                        .replace("http", "https")
                        .split("-55-55")
                        .join("")}
                    />
                  </Box>
                ))}
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

              <Box paddingX={"xxxs"}>
                {showLikelyProducts && (
                  <Divider marginTop={"xs"} variant={"fullWidth"} />
                )}

                <Box flexDirection={"row"} marginY={"xxs"} alignItems={"center"}>
                  <Box marginRight="micro">
                    <Icon name={"Presente"} size={20} />
                  </Box>
                  <Box flex={1}>
                    <Typography variant={"subtituloSessoes"}>
                      Embalagem para presente
                    </Typography>
                  </Box>
                  <Box marginLeft={"micro"}>
                    <Toggle
                      onValueChange={setHasBagGift}
                      thumbColor={"vermelhoAlerta"}
                      color={"preto"}
                      value={hasBagGift}
                    />
                  </Box>
                </Box>

                <Divider variant={"fullWidth"} />

                <Box
                  flexDirection={"row"}
                  marginTop={"xxs"}
                  marginBottom={"xxxs"}
                  alignItems={"center"}
                >
                  <Box marginRight="micro">
                    <Icon name={"Tag"} size={20} color="preto" />
                  </Box>
                  <Box flex={1}>
                    <Typography variant={"subtituloSessoes"}>
                      Código promocional{" "}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant={"tituloSessao"}>
                    Insira aqui o código do vendedor(a) e/ou cupom de desconto.
                  </Typography>
                </Box>
                <Box flexDirection="row">
                  {/* cupom vendedor */}
                  {!!sellerCode && (
                    <CouponBadge
                      value={sellerCode}
                      onPress={async () => {
                        setLoading(true);
                        await removeSellerCoupon(""); //remove passando ''
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
                        await removeCoupon(""); //remove passando ''
                        setLoading(false);
                      }}
                    />
                  )}
                </Box>

                <Box marginTop="nano" flexDirection="row">
                  <Box flex={1} marginRight={"micro"}>
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
                      disabled={!hasSellerCoupon()}
                    />
                  </Box>
                </Box>
                {!sellerCouponIsValid && (
                  <Box marginRight={"micro"}>
                    <Typography color="vermelhoAlerta" variant={"precoAntigo3"}>
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
                  <Box marginRight={"micro"}>
                    <Typography color="vermelhoAlerta" variant={"precoAntigo3"}>
                      Digite um código válido
                    </Typography>
                  </Box>
                )}

                <Divider variant={"fullWidth"} marginY={"xs"} />
                <>
                  {totalDiscountPrice != 0 || totalDelivery ?
                    <Box
                      marginBottom={"micro"}
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Typography variant={"precoAntigo3"}>Subtotal</Typography>
                      <PriceCustom
                        fontFamily={"nunitoSemiBold"}
                        sizeInterger={15}
                        sizeDecimal={11}
                        num={totalBag}
                      />
                    </Box>
                    : null
                  }
                  {totalDiscountPrice != 0 &&
                    <Box
                      marginBottom={"micro"}
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Typography variant={"precoAntigo3"}>Descontos</Typography>

                      <PriceCustom
                        fontFamily={"nunitoSemiBold"}
                        negative={true}
                        sizeInterger={15}
                        sizeDecimal={11}
                        num={Math.abs(totalDiscountPrice)}
                      />
                    </Box>
                  }
                  {totalDelivery > 0 &&
                    <Box
                      marginBottom={"micro"}
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Typography variant={"precoAntigo3"}>Entrega</Typography>

                      <PriceCustom
                        fontFamily={"nunitoSemiBold"}
                        sizeInterger={15}
                        sizeDecimal={11}
                        num={Math.abs(totalDelivery)}
                      />
                    </Box>
                  }
                </>

                <Box
                  marginBottom={"micro"}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography variant={"precoAntigo3"}>Total</Typography>
                  <PriceCustom
                    fontFamily={"nunitoBold"}
                    sizeInterger={20}
                    sizeDecimal={11}
                    num={totalBag + totalDiscountPrice + totalDelivery}
                  />
                </Box>
              </Box>
            </ScrollView>
          </>
          :
          <EmptyBag onPress={() => navigate('Offers')} />
      }

      <Box
        width={"100%"}
        height={145}
        bg="white"
      >
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
          orderForm && orderForm?.items.length > 0 &&
          <Box
            width="100%"
            bg="white"
            height={145}
            px="xxs"
            style={{ elevation: Platform.OS == "android" ? 10 : 0 }}
            boxShadow={Platform.OS == "android" ? null : "bottomBarShadow"}
          >
            <Box flexDirection="row" justifyContent="space-between" py="xxs">
              <Box>
                <Typography fontFamily="nunitoRegular" fontSize={13}>
                  Total:
                </Typography>

                <PriceCustom
                  fontFamily={"nunitoBold"}
                  sizeInterger={15}
                  sizeDecimal={11}
                  num={totalBag + totalDiscountPrice + totalDelivery}
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
                      {installmentInfo.installmentsNumber}x de{" "}
                    </Typography>

                    <PriceCustom
                      fontFamily={"nunitoBold"}
                      color="vermelhoRSV"
                      sizeInterger={15}
                      sizeDecimal={11}
                      num={installmentInfo.installmentPrice / 100}
                    />
                  </Box>
                </Box>
              )}
            </Box>

            <Button
              disabled={
                orderForm && orderForm?.items?.length === 0 ? true : false
              }
              onPress={onGoToDelivery}
              title="IR PARA ENTREGA"
              variant="primarioEstreito"
              inline
            />
          </Box>
        )}
      </Box>

    </SafeAreaView >
  );
};
