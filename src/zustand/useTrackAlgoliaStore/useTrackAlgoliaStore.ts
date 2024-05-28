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
        ...(queryID && { queryID: queryID }),
      },
    };

    try {
      await getApolloClient().mutate<TrackingMutation, TrackingMutationVariables>({
        mutation: TrackingDocument,
        context: { clientName: 'gateway' },
        variables,
      });
    } catch (error) {
      ExceptionProvider.captureException(error);
    }
  },
}));

export const useTrackClickAlgoliaStore = createZustandStoreWithSelectors(trackClickAlgoliaStore);
