import AsyncStorage from '@react-native-async-storage/async-storage';
import EventProvider from './EventProvider';
import { getAsyncStorageItem } from '../hooks/useAsyncStorageProvider';

import { ExceptionProvider } from '../base/providers/ExceptionProvider';
import type { OrderFormQuery, OrderformPackageItemsOutput } from '../base/graphql/generated';
import { getBrands } from './getBrands';

interface ITrackEventStatusCart {
  items?: OrderformPackageItemsOutput['items']
  appTotalizers?: OrderFormQuery['orderForm']['appTotalizers'];
  clientProfileData?: OrderFormQuery['orderForm']['clientProfileData'];
}

export const trackEventDitoStatusCart = async ({
  items,
  appTotalizers,
  clientProfileData,
}: ITrackEventStatusCart) => {
  try {
    const id = clientProfileData?.email
      ? await getAsyncStorageItem('@Dito:userRef')
      : await AsyncStorage.getItem('@Dito:anonymousID');

    const productId = items?.map((item) => item?.productId || '').join(',');

    const productName = items?.map((item) => item?.name || '').join(',');

    const categoriesName = items?.map((item) => item.productCategories || '').join(',');

    const payloadEvent = {
      id,
      action: 'status-carrinho',
      data: {
        origem: 'app',
        subtotal: appTotalizers?.total || 0,
        status: 'sim',
        id_produto: productId,
        nome_categoria: categoriesName,
        nome_produto: productName,
        marca: getBrands(items),
      },
    };

    const payloadEventEmpty = {
      id,
      action: 'status-carrinho',
      data: {
        origem: 'app',
        subtotal: appTotalizers?.total || 0,
        status: 'não',
      },
    };

    if (items) {
      EventProvider.sendTrackEvent('status-carrinho', items?.length > 0 ? payloadEvent : payloadEventEmpty);
    }
  } catch (e) {
    ExceptionProvider.captureException(e, "trackEventDitoStatusCart - trackEventDitoStatusCart.ts");
  }
};
