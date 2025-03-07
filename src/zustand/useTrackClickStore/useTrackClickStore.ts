import { create } from 'zustand';
import { v4 } from 'uuid';
import {
  TrackProvidersEnum,
  TrackPageTypeEnum,
  type TrackClickV2Mutation,
  type TrackClickV2MutationVariables,
  TrackClickV2Document,
} from '../../base/graphql/generated';
import { getApolloClient } from '../../utils/getApolloClient';
import { trackPageViewStore } from '../useTrackPageViewStore/useTrackPageViewStore';

type TPageIdentifier = 'home' | 'bag' | 'checkout' | string;

export interface IData {
  identifier: string;
  productId: string;
}

interface ITrackClickSmartHintStore {
  onSendTrackClick: (
    data: IData,
    navigation: any,
  ) => Promise<void>;
  onTrackClick: (
    data: IData,
    identifier: TPageIdentifier,
    type: TrackPageTypeEnum) => void;
  sessionId: string;
}

export const trackClickStore = create<ITrackClickSmartHintStore>((_, getState) => ({
  sessionId: v4(),
  onSendTrackClick: async (data, navigation) => {
    const variables: TrackClickV2MutationVariables = {
      input: {
        providers: [TrackProvidersEnum.Smarthint],
        userEmail: '', // TODO impl backend get email from jwt token
        originIdentifier: navigation,
        pageIdentifier: data.identifier,
        pageType: navigation,
        session: getState().sessionId,
        locationRecs: 1,
        position: 1,
        productId: data.productId,
      },
    };

    await
    getApolloClient().mutate<TrackClickV2Mutation, TrackClickV2MutationVariables>({
      mutation: TrackClickV2Document,
      context: { clientName: 'gateway' },
      variables,
    });
  },
  onTrackClick: (data, identifier, type) => {
    const trackStore = trackPageViewStore.getState();

    const updatedNavigation = trackStore.onUpdateNavigation(identifier, type);

    if (updatedNavigation.length === 0) return;

    const lastNavigation = updatedNavigation[updatedNavigation.length - 1]!;
    const { onSendTrackClick } = getState();

    if (updatedNavigation.length > 1) {
      const previousNavigation = updatedNavigation[updatedNavigation.length - 2]!;
      onSendTrackClick(data, previousNavigation);
    }

    onSendTrackClick(data, lastNavigation);
  },
}));
