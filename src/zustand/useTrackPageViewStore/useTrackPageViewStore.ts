import { create } from 'zustand';
import { v4 } from 'uuid';
import {
  TrackPageTypeEnum,
  TrackPageViewDocument, type TrackPageViewInput,
  type TrackPageViewMutation,
  type TrackPageViewMutationVariables,
  TrackProvidersEnum,
} from '../../base/graphql/generated';
import { getApolloClient } from '../../utils/getApolloClient';
import { ExceptionProvider } from '../../base/providers/ExceptionProvider';

interface INavigationItem {
  identifier: string;
  date: Date;
  type: TrackPageTypeEnum;
  origin: string;
}

type TPageIdentifier = 'home' | 'bag' | 'checkout' | string;

interface ITrackPageViewStore {
  sessionId: string;
  navigation: INavigationItem[];
  onSendTrack: (navigation: INavigationItem, elapsedTime?: number) => Promise<void>;
  onUpdateNavigation: (identifier: string, type: TrackPageTypeEnum) => INavigationItem[];
  onTrackPageView: (pageIdentifier: TPageIdentifier, type: TrackPageTypeEnum) => Promise<void>;
}

const isDuplicateNavigation = (navigation: INavigationItem[], identifier: string) => (
  navigation[navigation.length - 1]?.identifier === identifier
);

const calculateElapsedTime = (item: INavigationItem, baseTime: Date) => (
  (baseTime.getTime() - item.date.getTime()) / 1000
);

const getLastIdentifier = (navigation: INavigationItem[]) => navigation[navigation.length - 1]?.identifier || '';

export const trackPageViewStore = create<ITrackPageViewStore>((set, getState) => ({
  sessionId: v4(),
  navigation: [],
  onSendTrack: async (navigation, elapsedTime) => {
    try {
      const input: TrackPageViewInput = {
        elapsedTime: parseInt(`${elapsedTime || 0}`, 10),
        pageIdentifier: navigation.identifier,
        pageType: navigation.type,
        providers: [TrackProvidersEnum.Smarthint],
        session: getState().sessionId,
        originIdentifier: navigation.origin,
        userEmail: '', // TODO impl backend collect email from jwt token
      };

      await getApolloClient().mutate<TrackPageViewMutation, TrackPageViewMutationVariables>({
        mutation: TrackPageViewDocument,
        context: { clientName: 'gateway' },
        variables: { input },
      });
    } catch (error) {
      ExceptionProvider.captureException(error, 'trackPageViewStore - useTrackPageViewStore.ts');
    }
  },
  onUpdateNavigation: (identifier, type) => {
    const date = new Date();
    const { navigation: navigationItems } = getState();

    if (isDuplicateNavigation(navigationItems, identifier)) return [];

    const updatedNavigation = [
      ...navigationItems,
      {
        identifier,
        date,
        type,
        origin: getLastIdentifier(navigationItems),
      },
    ];
    set(() => ({ navigation: updatedNavigation }));

    return updatedNavigation;
  },
  onTrackPageView: async (identifier, type) => {
    const updatedNavigation = getState().onUpdateNavigation(identifier, type);
    if (updatedNavigation.length === 0) return;

    const lastNavigation = updatedNavigation[updatedNavigation.length - 1]!;
    const { onSendTrack } = getState();

    if (updatedNavigation.length > 1) {
      const previousNavigation = updatedNavigation[updatedNavigation.length - 2]!;

      onSendTrack(
        previousNavigation,
        calculateElapsedTime(previousNavigation, lastNavigation.date),
      );
    }

    onSendTrack(lastNavigation);
  },
}));
