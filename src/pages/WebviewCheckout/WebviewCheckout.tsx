import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { Platform, View } from 'react-native';
import deviceInfo from 'react-native-device-info';
import { WebView, type WebViewMessageEvent, type WebViewNavigation } from 'react-native-webview';

import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ExceptionProvider } from '../../base/providers/ExceptionProvider';
import { Button } from '../../components/Button';
import { getAsyncStorageItem } from '../../hooks/useAsyncStorageProvider';
import { TopBarBackButton } from '../../modules/Menu/components/TopBarBackButton';
import { GetPurchaseData } from '../../services/vtexService';
import EventProvider from '../../utils/EventProvider';
import { useBagStore } from '../../zustand/useBagStore/useBagStore';
import { usePrimeStore } from '../../zustand/usePrimeStore/usePrimeStore';
import { getURLParameter, prepareEventDataPurchaseCompleted, triggerEventAfterPurchaseCompleted } from './eventHelper';
import LoadingCheckout from '../../components/LoadingCheckout/LoadingCheckout';
import { ModalClientIsPrime } from '../../components/ModalClientIsPrime/ModalClientIsPrime';
import { useAuthStore } from '../../zustand/useAuth/useAuthStore';
import type { Items } from '../../utils/EventProvider/Event';
import { removeSkuColorProductName } from '../../utils/products/removeSkuColorProductName';
import UxCam from '../../utils/UxCam';
import { mergeItemsPackage } from '../../utils/mergeItemsPackage';

/**
 "Be very careful with the implementation as
 it involves webview, and if you don't know what you're doing,
 be wary of multiple events being triggered by re-rendering.
 The idea is to handle this flow natively."

 "To add a new event after a successful purchase,
 use the method triggerEventAfterPurchaseCompleted."

 "We guarantee 100% test coverage for this.
 It's not acceptable less than 100%,
 and please don't skip tests.
 Remember, this is crucial for business-level!"
 */
function WebviewCheckout() {
  const navigation = useNavigation();
  const route = useRoute();
  const { actions } = useBagStore(['actions']);
  const webviewRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);
  const [navState, setNavState] = useState('');
  const { orderFormId, packageItems } = useBagStore(['orderFormId', 'packageItems']);
  const purchaseItems = useMemo(() => mergeItemsPackage(packageItems), [packageItems]);
  const { profile } = useAuthStore(['profile']);

  const { changeStateIsVisibleModalPrimeRemoved, isVisibleModalPrimeRemoved } = usePrimeStore([
    'changeStateIsVisibleModalPrimeRemoved',
    'isVisibleModalPrimeRemoved',
  ]);

  const pressAfterPurchaseCompleted = useCallback(async () => {
    setLoading(true);
    const cookie = await getAsyncStorageItem('Auth:Cookie');
    try {
      await actions.CREATE_NEW_ORDER_FORM();
      await axios.get(`${Config.URL_VTEX_QA}/api/checkout/pub/orderForm?forceNewCart=true&sc=4`, { headers: { ...(cookie ? { cookie } : {}) } });
    } catch (e) {
      ExceptionProvider.captureException(e);
    } finally {
      setLoading(false);
      navigation.navigate('Home');
    }
  }, [actions, navigation]);

  const onNavigationStateChangeCapture = (event: WebViewNavigation) => {
    setNavState(event.url);
  };

  const isComeFromHome = useMemo(() => (route?.params?.comeFrom === 'Home'), [route.params]);

  const isOrderPlaced = useMemo(() => (
    navState.includes('/checkout/orderPlaced')
  ), [navState]);

  const goBackToBagScreen = useCallback(() => {
    if (purchaseCompleted) {
      pressAfterPurchaseCompleted();
      return;
    }

    navigation.navigate('BagScreen', { needRefreshing: true });
  }, [navigation, pressAfterPurchaseCompleted, purchaseCompleted]);

  const goBackToHomeScreen = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  const handleProductNameToEvent = (items: Items[]): Items[] => items.map((item) => ({
    ...item,
    item_name: removeSkuColorProductName(String(item.item_name), String(item.item_variant)),
  }));

  const doEventPurchaseCompleted = useCallback(async () => {
    try {
      const itemsSkus = purchaseItems.map((item) => item.ean).filter((ean) => ean) as string[]
      || [];
      const orderGroupId = getURLParameter(navState, 'og');
      const { data: dataOrderGroup } = await GetPurchaseData(orderGroupId) || {};
      const dataPurchaseCompleted = prepareEventDataPurchaseCompleted(dataOrderGroup, orderFormId);
      await AsyncStorage.setItem('User:LastOrderId', dataPurchaseCompleted?.resLastOrderId);
      dataPurchaseCompleted.adaptItems = handleProductNameToEvent(dataPurchaseCompleted.adaptItems);
      await triggerEventAfterPurchaseCompleted(dataPurchaseCompleted, profile?.email || '', itemsSkus);
    } catch (e) {
      ExceptionProvider.captureException(e);
    } finally {
      setPurchaseCompleted(true);
    }
  }, [navState, orderFormId]);

  const onMessage = async (event: WebViewMessageEvent) => {
    let newData = null;
    const { data } = event.nativeEvent;

    newData = JSON.parse(data);

    switch (newData.type) {
      case 'add_shipping_info': {
        const {
          coupon, currency, items, item_brand: itemBrand,
        } = newData?.rawMessage?.data || [];

        EventProvider.logEvent('add_shipping_info', {
          item_brand: itemBrand,
          items: handleProductNameToEvent(items),
          coupon,
          currency,
        });
        return null;
      }

      case 'page_view': {
        const { item_brand: itemBrand } = newData?.rawMessage?.data || [];
        EventProvider.logEvent('page_view', { item_brand: itemBrand });
        return null;
      }

      default:
        return null;
    }
  };

  useEffect(() => {
    EventProvider.logEvent('payment_step', {});
    UxCam.tagScreen('Webview Checkout');
  }, []);

  useEffect(() => {
    if (isOrderPlaced && !purchaseCompleted) {
      doEventPurchaseCompleted();
    }
  }, [doEventPurchaseCompleted, isOrderPlaced, loading, purchaseCompleted]);

  const injectedJavaScript = `
    window.metadata = { appVersion: "${deviceInfo.getVersion()}", platformType: "${Platform.OS}" }
  `;

  return (
    <>
      <View>
        <TopBarBackButton
          showShadow
          backButtonPress={!loading && !isComeFromHome ? goBackToBagScreen : goBackToHomeScreen}
          loading={loading}
        />
      </View>
      <WebView
        ref={webviewRef}
        renderLoading={() => <LoadingCheckout />}
        startInLoadingState
        cacheMode="LOAD_NO_CACHE"
        cacheEnabled={false}
        injectedJavaScriptBeforeContentLoaded={injectedJavaScript}
        originWhitelist={['*']}
        testID="com.usereserva:id/web_view_checkout"
        source={{
          uri: route?.params?.url,
        }}
        javaScriptCanOpenWindowsAutomatically
        onMessage={onMessage}
        geolocationEnabled
        domStorageEnabled
        onNavigationStateChange={onNavigationStateChangeCapture}
      />

      {purchaseCompleted && (
        <Button
          onPress={pressAfterPurchaseCompleted}
          title="VOLTAR PARA HOME"
          variant="primarioEstreito"
          disabled={loading}
          inline
          testID="com.usereserva:id/checkout_button_back_to_home"
        />
      )}

      <ModalClientIsPrime
        isVisible={isVisibleModalPrimeRemoved}
        onBackdropPress={() => {
          changeStateIsVisibleModalPrimeRemoved(false);
        }}
      />
    </>
  );
}

export default WebviewCheckout;
