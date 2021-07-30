import React, { useEffect, useState, useCallback } from "react";
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
  ProductVerticalListCard,
} from "reserva-ui";
import { PriceCustom } from "../components/PriceCustom";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import { useNavigation } from "@react-navigation/native";
import { createAnimatableComponent } from "react-native-animatable";
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

const BoxAnimated = createAnimatableComponent(Box);

export const BagScreen = () => {
  const { navigate } = useNavigation();
  const {
    orderForm,
    addItem,
    orderform,
    removeItem,
    addCoupon,
    addSellerCoupon,
    removeCoupon,
    removeSellerCoupon,
  } = useCart();
  const [loading, setLoading] = useState(false);
  const [totalBag, setTotalBag] = useState(0);
  const [totalDiscountPrice, setTotalDiscountPrice] = useState(0);
  const [hasBagGift, setHasBagGift] = React.useState(false);
  const [showLikelyProducts, setShowLikelyProducts] = React.useState(true);
  const [sellerCoupon, setSellerCoupon] = React.useState<string>("");
  const [discountCoupon, setDiscountCoupon] = React.useState<string>("");
  const [sellerCode, setSellerCode] = React.useState<string | undefined>("");
  const [sellerCouponIsValid, setSellerCouponIsValid] = useState<boolean>(true);
  const [couponIsInvalid, setCouponIsInvalid] = useState<boolean>(false);
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

  useEffect(() => {
    firstLoadOrderForm();
  }, []);

  useEffect(() => {
    const totalItensPrice =
      (orderForm?.totalizers.find((x) => x.id === "Items")?.value || 0) / 100;
    const totalDiscountPrice =
      (orderForm?.totalizers.find((x) => x.id === "Discounts")?.value || 0) /
      100;

    const sellerCode =
      orderForm?.marketingData?.marketingTags[1]?.split("=")[1];

    const installment =
      orderForm?.paymentData?.installmentOptions
        ?.find((x) => x.paymentSystem == 4)
        ?.installments?.reverse()[0] || null;

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

    setTotalBag(totalItensPrice);
    setTotalDiscountPrice(totalDiscountPrice);
    setSellerCode(sellerCode);
  }, [orderForm]);

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

  const onGoToDelivery = () => {
    if (orderForm) {
      const { clientProfileData, shippingData } = orderForm;
      const hasCustomer =
        clientProfileData &&
        clientProfileData.email &&
        clientProfileData.firstName;

      const hasAddress =
        shippingData && shippingData.availableAddresses.length > 0;

      if (!hasCustomer && !hasAddress) {
        navigate("EnterYourEmail");
      } else {
        navigate("DeliveryScreen");
      }
    }
  };

  return (
    <SafeAreaView
      style={{
        justifyContent: "space-between",
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <TopBarBackButton showShadow loading={loading} />
      {loading ? (
        <ScrollView scrollEnabled={false}>
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
        </ScrollView>
      ) : (
        <ScrollView>
          <Box paddingX={"xxxs"} paddingY={"xxs"}>
            <Box bg={"white"} marginTop={"xxs"}>
              <Typography variant="tituloSessoes">
                Sacola ({orderForm?.items.length})
              </Typography>
            </Box>

            {orderForm?.items.map((item, index) => (
              <Box key={index} bg={"white"} marginTop={"xxxs"}>
                <ProductHorizontalListCard
                  isBag
                  currency={"R$"}
                  discountTag={
                    item.sellingPrice > 0 ? item.sellingPrice / 100 : undefined
                  }
                  itemColor={item.skuName.split("-")[0] || ""}
                  ItemSize={item.skuName.split("-")[1] || ""}
                  productTitle={item.name.split(" - ")[0]}
                  // installmentsNumber={item.installmentNumber}
                  // installmentsPrice={item.installmentPrice}
                  price={item.listPrice / 100}
                  priceWithDiscount={item.sellingPrice / 100}
                  count={item.quantity}
                  onClickAddCount={async (count) => {
                    console.log(count);
                    await addItem(count, item.id, item.seller);
                  }}
                  onClickSubCount={async (count) =>
                    await removeItem(
                      item.id,
                      index,
                      item.seller,
                      item.quantity - 1
                    )
                  }
                  onClickClose={async () => {
                    await removeItem(item.id, index, item.seller, 0);
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
            {totalDiscountPrice != 0 && (
              <>
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
              </>
            )}
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
                num={totalBag + totalDiscountPrice}
              />
            </Box>
          </Box>
        </ScrollView>
      )}
      <Box
        width={"100%"}
        height={145}
        px="xxs"
        bg="white"
        style={{ elevation: Platform.OS == "android" ? 10 : 0 }}
        boxShadow={Platform.OS == "android" ? null : "bottomBarShadow"}
      >
        {loading ? (
          <Box>
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
          <>
            <Box flexDirection="row" justifyContent="space-between" py="xxs">
              <Box>
                <Typography fontFamily="nunitoRegular" fontSize={13}>
                  Total:
                </Typography>

                <PriceCustom
                  fontFamily={"nunitoBold"}
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
                      {installmentInfo.installmentsNumber}x de{" "}
                      {console.log("preço", installmentInfo.totalPrice)}
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
          </>
        )}
      </Box>
    </SafeAreaView>
  );
};
