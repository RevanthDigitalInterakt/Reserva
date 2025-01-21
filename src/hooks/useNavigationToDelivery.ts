import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import appsFlyer from 'react-native-appsflyer';
import analytics from '@react-native-firebase/analytics';
import Config from 'react-native-config';
import { useBagStore } from '../zustand/useBagStore/useBagStore';
import EventProvider from '../utils/EventProvider';
import { getBrands } from '../utils/getBrands';
import {
  getAFContent, getAFContentId, getAFContentType, sumQuantity,
} from '../utils/checkoutInitiatedEvents';
import { ExceptionProvider } from '../base/providers/ExceptionProvider';
import { usePrimeInfo } from './usePrimeInfo';
import { usePrimeStore } from '../zustand/usePrimeStore/usePrimeStore';
import { usePageLoadingStore } from '../zustand/usePageLoadingStore/usePageLoadingStore';
import { Method } from '../utils/EventProvider/Event';
import { mergeItemsPackage } from '../utils/mergeItemsPackage';
import type { ProfileOutput } from '../base/graphql/generated';
import { removeSkuColorProductName } from '../utils/products/removeSkuColorProductName';

interface IUseNavigationToDeliveryReturn {
  handleNavigateToDelivery: (value: any, comeFrom?: string) => void;
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
    packageItems,
    orderFormId,
    actions,
    appTotalizers,
    hasPrimeSubscriptionInCart,
  } = useBagStore([
    'packageItems',
    'orderFormId',
    'actions',
    'appTotalizers',
    'hasPrimeSubscriptionInCart']);

  const { primeActive } = usePrimeInfo();
  const { onFinishLoad } = usePageLoadingStore(['onFinishLoad']);

  const { changeStateIsVisibleModalPrimeRemoved } = usePrimeStore([
    'changeStateIsVisibleModalPrimeRemoved',
  ]);

  const mergedItems = useMemo(() => mergeItemsPackage(packageItems), [packageItems]);

  useEffect(() => {
    if (needRefreshing) {
      actions.REFETCH_ORDER_FORM().then(() => { });
    }
  }, [actions, needRefreshing]);

  const onTrackCheckoutEvents = useCallback(() => {
    try {
      const { total, discount, delivery } = appTotalizers;

      const newMergedItems = mergedItems.map((item) => ({
        item_id: item.productId,
        item_name: removeSkuColorProductName(item.name, item.skuName),
        item_variant: item.skuName,
        item_category: 'product',
        price: (item.price / 100) || 0,
        quantity: item.quantity,
      }));

      EventProvider.logEvent('begin_checkout', {
        coupon: '',
        currency: 'BRL',
        items: newMergedItems,
        value: total + discount + delivery,
        item_brand: getBrands(mergedItems),
      });

      appsFlyer.logEvent('af_initiated_checkout', {
        af_content_type: 'product',
        af_price: total + discount + delivery,
        af_currency: 'BRL',
        af_content_id: getAFContentId(mergedItems),
        af_quantity: sumQuantity(mergedItems),
        af_content: getAFContent(mergedItems),
      });

      const contentTypeItems = getAFContentType(mergedItems);
      const contentIdsItems = getAFContentId(mergedItems);

      analytics().logEvent('checkout_initiated', {
        price: total + discount + delivery,
        content_type: JSON.stringify(contentTypeItems),
        content_ids: JSON.stringify(contentIdsItems),
        currency: 'BRL',
        quantity: JSON.stringify(getAFContent(mergedItems)),
      });
    } catch (err) {
      ExceptionProvider.captureException(err, "onTrackCheckoutEvents - useNavigationToDelivery.ts");
    }
  }, [appTotalizers, mergedItems]);

  const goToWebviewCheckout = useCallback((value: string, comeFrom?: string) => {
    navigation.navigate('Checkout', {
      url: `${Config.URL_VTEX_QA}/checkout?orderFormId=${value}/&test=2&webview=true&app=applojausereserva&savecard=true&utm_source=app/#/shipping`,
      comeFrom,
    });
  }, []);

  const hasPrimeRemovedFromBag = useCallback(async (profile) => {
    if (profile?.isPrime && hasPrimeSubscriptionInCart && primeActive) {
      const primeItemIndex = mergedItems.findIndex((item) => item.isPrimeSubscription);

      if (primeItemIndex !== -1) {
        changeStateIsVisibleModalPrimeRemoved(true);

        await actions.UPDATE_PRODUCT_COUNT(primeItemIndex, mergedItems[primeItemIndex]!, 0);

        return true;
      }
    }

    return false;
  }, [
    actions,
    changeStateIsVisibleModalPrimeRemoved,
    hasPrimeSubscriptionInCart,
    mergedItems,
    primeActive,
  ]);

  const handleNavigateToDelivery = useCallback(async (
    profile: ProfileOutput,
    comeFrom?: string,
  ) => {
    if (!mergedItems?.length) return;

    if (!profile?.email) {
      navigation.navigate('Login', { comeFrom: comeFrom || 'BagScreen' });
      return;
    }

    if (!profile.isComplete) {
      await actions.REFETCH_ORDER_FORM();

      EventProvider.logEvent('complete_registration', {
        method: Method.Email,
        custumer_email: profile?.email,
      });

      navigation.navigate('EditProfile', { isRegister: true, comeFrom: comeFrom || 'BagScreen' });
      return;
    }

    try {
      setNavigateToDeliveryDisable(true);

      await actions.REMOVE_UNAVAILABLE_ITEMS();

      await hasPrimeRemovedFromBag(profile);

      goToWebviewCheckout(orderFormId, comeFrom);

      onTrackCheckoutEvents();
    } catch (error) {
      ExceptionProvider.captureException(
        error,
        "handleNavigateToDelivery - useNavigationToDelivery.ts",
        { orderFormId, mergedItems: (JSON.stringify(mergedItems) || "") },
      );
      onFinishLoad();
    } finally {
      setNavigateToDeliveryDisable(false);
      setLoadingDelivery(false);
    }
  }, [
    setNavigateToDeliveryDisable,
    actions,
    mergedItems,
    navigation,
    onTrackCheckoutEvents,
    orderFormId,
  ]);

  return {
    handleNavigateToDelivery,
    navigateToDeliveryDisable,
    loadingDelivery,
    setLoadingDelivery,
  };
};
