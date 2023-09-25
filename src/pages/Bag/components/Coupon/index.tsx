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
import { useBagStore } from '../../../../zustand/useBagStore/useBagStore';
import { PriceCustom } from '../../../../modules/Checkout/components/PriceCustom';
import SectionProductsWithDiscount from '../SectionProductsWithDiscount';

export default function CouponComponent() {
  const {
    actions,
    appTotalizers,
    marketingData,
  } = useBagStore(['actions', 'appTotalizers', 'marketingData']);

  const [sellerCouponError, setSellerCouponError] = useState(false);
  const [discountCouponError, setDiscountCouponError] = useState(false);
  const [couponsValue, setCouponsValue] = useState({ seller: '', discount: '' });

  const handleSetCouponValue = useCallback((key: 'seller' | 'discount', currValue: string) => {
    setCouponsValue((oldValue) => ({
      ...oldValue,
      [key]: currValue,
    }));
  }, []);

  const handleAddSellerCoupon = useCallback(async () => {
    setSellerCouponError(false);

    await actions.ADD_SELLER_COUPON(couponsValue.seller)
      .catch(() => setSellerCouponError(true));

    handleSetCouponValue('seller', '');
  }, [actions, couponsValue.seller, handleSetCouponValue]);

  const handleAddDiscountCoupon = useCallback(async () => {
    setDiscountCouponError(false);

    await actions.ADD_DISCOUNT_COUPON(couponsValue.discount)
      .catch(() => setDiscountCouponError(true));

    handleSetCouponValue('discount', '');
  }, [actions, couponsValue.discount, handleSetCouponValue]);

  return (
    <>
      <Box paddingX="micro" testID="com.usereserva:id/Coupon_Component">
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
          {!!marketingData?.sellerCoupon && (
            <CouponBadge
              testID="com.usereserva:id/CouponBadge_sellerCode"
              value={`${marketingData?.sellerCouponName} | ${marketingData?.sellerCoupon.toUpperCase()}`}
              onPress={actions.REMOVE_SELLER_COUPON}
            />
          )}

          {/* cupom desconto */}
          {!!marketingData?.coupon && (
            <CouponBadge
              testID="com.usereserva:id/CouponBadge_discountCode"
              value={marketingData?.coupon}
              onPress={actions.REMOVE_DISCOUNT_COUPON}
            />
          )}
        </Box>

        <Box marginTop="nano" flexDirection="row">
          <Box flex={1} marginRight="micro">
            <TextField
              testID="com.usereserva:id/text_field_add_seller_Coupon"
              height={50}
              value={couponsValue.seller}
              onChangeText={(text) => handleSetCouponValue('seller', text)}
              placeholder="Código do vendedor"
            />
          </Box>
          <Box>
            <Button
              testID="com.usereserva:id/button_add_seller_Coupon"
              width="100%"
              title="APLICAR"
              onPress={handleAddSellerCoupon}
              variant="primarioEstreito"
              disabled={couponsValue.seller.length === 0}
            />
          </Box>
        </Box>

        {sellerCouponError && (
          <Box marginRight="micro">
            <Typography color="vermelhoAlerta" variant="precoAntigo3">
              Digite um código válido
            </Typography>
          </Box>
        )}

        <Box marginTop="xxxs" flexDirection="row">
          <Box flex={1} marginRight="micro">
            <TextField
              testID="com.usereserva:id/text_field_add_discount_Coupon"
              height={50}
              value={couponsValue.discount}
              onChangeText={(text) => handleSetCouponValue('discount', text)}
              placeholder="Cupom de desconto"
            />
          </Box>
          <Box>
            <Button
              testID="com.usereserva:id/button_add_discount_Coupon"
              width="100%"
              title="APLICAR"
              onPress={handleAddDiscountCoupon}
              variant="primarioEstreito"
              disabled={couponsValue.discount.length === 0}
            />
          </Box>
        </Box>

        {discountCouponError && (
          <Box marginRight="micro">
            <Typography color="vermelhoAlerta" variant="precoAntigo3">
              Digite um cupom válido
            </Typography>
          </Box>
        )}

        <Divider variant="fullWidth" marginY="xs" />

        <>
          {appTotalizers.discount !== 0 || appTotalizers.total ? (
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
                num={appTotalizers.items}
              />
            </Box>
          ) : null}

          {appTotalizers.delivery > 0 && (
            <Box
              marginBottom="micro"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="precoAntigo3">Frete</Typography>
              <PriceCustom
                fontFamily="nunitoSemiBold"
                sizeInterger={15}
                sizeDecimal={11}
                num={Math.abs(appTotalizers.delivery)}
              />
            </Box>
          )}

          {appTotalizers.discount !== 0 && (
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
                num={Math.abs(appTotalizers.discount)}
              />
            </Box>
          )}
        </>

        <SectionProductsWithDiscount />

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
            num={appTotalizers.total}
          />
        </Box>
      </Box>
    </>
  );
}
