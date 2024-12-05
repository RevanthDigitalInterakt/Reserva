import { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ExceptionProvider } from '../base/providers/ExceptionProvider';
import type { IVtexServiceRequestOrder } from '../services/vtexService';
import { useOrderListStore } from '../zustand/useOrderListStore/useOrderListStore';

interface IVerifyOrderLastPurchase {
  ordersList: IVtexServiceRequestOrder[];
}

export function useOrder() {
  const [useOrderLoading, setUseOrderLoading] = useState<boolean>(false);
  const { getOrderList } = useOrderListStore([
    'getOrderList',
  ]);

  const verifyOrderLastPurchase = useCallback(
    async ({ ordersList }: IVerifyOrderLastPurchase) => {
      setUseOrderLoading(true);
      try {
        const lastOrderId = await getOrderList();

        if (!ordersList || lastOrderId === null) {
          setUseOrderLoading(false);
          return false;
        }

        const ordersIdsMap = ordersList.map((item) => item.orderId);

        const orderIdExistsOnList = ordersIdsMap.includes(lastOrderId);

        if (orderIdExistsOnList) {
          await AsyncStorage.removeItem('User:LastOrderId');
          setUseOrderLoading(false);
          return false;
        }

        return true;
      } catch (err) {
        ExceptionProvider.captureException(err);
        return false;
      } finally {
        setUseOrderLoading(false);
      }
    },
    [],
  );

  return {
    verifyOrderLastPurchase,
    useOrderLoading,
  };
}
