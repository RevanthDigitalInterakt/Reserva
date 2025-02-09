import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 } from 'uuid';
import {
  TrackEventIndexEnum,
  TrackEventNameEnum,
  TrackEventSubTypeEnum,
  TrackEventTypeEnum, TrackingDocument, type TrackingMutation, type TrackingMutationVariables,
} from '../../base/graphql/generated';
import { createZustandStoreWithSelectors } from '../../utils/createZustandStoreWithSelectors';
import { getApolloClient } from '../../utils/getApolloClient';
import { ExceptionProvider } from '../../base/providers/ExceptionProvider';

interface IObjectData {
  discount: number;
  quantity: number;
  price: number;
}
interface ITrackAlgolInput {
  typeEvent: TrackEventTypeEnum,
  nameEvent: TrackEventNameEnum,
  sku?: string[] | null,
  subTypeEvent?: TrackEventSubTypeEnum,
  dataObject?: IObjectData[],
  totalPrice?: number,
  queryID?: string | null,
  positions?: number[],
  price?: number,
}

interface ITrackAlgoliaStore {
  onTrack: (input: ITrackAlgolInput) => Promise<void>;
  sessionId: string;
}

export const trackClickAlgoliaStore = create<ITrackAlgoliaStore>((_, getState) => ({
  sessionId: v4(),
  onTrack: async ({
    typeEvent,
    nameEvent,
    sku,
    subTypeEvent,
    dataObject,
    totalPrice,
    queryID,
    positions,
    price,
  }) => {
    const user = await AsyncStorage.getItem('@Dito:anonymousID');

    const variables: TrackingMutationVariables = {
      input: {
        authenticatedUserToken: user || '',
        userToken: getState().sessionId,
        index: TrackEventIndexEnum.Default,
        eventType: typeEvent,
        eventName: nameEvent,
        ...(subTypeEvent && { eventSubtype: subTypeEvent }),
        ...(dataObject && {
          currency: 'BRL',
          objectData: dataObject,
          value: totalPrice,
        }),
        ...(sku && { objectIDs: sku }),
        ...(positions && { positions }),
        ...(queryID && { queryID }),
        ...(price && { value: price }),
      },
    };

    try {
      await getApolloClient().mutate<TrackingMutation, TrackingMutationVariables>({
        mutation: TrackingDocument,
        context: { clientName: 'gateway' },
        variables,
      });
    } catch (error) {
      ExceptionProvider.captureException(
        error,
        "trackClickAlgoliaStore - useTrackAlgoliaStore.ts",
        {
          typeEvent: (JSON.stringify(typeEvent) || ""),
          nameEvent: (JSON.stringify(nameEvent) || ""),
          sku: (JSON.stringify(sku) || ""),
          subTypeEvent: (JSON.stringify(subTypeEvent) || ""),
          dataObject: (JSON.stringify(dataObject) || ""),
          totalPrice: (JSON.stringify(totalPrice) || ""),
          queryID: (JSON.stringify(queryID) || ""),
          positions: (JSON.stringify(positions) || ""),
          price: (JSON.stringify(price) || ""),
        }
      );
    }
  },
}));

export const useTrackClickAlgoliaStore = createZustandStoreWithSelectors(trackClickAlgoliaStore);
