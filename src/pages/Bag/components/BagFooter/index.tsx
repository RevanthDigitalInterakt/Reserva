import { Platform } from 'react-native';
import React, { useMemo } from 'react';
import { platformType } from '../../../../utils/platformType';
import { PriceCustom } from '../../../../modules/Checkout/components/PriceCustom';
import { useBagStore } from '../../../../zustand/useBagStore/useBagStore';
import { useNavigationToDelivery } from '../../../../hooks/useNavigationToDelivery';
import { useAuthStore } from '../../../../zustand/useAuth/useAuthStore';
import { Box } from '../../../../components/Box/Box';
import { Typography } from '../../../../components/Typography/Typography';
import { Button } from '../../../../components/Button';
import { mergeItemsPackage } from '../../../../utils/mergeItemsPackage';
import PrimeDiscount, { PrimeDiscountType } from '../../../../components/PrimeDiscount/PrimeDiscount';
import { usePrimeInfo } from '../../../../hooks/usePrimeInfo';
import { useRemoteConfig } from '../../../../hooks/useRemoteConfig';

export default function BagFooter() {
  const {
    packageItems,
    appTotalizers,
    installmentInfo,
    prime,
  } = useBagStore([
    'appTotalizers',
    'topBarLoading',
    'installmentInfo',
    'packageItems',
    'prime',
  ]);
  const { profile } = useAuthStore(['profile']);
  const { isPrime } = usePrimeInfo();
  const { getBoolean } = useRemoteConfig();
  const {
    handleNavigateToDelivery,
    navigateToDeliveryDisable,
  } = useNavigationToDelivery();

  const items = useMemo(() => mergeItemsPackage(packageItems), [packageItems]);
  const showPrimeDiscount = useMemo(() => getBoolean('show_prime_discount'), [getBoolean]);

  const totalDiscountPrime = useMemo(() => prime?.totalDiscount, [prime?.totalDiscount]);
  const totalPrime = useMemo(() => prime?.total, [prime?.total]);

  if (!items?.length) {
    return null;
  }

  return (
    <Box
      width="100%"
      bg="white"
      height={isPrime ? 200 : 145}
      px="xxs"
      style={{ elevation: Platform.OS === platformType.ANDROID ? 10 : 0 }}
      boxShadow={Platform.OS === platformType.ANDROID ? null : 'bottomBarShadow'}
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
            num={appTotalizers.total}
          />
        </Box>

        {installmentInfo.totalPrice > 0 && appTotalizers.total > 0 && (
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
                num={installmentInfo.installmentPrice}
              />
            </Box>
          </Box>
        )}
      </Box>
      {showPrimeDiscount && (
        <PrimeDiscount
          type={PrimeDiscountType.BagFooter}
          setNegativeValue
          totalPrime={totalPrime}
          discountPrime={totalDiscountPrime}
        />
      )}

      <Button
        disabled={(
          items.length === 0 || navigateToDeliveryDisable
        )}
        onPress={() => handleNavigateToDelivery(profile)}
        title="IR PARA ENTREGA"
        variant="primarioEstreito"
        inline
        testID="com.usereserva:id/bag_button_go_to_delivery"
      />
    </Box>
  );
}
