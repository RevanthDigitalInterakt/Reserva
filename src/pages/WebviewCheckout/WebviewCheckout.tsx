import React, {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { View, Platform } from 'react-native';
import { WebView, type WebViewMessageEvent, type WebViewNavigation } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import deviceInfo from 'react-native-device-info';
import { TopBarBackButton } from '../../modules/Menu/components/TopBarBackButton';
import EventProvider from '../../utils/EventProvider';
import { useBagStore } from '../../zustand/useBagStore/useBagStore';
import { Button } from '../../components/Button';
import { getAsyncStorageItem } from '../../hooks/useAsyncStorageProvider';
import { ExceptionProvider } from '../../base/providers/ExceptionProvider';
import { getURLParameter, prepareEventDataPurchaseCompleted, triggerEventAfterPurchaseCompleted } from './eventHelper';
import { GetPurchaseData } from '../../services/vtexService';
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
  const { orderFormId } = useBagStore(['orderFormId']);

  const pressAfterPurchaseCompleted = useCallback(async () => {
    setLoading(true);
    const cookie = await getAsyncStorageItem('Auth:Cookie');
    try {
      await actions.CREATE_NEW_ORDER_FORM();
      await axios.get('https://appqa.usereserva.com/api/checkout/pub/orderForm?forceNewCart=true&sc=4', { headers: { ...(cookie ? { cookie } : {}) } });
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

  const doEventPurchaseCompleted = useCallback(async () => {
    try {
      const orderGroupId = getURLParameter(navState, 'og');
      const { data: dataOrderGroup } = await GetPurchaseData(orderGroupId);
      const dataPurchaseCompleted = prepareEventDataPurchaseCompleted(dataOrderGroup, orderFormId);
      await triggerEventAfterPurchaseCompleted(dataPurchaseCompleted);
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
          coupon, currency, items, item_brand,
        } = newData?.rawMessage?.data;

        EventProvider.logEvent('add_shipping_info', {
          coupon, currency, items, item_brand,
        });
        return null;
      }

      case 'page_view': {
        const { item_brand } = newData?.rawMessage?.data;
        EventProvider.logEvent('page_view', { item_brand });
        return null;
      }

      default:
        return null;
    }
  };

  useEffect(() => {
    EventProvider.logEvent('payment_step', {});
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
          backButtonPress={!loading ? goBackToBagScreen : () => { }}
          loading={loading}
        />
      </View>

      <WebView
        ref={webviewRef}
        injectedJavaScriptBeforeContentLoaded={injectedJavaScript}
        startInLoadingState
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

    </>
  );
}

export default WebviewCheckout;
