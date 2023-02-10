import type { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import { URL } from 'react-native-url-polyfill';
import { SafeAreaView } from 'react-native';
import axios from 'axios';
import * as Sentry from '@sentry/react-native';
import Config from 'react-native-config';
import { useCart } from '../../context/CartContext';
import type { RootStackParamList } from '../../routes/StackNavigator';
import { TopBarBackButton } from '../../modules/Menu/components/TopBarBackButton';
import { LoadingScreen } from '../../common/components/LoadingScreen';
import EventProvider from '../../utils/EventProvider';
import useAsyncStorageProvider from '../../hooks/useAsyncStorageProvider';
import { adaptOrderFormItemsTrack } from '../../utils/adaptOrderFormItemsTrack';

interface IWiduResponse {
  destinyLink: string;
}

export async function getOrderFormIdByRon(ronCode: string): Promise<string> {
  try {
    if (!ronCode) return '';

    const { request } = await axios.get(`https://usereserva.io/${ronCode}`);
    const { responseURL: redirectedUrl } = request;

    if (!request?.responseURL) {
      throw new Error('Invalid response URL');
    }

    const [, widuOrderId] = redirectedUrl.split('usereserva.io/');
    const { data } = await axios.get<IWiduResponse>(`https://widu-bot-api.usenow.com.br/link/${widuOrderId}`);
    const url = new URL(data.destinyLink);

    const orderFormId = url.searchParams.get('orderFormId')!;

    // Force update salesChannel from orderFormId
    await axios.get(`${Config.URL_BASE3}checkout/pub/orderForm/${orderFormId}?sc=4`);

    return orderFormId;
  } catch (err) {
    Sentry.withScope((scope) => {
      scope.setExtra('ron', ronCode);
      Sentry.captureException(err);
    });

    return '';
  }
}

export type IRonRedirectToBagProps = StackScreenProps<RootStackParamList, 'RonRedirectToBag'>;

export default function RonRedirectToBag({ route, navigation }: IRonRedirectToBagProps) {
  const { ronCode } = route?.params || {};

  const { topBarLoading, orderForm, restoreCart } = useCart();
  const { setItem } = useAsyncStorageProvider();

  const [cartRestored, setCartRestored] = useState(false);

  const navToBag = useCallback((orderFormId?: string) => {
    navigation.replace('BagScreen', { isProfileComplete: false, orderFormId });
  }, []);

  const saveOrderFormItems = useCallback(async () => {
    const productIds = new Set((orderForm?.items || []).map((item) => item.productId));

    await setItem('@RNOrder:RonItems', Array.from(productIds));
    await setItem('@RNSession:Ron', true);

    EventProvider.logEvent(
      'ron_open',
      {
        open: ronCode,
        items: adaptOrderFormItemsTrack(orderForm?.items),
      },
    );

    navigation.replace(
      'BagScreen',
      { isProfileComplete: false, orderFormId: orderForm?.orderFormId },
    );
  }, [orderForm, ronCode]);

  useEffect(() => {
    if (ronCode) {
      getOrderFormIdByRon(ronCode).then(async (orderFormId) => {
        await restoreCart(orderFormId);

        setCartRestored(true);
      });
    }
  }, [ronCode, navToBag]);

  useEffect(() => {
    if (cartRestored) {
      saveOrderFormItems();
    }
  }, [orderForm, cartRestored]);

  return (
    <SafeAreaView style={{ justifyContent: 'space-between', flex: 1, backgroundColor: '#fff' }}>
      <TopBarBackButton showShadow loading={topBarLoading} />

      <LoadingScreen />
    </SafeAreaView>
  );
}
