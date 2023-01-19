import type { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react';
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

interface IWiduResponse {
  destinyLink: string;
}

async function getOrderFormIdByRon(ronCode: string): Promise<string> {
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

    EventProvider.logEvent('open_ron_url', { order_form_id: orderFormId });

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
  const { topBarLoading } = useCart();
  const ronCode = route?.params?.ronCode;

  useEffect(() => {
    if (ronCode) {
      getOrderFormIdByRon(ronCode).then((orderFormId) => {
        navigation.replace(
          'BagScreen',
          { isProfileComplete: false, orderFormId },
        );
      });
    }
  }, [ronCode]);

  return (
    <SafeAreaView style={{ justifyContent: 'space-between', flex: 1, backgroundColor: '#fff' }}>
      <TopBarBackButton showShadow loading={topBarLoading} />

      <LoadingScreen />
    </SafeAreaView>
  );
}
