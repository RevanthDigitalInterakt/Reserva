import React, { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Icon,
  TextField,
  Typography,
} from '@usereservaapp/reserva-ui';
import { CouponBadge } from '../../../../modules/Checkout/components/CouponBadge';
import useBagStore from '../../../../zustand/useBagStore/useBagStore';
import { PriceCustom } from '../../../../modules/Checkout/components/PriceCustom';
import { useCart } from '../../../../context/CartContext';

export default function CouponComponent() {
  const { orderForm } = useCart();

  const {
    couponInfo: { seller, discount },
    bagInfos,
    dispatch,
    getPriceWithDiscount,
  } = useBagStore();

  const [couponsValue, setCouponsValue] = useState({
    seller: '',
    discount: '',
  });

  const handleSetCouponValue = useCallback(
    (key: 'seller' | 'discount', currentValue: string) => {
      setCouponsValue((oldValue) => ({
        ...oldValue,
        [key]: currentValue,
      }));
    },
    [],
  );

  const handleActiveTopBarLoading = useCallback(async () => {
    await dispatch({
      actionType: 'SET_TOP_BAR_LOADING',
      payload: {
        value: {
          topBarLoading: true,
        },
      },
    });
  }, [dispatch]);

  const handleRefreshBag = useCallback(async () => {
    await dispatch({
      actionType: 'INITIAL_SET_ORDER_FORM',
      payload: {
        value: {
          orderForm,
        },
      },
    });
  }, [dispatch, orderForm]);

  const handleAddSellerCoupom = useCallback(async () => {
    await handleActiveTopBarLoading();

    await dispatch({
      actionType: 'HANDLE_ADD_SELLER_COUPON',
      payload: {
        value: couponsValue.seller,
      },
    });

    handleSetCouponValue('seller', '');

    await handleRefreshBag();
  }, [
    handleActiveTopBarLoading,
    dispatch,
    couponsValue.seller,
    handleSetCouponValue,
    handleRefreshBag]);

  const handleRemoveSellerCoupom = useCallback(async () => {
    await handleActiveTopBarLoading();

    await dispatch({
      actionType: 'HANDLE_REMOVE_SELLER_COUPON',
      payload: { value: {} },
    });

    await handleRefreshBag();
  }, [dispatch, handleActiveTopBarLoading, handleRefreshBag]);

  const handleAddDiscountCoupon = useCallback(async () => {
    await handleActiveTopBarLoading();

    dispatch({
      actionType: 'HANDLE_ADD_DISCOUNT_COUPON',
      payload: {
        value: {
          coupon: couponsValue.discount,
        },
      },
    });

    handleSetCouponValue('discount', '');
  }, [
    handleActiveTopBarLoading,
    dispatch,
    couponsValue.discount,
    handleSetCouponValue,
  ]);

  const handleRemoveDiscountCoupon = useCallback(() => {
    handleActiveTopBarLoading();

    dispatch({
      actionType: 'HANDLE_REMOVE_DISCOUNT_COUPON',
      payload: { value: {} },
    });
  }, [handleActiveTopBarLoading, dispatch]);

  return (
    <Box paddingX="micro">
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
          Informe aqui o código do vendedor(a) e/ou cupom de desconto
        </Typography>
      </Box>
      <Box flexDirection="row">
        {/* cupom vendedor */}
        {!!seller.sellerCode && (
          <CouponBadge
            testID="com.usereserva:id/CouponBadge_sellerCode"
            value={`${seller.sellerName} | ${seller.sellerCode.toUpperCase()}`}
            onPress={handleRemoveSellerCoupom}
          />
        )}

        {/* cupom desconto */}
        {!!discount.discountCode && (
          <CouponBadge
            testID="com.usereserva:id/CouponBadge_discountCode"
            value={discount.discountCode}
            onPress={handleRemoveDiscountCoupon}
          />
        )}
      </Box>

      <Box marginTop="nano" flexDirection="row">
        <Box flex={1} marginRight="micro">
          <TextField
            height={50}
            value={couponsValue.seller}
            onChangeText={(text) => handleSetCouponValue('seller', text)}
            placeholder="Código do vendedor"
          />
        </Box>
        <Box>
          <Button
            testID="com.usereserva:id/button_add_seller_Coupom"
            width="100%"
            title="APLICAR"
            onPress={handleAddSellerCoupom}
            variant="primarioEstreito"
            disabled={couponsValue.seller.length === 0}
          />
        </Box>
      </Box>
      {seller.sellerCouponError && (
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
            value={couponsValue.discount}
            onChangeText={(text) => handleSetCouponValue('discount', text)}
            placeholder="Cupom de desconto"
          />
        </Box>
        <Box>
          <Button
            testID="com.usereserva:id/button_add_discount_Coupom"
            width="100%"
            title="APLICAR"
            onPress={handleAddDiscountCoupon}
            variant="primarioEstreito"
            disabled={couponsValue.discount.length === 0}
          />
        </Box>
      </Box>
      {discount.discountCouponError && (
        <Box marginRight="micro">
          <Typography color="vermelhoAlerta" variant="precoAntigo3">
            Digite um cupom válido
          </Typography>
        </Box>
      )}

      <Divider variant="fullWidth" marginY="xs" />
      <>
        {bagInfos.totalBagDiscountPrice !== 0
        || bagInfos.totalBagDeliveryPrice ? (
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
              num={bagInfos.totalBagItemsPrice}
            />
          </Box>
          ) : null}
        {bagInfos.totalBagDiscountPrice !== 0 && (
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
              num={Math.abs(bagInfos.totalBagDiscountPrice)}
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
          num={getPriceWithDiscount({})}
        />
      </Box>
    </Box>
  );
}
