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
import { mergeItemsPackage } from '../../utils/mergeItemsPackage';
import ReactMoE, { MoEProperties } from 'react-native-moengage';
import { toProperCase } from '../../utils/properCase';
import { IResOrderGroup } from './IResOrderGroup'


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
      ExceptionProvider.captureException(e, "pressAfterPurchaseCompleted - WebviewCheckout");
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
      //const { data: dataOrderGroup } = await GetPurchaseData(orderGroupId) || {};
      const { data: dataOrderGroup } =
        ((await GetPurchaseData(orderGroupId)) as { data: IResOrderGroup[] }) || {};
      console.debug('dataOrderGroup:', JSON.stringify(dataOrderGroup, null, 2));
      const dataPurchaseCompleted = prepareEventDataPurchaseCompleted(dataOrderGroup, orderFormId);
      console.debug('dataPurchaseCompleted:', JSON.stringify(dataPurchaseCompleted));
      await AsyncStorage.setItem('User:LastOrderId', dataPurchaseCompleted?.resLastOrderId);
      dataPurchaseCompleted.adaptItems = handleProductNameToEvent(dataPurchaseCompleted.adaptItems);
      dataPurchaseCompleted.moeAdaptItems = handleProductNameToEvent(dataPurchaseCompleted.moeAdaptItems);

      console.debug("moengage data adapt items", dataPurchaseCompleted.moeAdaptItems);

      const transactionProducts = (dataPurchaseCompleted?.moeAdaptItems || []).map((item: any) => {
        const rawCategoryTree: string[] = item?.category || [];

        const productCategory = rawCategoryTree.map((name, index) => ({
          id: (index + 1).toString(),
          name: name,
        }));

        return {
          name: item.item_name,
          productId: item.productId,
          skuId: item.skuId,
          ean: item.ean,
          quantity: item.quantity,
          productprice: item.price,
          sellingprice: item.sellingPrice,
          discount: item.price - item.sellingPrice,
          productcategory: productCategory, 
          productColor: toProperCase(item.productColor),
          productSize: item.productSize?.toUpperCase(),
          productbrand: item.brand,
        };
      });




      //order placed


      const timestamp: number | undefined = dataPurchaseCompleted?.timestamp;


      let formattedDate = '';

      if (typeof timestamp === 'number') {
        const d = new Date(0);
        d.setUTCSeconds(timestamp);

        // Extract parts
        const day = String(d.getUTCDate()).padStart(2, '0');
        const month = String(d.getUTCMonth() + 1).padStart(2, '0');
        const year = d.getUTCFullYear();

        const hours = String(d.getUTCHours()).padStart(2, '0');
        const minutes = String(d.getUTCMinutes()).padStart(2, '0');
        const seconds = String(d.getUTCSeconds()).padStart(2, '0');
        const milliseconds = String(d.getUTCMilliseconds()).padStart(3, '0');

        formattedDate = `${day}-${month}-${year}T${hours}:${minutes}:${seconds}.${milliseconds}`;

        console.debug("converted date", formattedDate);
      }


      const moeProps = new MoEProperties();

      moeProps.addAttribute("transactionDiscounts", dataPurchaseCompleted.discount || 0);
      moeProps.addAttribute("visitorAddressCountry", dataPurchaseCompleted.shippingdata?.[0]?.country || '');
      moeProps.addAttribute("visitorAddressPostalCode", dataPurchaseCompleted.shippingdata?.[0]?.postalCode || '');
      moeProps.addAttribute("transactionProducts", transactionProducts || []);
      moeProps.addAttribute("visitorAddressCity", dataPurchaseCompleted.shippingdata?.[0]?.city || '');
      moeProps.addAttribute("transactionAffiliation", dataPurchaseCompleted.Sellers.name);
      moeProps.addAttribute("visitorAdressState", dataPurchaseCompleted.shippingdata?.[0]?.state);
      moeProps.addAttribute("transactionSubtotal", dataPurchaseCompleted?.itemSubtotal);
      moeProps.addAttribute("transactionLatestShippingEstimate", dataPurchaseCompleted.itemShippingTotal);
      moeProps.addAttribute("transactionDate", formattedDate);
      moeProps.addAttribute("transactionId", dataPurchaseCompleted?.orderId);
      moeProps.addAttribute("transactionShipping", dataPurchaseCompleted.shippingValue || 0);
      moeProps.addAttribute("visitorAddressNeighborhood", dataPurchaseCompleted.shippingdata?.[0]?.neighborhood);
      moeProps.addAttribute("visitorAddressStreet", dataPurchaseCompleted.shippingdata?.[0].street);
      moeProps.addAttribute("transactionTotal", dataPurchaseCompleted?.orderValue);
      moeProps.addAttribute("quantity", dataPurchaseCompleted?.totalQuantity);
      moeProps.addAttribute("payment method", dataPurchaseCompleted.paymentSystemName);
      moeProps.addAttribute("cupom", dataPurchaseCompleted.cupom);
      moeProps.addAttribute("cupomVendedor", dataPurchaseCompleted.cupomVendedor);



      ReactMoE.trackEvent("orderPlaced", moeProps);





      //product purchased event



      dataPurchaseCompleted?.adaptItems?.forEach((item) => {
        const itemProps = new MoEProperties();
        const discount = item.price - item.sellingPrice;


        const rawCategoryTree: string[] = item?.category || [];

        const productCategory = rawCategoryTree.map((name, index) => ({
          id: (index + 1).toString(),
          name: name,
        }));

        console.debug("product category", productCategory);

        itemProps.addAttribute("referenceId", item.referenceId || '');
        itemProps.addAttribute("sellingPrice", item.sellingPrice || 0);
        itemProps.addAttribute("ean", item.ean || '');
        itemProps.addAttribute("productSize", (item.productSize).toUpperCase() || '');
        itemProps.addAttribute("productColor", toProperCase(item.productColor) || '');
        itemProps.addAttribute("brand", item.brand || '');
        itemProps.addAttribute("skuId", item.skuId || '');
        itemProps.addAttribute("quantity", item.quantity || '');
        itemProps.addAttribute("productId", item.productId || '');
        itemProps.addAttribute("productRefId", item.productRefId || '');
        itemProps.addAttribute("name", item.item_name || '');
        itemProps.addAttribute("category", productCategory);
        itemProps.addAttribute("discount", discount || 0);
        itemProps.addAttribute("price", item.price || 0);
        itemProps.addAttribute("transactionId", dataPurchaseCompleted?.orderId || '');
        itemProps.addAttribute("transactionAffiliation", dataPurchaseCompleted.Sellers.name);
        itemProps.addAttribute("transactionDate", formattedDate);
        itemProps.addAttribute("cupom", dataPurchaseCompleted.cupom || '');
        itemProps.addAttribute("cupomVendedor", dataPurchaseCompleted.cupomVendedor || '');



        ReactMoE.trackEvent("productPurchased", itemProps);
      });

      await triggerEventAfterPurchaseCompleted(dataPurchaseCompleted, profile?.email || '', itemsSkus);




    } catch (e) {
      ExceptionProvider.captureException(
        e,
        "doEventPurchaseCompleted - WebviewCheckout",
        {
          orderFormId: (JSON.stringify(orderFormId) || ""),
          navState: (JSON.stringify(navState) || "")

        });
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