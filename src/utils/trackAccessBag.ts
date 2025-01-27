import AsyncStorage from '@react-native-async-storage/async-storage';
import EventProvider from './EventProvider';
import { getAsyncStorageItem } from '../hooks/useAsyncStorageProvider';
import type { IBagStore } from '../zustand/useBagStore/types/bagStore';
import { ExceptionProvider } from '../base/providers/ExceptionProvider';

export const trackAccessBag = async (
  quantity: number,
  price: number,
  brands: string,
  profile: IBagStore['clientProfileData'],
) => {
  try {
    const id = profile?.email
      ? await getAsyncStorageItem('@Dito:userRef')
      : await AsyncStorage.getItem('@Dito:anonymousID');

    if (!quantity) return;

    EventProvider.sendTrackEvent('acessou-carrinho', {
      id,
      action: 'acessou-carrinho',
      data: {
        quantidade: quantity,
        total: price,
        marca: brands,
        origem: 'app',
      },
    });
  } catch (e) {
    ExceptionProvider.captureException(e, "trackAccessBag - trackAccessBag.ts");
  }
};
