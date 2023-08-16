import React, { useCallback, useEffect, useState } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';

import axios from 'axios';
import { URLSearchParams } from 'react-native-url-polyfill';
import { SafeAreaView } from 'react-native';
import Config from 'react-native-config';
import { useCart } from '../../context/CartContext';
import type { RootStackParamList } from '../../routes/StackNavigator';
import EventProvider from '../../utils/EventProvider';
import useAsyncStorageProvider from '../../hooks/useAsyncStorageProvider';
import { adaptOrderFormItemsTrack } from '../../utils/adaptOrderFormItemsTrack';
import { getBrands } from '../../utils/getBrands';
import { defaultBrand } from '../../utils/defaultWBrand';
import { RonRedirectTypeEnum, useRonRedirectLazyQuery } from '../../base/graphql/generated';
import { urlHandler } from '../../config/linking';
import { TopBarBackButton } from '../../modules/Menu/components/TopBarBackButton';
import { COLORS } from '../../base/styles/colors';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import { ExceptionProvider } from '../../base/providers/ExceptionProvider';

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
    ExceptionProvider.captureException(err, { ronCode });

    return '';
  }
}

export type IRonRedirectToBagProps = StackScreenProps<RootStackParamList, 'RonRedirectToBag'>;

export default function RonRedirectToBag({ route, navigation }: IRonRedirectToBagProps) {
  const { ronCode } = route?.params || {};
  const { topBarLoading, orderForm, restoreCart } = useCart();
  const { setItem } = useAsyncStorageProvider();
  const [getRonRedirect] = useRonRedirectLazyQuery({ context: { clientName: 'gateway' } });
  const [finished, setFinished] = useState(false);

  const saveOrderFormItems = useCallback(async (orderFormId: string) => {
    const productIds = new Set((orderForm?.items || []).map((item) => item.productId));

    await setItem('@RNOrder:RonItems', Array.from(productIds));
    await setItem('@RNSession:Ron', true);

    EventProvider.logEvent('page_view', {
      wbrand: defaultBrand.picapau,
    });
    EventProvider.logEvent(
      'ron_open',
      {
        open: ronCode,
        items: adaptOrderFormItemsTrack(orderForm?.items),
        wbrand: getBrands(orderForm?.items || []),
      },
    );

    navigation.replace(
      'BagScreen',
      { isProfileComplete: false, orderFormId },
    );
  }, [setItem, orderForm, ronCode]);

  const handleCustomRedirect = useCallback(async (url: string) => {
    const deepLinkUrl = await urlHandler(url);
    const searchParams = new URLSearchParams(deepLinkUrl.split('?')[1]);
    const dynamicParams: { [key: string]: string } = {};

    searchParams.forEach((value, key) => {
      dynamicParams[key] = value;
    });

    if (!dynamicParams) return;

    const shouldNavigateToProductDetail = dynamicParams?.skuId;

    if (shouldNavigateToProductDetail) {
      navigation.replace('AsyncDeepLink', {
        reducerKey: 'PRODUCT',
        ...dynamicParams,
      });
    }

    const shouldNavigateToCatalog = dynamicParams?.params;

    if (shouldNavigateToCatalog) {
      navigation.replace('AsyncDeepLink', {
        reducerKey: 'CATALOG',
        ...dynamicParams,
      });
    }
  }, [navigation]);

  const handleRedirect = useCallback(async (code: string) => {
    if (!code) return;

    const { data, error } = await getRonRedirect({ variables: { code: ronCode } });

    if (!data?.ronRedirect || error) {
      navigation.replace('Home');
      return;
    }

    const { orderFormId, url, type: redirectType } = data.ronRedirect;

    if (redirectType === RonRedirectTypeEnum.Orderform && orderFormId) {
      await restoreCart(orderFormId);
      await saveOrderFormItems(orderFormId);
      return;
    }

    if (redirectType === RonRedirectTypeEnum.Custom && url) {
      handleCustomRedirect(url);
    }
  }, [saveOrderFormItems, handleCustomRedirect, getRonRedirect, ronCode, restoreCart, navigation]);

  useEffect(() => {
    if (!finished && ronCode) {
      setFinished(true);
      handleRedirect(ronCode);
    }
  }, [ronCode, handleRedirect, finished]);

  return (
    <SafeAreaView style={{ justifyContent: 'space-between', flex: 1, backgroundColor: COLORS.WHITE }}>
      <TopBarBackButton showShadow loading={topBarLoading} />

      <LoadingScreen />
    </SafeAreaView>
  );
}
