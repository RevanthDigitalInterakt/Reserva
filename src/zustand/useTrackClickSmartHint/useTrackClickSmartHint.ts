import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 } from 'uuid';
import {
  TrackProvidersEnum,
  TrackPageTypeEnum, TrackClickDocument,
  type TrackClickMutationVariables,
  type TrackClickMutation,
} from '../../base/graphql/generated';
import { getApolloClient } from '../../utils/getApolloClient';

interface ITrackClickSmartHintStore {
  onSendTrackClick: (
    productId: string,
    screen: TrackPageTypeEnum,
    searchTerm?: string
  ) => Promise<void>;
  sessionId: string;
}

export const trackClickSmartHintStore = create<ITrackClickSmartHintStore>((_, getState) => ({
  sessionId: v4(),
  onSendTrackClick: async (productId, screen, searchTerm) => {
    const variables: TrackClickMutationVariables = {
      input: {
        providers: [TrackProvidersEnum.Smarthint],
        userEmail: await AsyncStorage.getItem('@Dito:anonymousID'),
        originIdentifier: screen,
        pageIdentifier: screen,
        pageType: screen,
        session: getState().sessionId,
        userIdentifier: '',
        locationRecs: 1,
        position: 1,
        productId,
        clickFeature: 'Vitrine',
        term: searchTerm || '',
      },
    };

    getApolloClient().mutate<TrackClickMutation, TrackClickMutationVariables>({
      mutation: TrackClickDocument,
      context: { clientName: 'gateway' },
      variables,
    });
  },
}));
