import React, {
  useCallback, useEffect, useState,
} from 'react';
import { Linking, Platform, View } from 'react-native';
import { WebView, WebViewMessageEvent, WebViewNavigation } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { TopBarBackButton } from '../../modules/Menu/components/TopBarBackButton';
import EventProvider from '../../utils/EventProvider';
import { useBagStore } from '../../zustand/useBagStore/useBagStore';
import { Button } from '../../components/Button';
import { useCart } from '../../context/CartContext';
import useAsyncStorageProvider, { getAsyncStorageItem } from '../../hooks/useAsyncStorageProvider';
import { ExceptionProvider } from '../../base/providers/ExceptionProvider';
import { urlRon } from '../../utils/LinkingUtils/static/deepLinkMethods';
import { defaultBrand } from '../../utils/defaultWBrand';

const WebviewCheckout = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { actions } = useBagStore(['actions']);
  const { setOrderFormLegacy } = useCart();
  const [loading, setLoading] = useState(false);
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);
  const { getItem } = useAsyncStorageProvider();

  const pressAfterPurchaseCompleted = useCallback(async () => {
    setLoading(true);
    setOrderFormLegacy('');
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
  }, [actions, navigation, setOrderFormLegacy]);

  const goBackToBagScreen = useCallback(() => {
    if (purchaseCompleted) {
      pressAfterPurchaseCompleted();
      return;
    }

    navigation.navigate('BagScreen', { needRefreshing: true });
  }, [navigation, pressAfterPurchaseCompleted, purchaseCompleted]);

  const onNavigationStateChange = (event: WebViewNavigation) => {
    if (event.url.includes('/checkout/orderPlaced')) {
      setPurchaseCompleted(true);
    }
  };

  const removeAbandonedCartTags = useCallback(() => {
    try {
      EventProvider.sendPushTags('sendAbandonedCartTags', {
        cart_update: '',
        product_name: '',
        product_image: '',
      });
    } catch (error) {
      ExceptionProvider.captureException(error);
    }
  }, []);

  const onMessage = async (event: WebViewMessageEvent) => {
    let newData = null;
    const { data } = event.nativeEvent;

    newData = JSON.parse(data);

    switch (newData.type) {
      case 'add_shipping_info': {
        const {
          coupon, currency, items, wbrand,
        } = newData?.rawMessage?.data;

        EventProvider.logEvent('add_shipping_info', {
          coupon, currency, items, wbrand,
        });
        return null;
      }

      case 'page_view': {
        const { wbrand } = newData?.rawMessage?.data;
        EventProvider.logEvent('page_view', { wbrand });
        return null;
      }

      case 'purchaseCompleted': {
        const dataPurchaseCompleted = newData.data;
        try {
          const userRefDito = await getItem('@Dito:userRef') || '';

          /* ---- Event add_payment_info ---- */
          EventProvider.logEvent('add_payment_info', {
            coupon: '',
            currency: 'BRL',
            value: dataPurchaseCompleted.orderValue,
            payment_type: dataPurchaseCompleted.paymentSystemName,
            items: dataPurchaseCompleted.adaptItems,
            wbrand: dataPurchaseCompleted.wbrand,
          });

          /* ---- Event fez-pedido-produto ---- */
          dataPurchaseCompleted.orderFormItems.forEach((item) => {
            EventProvider.sendTrackEvent(
              'fez-pedido-produto', {
                id: userRefDito,
                action: 'fez-pedido-produto',
                data: {
                  id: userRefDito,
                  id_transacao: dataPurchaseCompleted.orderId,
                  quantidade: item.quantity,
                  marca: dataPurchaseCompleted.wbrand,
                  id_produto: item.productId,
                  nome_produto: item.name,
                  categorias_produto: item.productCategories,
                  tamanho: item?.skuName?.split('-')?.[1]?.trim() || '',
                  cor: item?.skuName?.split('-')?.[0]?.trim() || '',
                  preco_produto: item?.priceDefinition?.calculatedSellingPrice / 100 ?? 0,
                  origem: 'app',
                },
              },
            );
          });

          /* ---- Event sendLastOrderData ---- */
          EventProvider.getPushTags((receivedTags) => {
            let newTotalOrdersValue = '0';
            if (receivedTags?.total_orders_value) {
              newTotalOrdersValue = parseFloat(receivedTags?.total_orders_value)?.toString();
            }

            EventProvider.sendPushTags('sendLastOrderData', {
              last_order_value: dataPurchaseCompleted.orderValue.toString(),
              total_orders_value: newTotalOrdersValue.toString(),
              last_purchase_date: dataPurchaseCompleted.timestamp.toString(),
            });
          });

          /* ---- Event Purchase ---- */
          EventProvider.OneSignal.sendOutcomeWithValue('Purchase', (dataPurchaseCompleted.orderValue).toFixed(2));

          /* ---- Event af_purchase ---- */
          EventProvider.appsFlyer.logEvent('af_purchase', {
            af_revenue: dataPurchaseCompleted.afRevenue,
            af_price: `${dataPurchaseCompleted.orderValue.toFixed(2)}`,
            af_content_id: dataPurchaseCompleted.ids,
            af_content_type: 'product',
            af_currency: 'BRL',
            af_quantity: dataPurchaseCompleted.itemQuantity,
            af_order_id: dataPurchaseCompleted.orderFormId,
            af_content: dataPurchaseCompleted.afContent,
            af_receipt_id: dataPurchaseCompleted.orderFormId,
          });

          /* ---- Event ron_purchase ---- */
          const [initialURL, isRon, ronItems] = await Promise.all([
            Linking.getInitialURL(),
            getItem('@RNSession:Ron'),
            getItem('@RNOrder:RonItems'),
          ]);

          const isRonSession = !!(urlRon(initialURL || '').match || isRon);

          if (ronItems?.length && isRonSession) {
            const hasAnyRonItem = ronItems.some(
              (id) => dataPurchaseCompleted.productIds.includes(id),
            );
            if (hasAnyRonItem) {
              EventProvider.logEvent(
                'ron_purchase',
                {
                  coupon: 'coupon',
                  currency: 'BRL',
                  items: dataPurchaseCompleted.adaptItems,
                  transaction_id: '',
                  value: dataPurchaseCompleted.orderValue,
                  wbrand: dataPurchaseCompleted.wbrand,
                },
              );
            }
          }

          /* ---- Event fez-pedido ---- */
          EventProvider.sendTrackEvent(
            'fez-pedido', {
              id: userRefDito,
              action: 'fez-pedido',
              data: {
                quantidade_produtos: dataPurchaseCompleted.totalQuantity,
                id_transacao: dataPurchaseCompleted?.orderId || '',
                metodo_pagamento: dataPurchaseCompleted.paymentSystemName,
                subtotal: dataPurchaseCompleted.itemSubtotal,
                total: dataPurchaseCompleted.itemTotal,
                total_frete: dataPurchaseCompleted.itemShippingTotal,
                origem: 'app',
                dispositivo: Platform.OS,
                id: userRefDito,
              },
            },
          );

          /* ---- Event logPurchase ---- */
          EventProvider.logPurchase({
            affiliation: 'APP',
            coupon: 'coupon',
            currency: 'BRL',
            items: dataPurchaseCompleted.adaptItems,
            shipping: dataPurchaseCompleted.itemShippingTotal,
            tax: dataPurchaseCompleted.rate,
            transaction_id: dataPurchaseCompleted.orderId,
            value: dataPurchaseCompleted.itemTotal,
          });

          /* ---- Event page_view ---- */
          EventProvider.logEvent('page_view', {
            wbrand: defaultBrand.picapau,
          });

          /* ---- Event add_payment_info_test ---- */
          EventProvider.logEvent('add_payment_info_test', {});

          /* ---- Event status-carrinho ---- */
          EventProvider.sendTrackEvent('status-carrinho', {
            id: userRefDito,
            action: 'status-carrinho',
            data: {
              origem: 'app',
              subtotal: 0,
              status: 'não',
            },
          });

          removeAbandonedCartTags();
        } catch (e) {
          ExceptionProvider.captureException(e);
        }
        return null;
      }

      default:
        return null;
    }
  };

  useEffect(() => {
    EventProvider.logEvent('payment_step', {});
  }, []);

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
        cacheEnabled={false}
        cacheMode="LOAD_NO_CACHE"
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
        onNavigationStateChange={onNavigationStateChange}
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
};

export default WebviewCheckout;
