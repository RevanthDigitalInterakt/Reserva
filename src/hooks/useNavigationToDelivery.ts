import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import appsFlyer from 'react-native-appsflyer';
import analytics from '@react-native-firebase/analytics';
import { useBagStore } from '../zustand/useBagStore/useBagStore';
import EventProvider from '../utils/EventProvider';
import { getBrands } from '../utils/getBrands';
import {
  getAFContent, getAFContentId, getAFContentType, sumQuantity,
} from '../utils/checkoutInitiatedEvents';
import { ExceptionProvider } from '../base/providers/ExceptionProvider';
import { usePrimeInfo } from './usePrimeInfo';
import { usePrimeStore } from '../zustand/usePrimeStore/usePrimeStore';
import { useCart } from '../context/CartContext';
import { useRemoteConfig } from './useRemoteConfig';
import { usePageLoadingStore } from '../zustand/usePageLoadingStore/usePageLoadingStore';
import { Method } from '../utils/EventProvider/Event';

interface IUseNavigationToDeliveryReturn {
  handleNavigateToDelivery: (value: any) => void;
  navigateToDeliveryDisable: boolean;
  loadingDelivery: boolean;
  setLoadingDelivery: (value: boolean) => void;
}

export const useNavigationToDelivery = (): IUseNavigationToDeliveryReturn => {
  const navigation = useNavigation();
  const route = useRoute();
  const [navigateToDeliveryDisable, setNavigateToDeliveryDisable] = useState(false);
  const [loadingDelivery, setLoadingDelivery] = useState(false);

  const needRefreshing = route.params?.needRefreshing;

  const {
    items,
    orderFormId,
    actions,
    appTotalizers,
    hasPrimeSubscriptionInCart,
  } = useBagStore([
    'items',
    'orderFormId',
    'actions',
    'appTotalizers',
    'hasPrimeSubscriptionInCart']);

  const { restoreCart } = useCart();

  const { primeActive } = usePrimeInfo();
  const { onFinishLoad } = usePageLoadingStore(['onFinishLoad']);

  const { changeStateIsVisibleModalPrimeRemoved } = usePrimeStore([
    'changeStateIsVisibleModalPrimeRemoved',
  ]);

  const { getBoolean } = useRemoteConfig();

  const showNewWebviewCheckout = useMemo(() => (
    getBoolean('show_new_webview_checkout')
  ), [getBoolean]);

  useEffect(() => {
    if (needRefreshing) {
      actions.REFETCH_ORDER_FORM().then(() => {});
    }
  }, [actions, needRefreshing]);

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
        quantity: JSON.stringify(getAFContent(items)),
      });
    } catch (err) {
      ExceptionProvider.captureException(err);
    }
  }, [appTotalizers, items]);

  const hasPrimeRemovedFromBag = useCallback(async (profile) => {
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
  ]);

  const handleNavigateToDelivery = useCallback(async (profile) => {
    if (!items?.length) return;

    if (!profile?.email) {
      navigation.navigate('Login', { comeFrom: 'BagScreen' });
      return;
    }

    if (!profile.isComplete) {
      await restoreCart(orderFormId);

      EventProvider.logEvent('complete_registration', {
        method: Method.Email,
        custumer_email: profile?.email,
      });

      navigation.navigate('EditProfile', { isRegister: true, comeFrom: 'BagScreen' });
      return;
    }

    try {
      setNavigateToDeliveryDisable(true);

      onTrackCheckoutEvents();

      await actions.REMOVE_UNAVAILABLE_ITEMS();

      const primeRemovedFromCart = await hasPrimeRemovedFromBag(profile);

      await actions.REFRESH_ORDER_FORM();

      await restoreCart(orderFormId);

      if (!primeRemovedFromCart) {
        if (showNewWebviewCheckout) {
          setNavigateToDeliveryDisable(false);
          navigation.navigate('Checkout', {
            url: `https://appqa.usereserva.com/checkout?orderFormId=${orderFormId}/&test=2&webview=true&app=applojausereserva&savecard=true&utm_source=app/#/shipping`,
          });
        } else {
          navigation.navigate('DeliveryScreen', {});
        }
      }
    } catch (error) {
      ExceptionProvider.captureException(
        error,
        { orderFormId, items },
        {},
        { message: 'Error [handleNavigateToDelivery]' },
      );
      onFinishLoad();
    } finally {
      setNavigateToDeliveryDisable(false);
      setLoadingDelivery(false);
    }
  }, [
    setNavigateToDeliveryDisable,
    actions,
    items,
    navigation,
    onTrackCheckoutEvents,
    orderFormId,
    restoreCart,
    showNewWebviewCheckout,
  ]);

  return {
    handleNavigateToDelivery,
    navigateToDeliveryDisable,
    loadingDelivery,
    setLoadingDelivery,
  };
};
