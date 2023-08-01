import { create } from 'zustand';
import * as Sentry from '@sentry/react-native';
import type { FirebaseRemoteConfigTypes } from '@react-native-firebase/remote-config';

interface IUseRemoteConfigStore {
  initialized: boolean;
  fetchInitialData: (instance: FirebaseRemoteConfigTypes.Module) => void;
  instance?: FirebaseRemoteConfigTypes.Module;
  getBoolean: (k: TRemoteConfigBooleanKeys) => boolean;
  getString: (k: TRemoteConfigStringKeys) => string;
  getObject: (k: TRemoteConfigStringArrayKeys) => string[];
}

export interface IRemoteConfigKeys {
  pdp_show_video: boolean;
  pdp_show_video_tester: boolean;
  show_new_bag: boolean;
  show_new_bag_tester: boolean;
  show_new_search: boolean;
  show_new_search_tester: boolean;
  show_campaign_boyfriend: boolean;
  show_pdc_thumb_color: boolean;
  primelp_terms_search: string;
  pdp_button_add_bag: string;
  sale_off_tag: boolean;
  cashback_in_store: boolean;
  balance_cashback_in_app: boolean;
  show_prime: boolean;
  show_prime_tester: boolean;
  EMAIL_TESTERS: string[];
  appName: string;
  appVersion: string;
  show_price_prime_pdp: boolean;
  show_price_prime_pdc: boolean;
  regionalization: boolean;
}

type KeysMatching<T extends object, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never
}[keyof T];

type TRemoteConfigBooleanKeys = KeysMatching<IRemoteConfigKeys, boolean>;
type TRemoteConfigStringKeys = KeysMatching<IRemoteConfigKeys, string>;
type TRemoteConfigStringArrayKeys = KeysMatching<IRemoteConfigKeys, string[]>;

export const defaults: IRemoteConfigKeys = {
  show_new_bag: false,
  show_new_bag_tester: true,
  show_new_search: false,
  show_new_search_tester: false,
  show_campaign_boyfriend: false,
  pdp_button_add_bag: '#11AB6B',
  sale_off_tag: false,
  show_pdc_thumb_color: false,
  cashback_in_store: false,
  balance_cashback_in_app: false,
  EMAIL_TESTERS: [],
  appName: 'My App',
  appVersion: '1.0.0',
  primelp_terms_search: 'prime',
  show_prime: false,
  show_prime_tester: false,
  show_price_prime_pdp: false,
  show_price_prime_pdc: false,
  pdp_show_video: false,
  pdp_show_video_tester: false,
  regionalization: false,
};

const THREE_MINUTES_IN_MS = 180000;
const FIVE_SECONDS_IN_MS = 5000;

export const useRemoteConfig = create<IUseRemoteConfigStore>((set, getState) => ({
  initialized: false,
  instance: undefined,
  fetchInitialData: async (remoteConfig: FirebaseRemoteConfigTypes.Module) => {
    try {
      const state = getState();

      if (state.initialized) return set(state);

      await remoteConfig.setDefaults(defaults as unknown as Record<string, any>);

      await remoteConfig.setConfigSettings({
        minimumFetchIntervalMillis: THREE_MINUTES_IN_MS,
        fetchTimeMillis: FIVE_SECONDS_IN_MS,
      });

      await remoteConfig.fetchAndActivate();

      return set({ initialized: true, instance: remoteConfig });
    } catch (err) {
      Sentry.withScope((scope) => {
        scope.addBreadcrumb({ message: 'Error useRemoteConfig()' });
        Sentry.captureException(err);
      });

      return set({ initialized: true, instance: remoteConfig });
    }
  },
  getBoolean: <K extends TRemoteConfigBooleanKeys>(key: K) => (
    getState().instance?.getBoolean(key) || defaults[key]
  ),
  getString: <K extends TRemoteConfigStringKeys>(key: K) => (
    getState().instance?.getString(key) || defaults[key]
  ),
  getObject: <K extends TRemoteConfigStringArrayKeys>(key: K) => {
    try {
      const value = getState().instance?.getString(key) || defaults[key];

      return typeof value === 'string' ? JSON.parse(value) : value;
    } catch (err) {
      return defaults[key];
    }
  },
}));
