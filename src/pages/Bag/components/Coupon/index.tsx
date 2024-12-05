import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { CouponBadge } from '../CouponBadge';
import { useBagStore } from '../../../../zustand/useBagStore/useBagStore';
import { Box } from '../../../../components/Box/Box';
import { Divider } from '../../../../components/Divider/Divider';
import { IconLegacy } from '../../../../components/IconLegacy/IconLegacy';
import { Typography } from '../../../../components/Typography/Typography';
import { TextField } from '../../../../components/TextField/TextField';
import { Button } from '../../../../components/Button';
import { PriceCustom } from '../../../../modules/Checkout/components/PriceCustom';
import PrimeDiscount, { PrimeDiscountType } from '../../../../components/PrimeDiscount/PrimeDiscount';
import { ModalNowIsPrime } from '../../../../components/ModalNowIsPrime/ModalNowIsPrime';
import { usePrimeInfo } from '../../../../hooks/usePrimeInfo';
import { useRemoteConfig } from '../../../../hooks/useRemoteConfig';

export default function CouponComponent() {
  const {
    actions,
    appTotalizers,
    marketingData,
    prime,
  } = useBagStore([
    'actions',
    'appTotalizers',
    'marketingData',
    'prime',
  ]);
  const { isPrime } = usePrimeInfo();
  const { getBoolean } = useRemoteConfig();
  const [sellerCouponError, setSellerCouponError] = useState(false);
  const [discountCouponError, setDiscountCouponError] = useState(false);
  const [couponsValue, setCouponsValue] = useState({ seller: '', discount: '' });
  const [openModal, setOpenModal] = useState(false);

  const showPrimeDiscount = useMemo(() => getBoolean('show_prime_discount'), [getBoolean]);

  const totalPrime = useMemo(() => prime?.total, [prime?.total]);
  const totalDiscountPrime = useMemo(() => prime?.totalDiscount, [prime?.totalDiscount]);
  const renderAppPrime = useMemo(() => prime?.renderApp, [prime?.renderApp]);

  const handleSetCouponValue = useCallback((key: 'seller' | 'discount', currValue: string) => {
    setCouponsValue((oldValue) => ({
      ...oldValue,
      [key]: currValue,
    }));
  }, []);

  const handleAddSellerCoupon = useCallback(async () => {
    setSellerCouponError(false);

    await actions.ADD_SELLER_COUPON(couponsValue.seller)
      .catch(() => {
        setSellerCouponError(true);
      });

    handleSetCouponValue('seller', '');
  }, [actions, couponsValue.seller, handleSetCouponValue]);

  useEffect(() => {
    const doAction = async () => {
      if (!marketingData?.sellerCouponName && marketingData?.sellerCoupon) {
        await actions.ADD_SELLER_COUPON(marketingData?.sellerCoupon)
          .catch(() => {
            setSellerCouponError(true);
          });
      }
    };
    doAction();
  }, [marketingData?.sellerCouponName, marketingData?.sellerCoupon]);

  const handleAddDiscountCoupon = useCallback(async () => {
    setDiscountCouponError(false);

    await actions.ADD_DISCOUNT_COUPON(couponsValue.discount)
      .catch(() => setDiscountCouponError(true));

    handleSetCouponValue('discount', '');
  }, [actions, couponsValue.discount, handleSetCouponValue]);

  return (
    <Box paddingX="micro" testID="com.usereserva:id/Coupon_Component">
      <Divider variant="fullWidth" />
      <Box
        flexDirection="row"
        marginTop="xxs"
        marginBottom="xxxs"
        alignItems="center"
      >
        <Box marginRight="micro">
          <IconLegacy name="Tag" size={20} color="preto" />
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

      <Box
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
      {showPrimeDiscount && (
        <PrimeDiscount
          type={PrimeDiscountType.BagCoupon}
          totalPrime={totalPrime}
          discountPrime={totalDiscountPrime}
          renderApp={renderAppPrime}
          setOpenModal={setOpenModal}
        />
      )}
      {openModal && showPrimeDiscount && (
        <ModalNowIsPrime isVisible={openModal} onBackdropPress={() => setOpenModal(false)} />
      )}
    </Box>
  );
}
