import { create } from 'zustand';
import { v4 } from 'uuid';
import { createZustandStoreWithSelectors } from '../../utils/createZustandStoreWithSelectors';
import { getApolloClient } from '../../utils/getApolloClient';
import { ExceptionProvider } from '../../base/providers/ExceptionProvider';
import {
  TrackOrderDocument, TrackProvidersEnum, type TrackOrderMutation, type TrackOrderMutationVariables,
} from '../../base/graphql/generated';

interface ITrackOrder {
  onTrack: (
    orderData: any,
    userMail: string,
  ) => Promise<void>;
  sessionId: string;
}

export const trackOrderStore = create<ITrackOrder>((_, getState) => ({
  sessionId: v4(),
  onTrack: async (orderData, userMail) => {
    const variables: TrackOrderMutationVariables = {
      input: {
        freight: orderData.paymentData[0].transactions[0].payments[0].installments,
        items: orderData.orderFormItems.map((item: any, index: number) => ({
          name: item?.name,
          productId: item?.productId,
          quantity: item?.quantity,
          sku: orderData.ids[index],
        })),
        orderId: orderData?.orderId,
        session: getState().sessionId,
        providers: [TrackProvidersEnum.Smarthint],
        total: orderData?.orderValue,
        userEmail: userMail,
      },
    };

    try {
      await
      getApolloClient().mutate<TrackOrderMutation, TrackOrderMutationVariables>({
        mutation: TrackOrderDocument,
        context: { clientName: 'gateway' },
        variables,
      }).catch((err) => ExceptionProvider.captureException(err, 'trackOrderStore -useTrackOrderStore.ts'));
    } catch (error) {
      ExceptionProvider.captureException(error, 'trackOrderStore - useTrackOrderStore.ts');
    }
  },
}));

export const useTrackOrderStore = createZustandStoreWithSelectors(trackOrderStore);
