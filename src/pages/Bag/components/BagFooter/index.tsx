import { Platform } from 'react-native';
import * as Sentry from '@sentry/react-native';
import React, { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import appsFlyer from 'react-native-appsflyer';
import analytics from '@react-native-firebase/analytics';
import { platformType } from '../../../../utils/platformType';
import { PriceCustom } from '../../../../modules/Checkout/components/PriceCustom';
import { useBagStore } from '../../../../zustand/useBagStore/useBagStore';
import {
  getAFContent,
  getAFContentId,
  getAFContentType,
  sumQuantity,
} from '../../../../utils/checkoutInitiatedEvents';
import EventProvider from '../../../../utils/EventProvider';
import { useCart } from '../../../../context/CartContext';
import { getBrands } from '../../../../utils/getBrands';
import { useAuthStore } from '../../../../zustand/useAuth/useAuthStore';
import { usePrimeInfo } from '../../../../hooks/usePrimeInfo';
import { usePrimeStore } from '../../../../zustand/usePrimeStore/usePrimeStore';
import { Box } from '../../../../components/Box/Box';
import { Typography } from '../../../../components/Typography/Typography';
import { Button } from '../../../../components/Button';

export default function BagFooter() {
  const {
    items,
    orderFormId,
    actions,
    appTotalizers,
    topBarLoading,
    installmentInfo,
    hasPrimeSubscriptionInCart,
  } = useBagStore([
    'orderFormId',
    'appTotalizers',
    'actions',
    'topBarLoading',
    'installmentInfo',
    'items',
    'hasPrimeSubscriptionInCart',
  ]);

  const navigation = useNavigation();
  const { restoreCart } = useCart();
  const { profile } = useAuthStore(['profile']);
  const { primeActive } = usePrimeInfo();

  const { changeStateIsVisibleModalPrimeRemoved } = usePrimeStore([
    'changeStateIsVisibleModalPrimeRemoved',
  ]);

  const [navigateToDeliveryDisable, setNavigateToDeliveryDisable] = useState<boolean>(false);

  const onTrackCheckoutEvents = useCallback(() => {
    try {
      const { total, discount, delivery } = appTotalizers;

      const newItems = items.map((item) => ({
        price: (item.price / 100) || 0,
        item_id: item.productId,
        quantity: item.quantity,
        item_name: item.name,
        item_variant: item.skuName,
        item_category: 'product',
      }));

      EventProvider.logEvent('begin_checkout', {
        coupon: '',
        currency: 'BRL',
        items: newItems,
        value: total + discount + delivery,
        wbrand: getBrands(items),
      });

      appsFlyer.logEvent('af_initiated_checkout', {
        af_content_type: 'product',
        af_price: total + discount + delivery,
        af_currency: 'BRL',
        af_content_id: getAFContentId(items),
        af_quantity: sumQuantity(items),
        af_content: getAFContent(items),
      });

      const contentTypeItems = getAFContentType(items);
      const contentIdsItems = getAFContentId(items);

      analytics().logEvent('checkout_initiated', {
        price: total + discount + delivery,
        content_type: JSON.stringify(contentTypeItems),
        content_ids: JSON.stringify(contentIdsItems),
        currency: 'BRL',
        quantity: getAFContent(items),
      });
    } catch (err) {
      EventProvider.captureException(err);
    }
  }, [appTotalizers, items]);

  const hasPrimeRemovedFromBag = useCallback(async () => {
    if (profile?.isPrime && hasPrimeSubscriptionInCart && primeActive) {
      const primeItemIndex = items.findIndex((item) => item.isPrimeSubscription);

      if (primeItemIndex !== -1) {
        changeStateIsVisibleModalPrimeRemoved(true);

        await actions.UPDATE_PRODUCT_COUNT(primeItemIndex, items[primeItemIndex]!, 0);

        return true;
      }
    }

    return false;
  }, [
    actions,
    changeStateIsVisibleModalPrimeRemoved,
    hasPrimeSubscriptionInCart,
    items,
    primeActive,
    profile?.isPrime,
  ]);

  const handleNavigateToDelivery = useCallback(async () => {
    setNavigateToDeliveryDisable(true);

    if (!items?.length) return;

    if (!profile?.email) {
      navigation.navigate('Login', { comeFrom: 'Checkout' });
      return;
    }

    if (!profile.isComplete) {
      await restoreCart(orderFormId);

      EventProvider.logEvent('complete_registration', {
        registration_method: 'email',
        custumer_email: profile?.email,
      });

      navigation.navigate('EditProfile', { isRegister: true });
      return;
    }

    try {
      onTrackCheckoutEvents();

      await actions.REMOVE_UNAVAILABLE_ITEMS();

      const primeRemovedFromCart = await hasPrimeRemovedFromBag();

      await actions.REFRESH_ORDER_FORM();

      await restoreCart(orderFormId);

      if (!primeRemovedFromCart) {
        navigation.navigate('DeliveryScreen', {});
      }
    } catch (error) {
      Sentry.withScope((scope) => {
        scope.setExtra('orderFormId', orderFormId);
        scope.setExtra('items', items);
        scope.addBreadcrumb({ message: 'Error [handleNavigateToDelivery]' });
        Sentry.captureException(error);
      });
    } finally {
      setNavigateToDeliveryDisable(false);
    }
  }, [
    actions,
    items,
    navigation,
    onTrackCheckoutEvents,
    orderFormId,
    profile?.email,
    profile?.isComplete,
    restoreCart,
  ]);

  if (!items?.length) {
    return null;
  }

  return (
    <Box
      width="100%"
      bg="white"
      height={145}
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

        {appTotalizers.total > 0 && (
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

      <Button
        disabled={(
          items.length === 0
          || topBarLoading
          || navigateToDeliveryDisable
        )}
        onPress={handleNavigateToDelivery}
        title="IR PARA ENTREGA"
        variant="primarioEstreito"
        inline
        testID="com.usereserva:id/bag_button_go_to_delivery"
      />
    </Box>
  );
}
