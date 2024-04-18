import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 } from 'uuid';
import {
  TrackEventIndexEnum,
  TrackEventNameEnum,
  TrackEventTypeEnum, TrackingDocument, type TrackingMutation, type TrackingMutationVariables,
} from '../../base/graphql/generated';
import { getApolloClient } from '../../utils/getApolloClient';

interface ITrackAlgoliaStore {
  onTrack: (
    sku: string,
    typeEvent: TrackEventTypeEnum,
    nameEvent: TrackEventNameEnum
  ) => Promise<void>;
  sessionId: string;
}

export const trackClickAlgoliaStore = create<ITrackAlgoliaStore>((_, getState) => ({
  sessionId: v4(),
  onTrack: async (sku, typeEvent, nameEvent) => {
    const user = await AsyncStorage.getItem('@Dito:anonymousID');

    const variables: TrackingMutationVariables = {
      input: {
        authenticatedUserToken: user || '',
        userToken: getState().sessionId,
        index: TrackEventIndexEnum.Default,
        eventType: typeEvent,
        eventName: nameEvent,
        objectIDs: [sku],
      },
    };

    console.log('variables', variables);

    try {
      const response = await getApolloClient().mutate<TrackingMutation, TrackingMutationVariables>({
        mutation: TrackingDocument,
        context: { clientName: 'gateway' },
        variables,
      });

      console.log('response', response);
    } catch (error) {
      console.log('error', error);
    }
  },
}));
