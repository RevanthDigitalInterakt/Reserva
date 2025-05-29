import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createZustandStoreWithSelectors } from '../utils/createZustandStoreWithSelectors';

type TCacheKeys = 'appMenu'
| 'banner'
| 'brandsCarousel'
| 'checkSearchRedirect'
| 'config'
| 'countdownClock'
| 'facets'
| 'getWishlist'
| 'home'
| 'homeCarousels'
| 'homeMedias'
| 'homeCountdown'
| 'homeConfig'
| 'landingPagePrime'
| 'mktinStatus'
| 'primeFAQ'
| 'productDetail'
| 'productFeaturedData'
| 'productRecommendations'
| 'productSearch'
| 'profile'
| 'searchSuggestionsAndProductSearch'
| 'sellerInfo'
| 'updateInApp'
| 'mostSearchedWords'
| 'searchNews'
| 'search'
| 'searchFacets'
| 'InfoCashbackPdpCollection'
| 'searchAutocompleteSuggestions';

const ONE_MINUTE = 1000 * 60;
const TWO_MINUTES = ONE_MINUTE * 2;
const FIVE_MINUTES = ONE_MINUTE * 5;
const TEN_MINUTES = ONE_MINUTE * 10;
const SIX_HOURS = TEN_MINUTES * 36;
const ONE_DAY = SIX_HOURS * 4;

const DISABLED_CACHE_POLICY = false;

const expireTimes: { [key in TCacheKeys]: number } = {
  appMenu: TEN_MINUTES,
  banner: ONE_MINUTE,
  brandsCarousel: TWO_MINUTES,
  checkSearchRedirect: FIVE_MINUTES,
  config: TWO_MINUTES,
  countdownClock: TWO_MINUTES,
  getWishlist: ONE_MINUTE / 2,
  facets: ONE_MINUTE,
  home: TWO_MINUTES,
  homeCarousels: FIVE_MINUTES,
  homeMedias: FIVE_MINUTES,
  homeCountdown: ONE_MINUTE,
  homeConfig: FIVE_MINUTES,
  landingPagePrime: TEN_MINUTES,
  mktinStatus: TEN_MINUTES,
  primeFAQ: SIX_HOURS,
  productDetail: ONE_MINUTE,
  productFeaturedData: ONE_MINUTE,
  productRecommendations: TWO_MINUTES,
  productSearch: ONE_MINUTE,
  profile: FIVE_MINUTES,
  searchSuggestionsAndProductSearch: TWO_MINUTES,
  sellerInfo: TWO_MINUTES,
  updateInApp: TEN_MINUTES,
  mostSearchedWords: TEN_MINUTES,
  searchNews: TEN_MINUTES,
  search: TWO_MINUTES,
  searchFacets: TWO_MINUTES,
  searchAutocompleteSuggestions: ONE_DAY,
  InfoCashbackPdpCollection: ONE_DAY,
};

interface IApolloFetchPolicyStore {
  initialized: boolean;
  setInitialized: () => void;
  lastFetchedTimes: { [key in TCacheKeys]: number };
  getFetchPolicyPerKey: (key: TCacheKeys) => 'cache-first' | 'network-only';
  updateLastFetchedTime: (key: TCacheKeys) => void;
}

export const apolloFetchPolicyStore = create<IApolloFetchPolicyStore>()(
  persist(
    (set, getState) => ({
      initialized: false,
      setInitialized: () => set({ ...getState(), initialized: true }),
      lastFetchedTimes: {
        appMenu: 0,
        banner: 0,
        brandsCarousel: 0,
        checkSearchRedirect: 0,
        config: 0,
        countdownClock: 0,
        getWishlist: 0,
        facets: 0,
        home: 0,
        homeCarousels: 0,
        homeMedias: 0,
        homeCountdown: 0,
        homeConfig: 0,
        landingPagePrime: 0,
        mktinStatus: 0,
        primeFAQ: 0,
        productDetail: 0,
        productFeaturedData: 0,
        productRecommendations: 0,
        productSearch: 0,
        profile: 0,
        searchSuggestionsAndProductSearch: 0,
        sellerInfo: 0,
        updateInApp: 0,
        mostSearchedWords: 0,
        searchNews: 0,
        search: 0,
        searchFacets: 0,
        searchAutocompleteSuggestions: 0,
        InfoCashbackPdpCollection: 0,
      },
      getFetchPolicyPerKey: (key: TCacheKeys) => {
        if (DISABLED_CACHE_POLICY) return 'network-only';

        const lastFetchedTime = getState().lastFetchedTimes[key];

        if (!lastFetchedTime) {
          getState().updateLastFetchedTime(key);

          return 'network-only';
        }

        const expirationTime = expireTimes[key] || 0;
        const nextAllowedFetchTime = lastFetchedTime + expirationTime;

        if (nextAllowedFetchTime > new Date().getTime()) {
          return 'cache-first';
        }

        getState().updateLastFetchedTime(key);

        return 'network-only';
      },
      updateLastFetchedTime: (key: TCacheKeys) => {
        const state = getState();

        set({
          ...state,
          lastFetchedTimes: {
            ...state.lastFetchedTimes,
            [key]: new Date().getTime(),
          },
        });
      },
    }),
    {
      name: 'apollo-fetch-policy-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setInitialized();
      },
    },
  ),
);

export const useApolloFetchPolicyStore = createZustandStoreWithSelectors(apolloFetchPolicyStore);
