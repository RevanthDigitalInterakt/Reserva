import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createZustandStoreWithSelectors } from '../../utils/createZustandStoreWithSelectors';
import { ExceptionProvider } from '../../base/providers/ExceptionProvider';
import { getApolloClient } from '../../utils/getApolloClient';
import { OrderDocument, type OrderQuery, type OrderQueryVariables } from '../../base/graphql/generated';

type TOrder = {
  lastOrderId: string;
  lastOrder?: OrderQuery['order'];
};

const initialState: TOrder = {
  lastOrderId: '',
  lastOrder: undefined,
};

export interface IOrderList {
  lastOrderId: string;
  lastOrder?: OrderQuery['order'];
  getOrderList: () => Promise<string | null>;
}

const orderListStore = create<IOrderList>((set) => ({
  ...initialState,
  getOrderList: async () => {
    try {
      const orderIdStorage = await AsyncStorage.getItem('User:LastOrderId');

      if (!orderIdStorage) {
        return null;
      }

      const orderId = JSON.parse(orderIdStorage);

      const { data } = await getApolloClient().query<OrderQuery, OrderQueryVariables>({
        query: OrderDocument,
        fetchPolicy: 'no-cache',
        variables: { input: { orderId } },
        context: { clientName: 'gateway' },
      });

      if (!data?.order) {
        return null;
      }

      set(() => ({
        lastOrder: data.order,
        lastOrderId: orderId,
        loading: false,
      }));

      return orderId;
    } catch (err) {
      ExceptionProvider.captureException(err);
      return null;
    }
  },
}));

export const useOrderListStore = createZustandStoreWithSelectors(orderListStore);
