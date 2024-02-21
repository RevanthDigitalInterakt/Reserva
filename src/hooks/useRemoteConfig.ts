import { create } from 'zustand';
import type { FirebaseRemoteConfigTypes } from '@react-native-firebase/remote-config';
import { ExceptionProvider } from '../base/providers/ExceptionProvider';

interface IUseRemoteConfigStore {
  initialized: boolean;
  fetchInitialData: (instance: FirebaseRemoteConfigTypes.Module) => void;
  instance?: FirebaseRemoteConfigTypes.Module;
  getBoolean: (k: TRemoteConfigBooleanKeys) => boolean;
  getString: (k: TRemoteConfigStringKeys) => string;
  getObject: (k: TRemoteConfigStringArrayKeys) => string[];
}

export type TTypesInstallments = 'hide_installments' | 'show_prime_installments' | 'show_prime_equal_to_regular';

export interface IRemoteConfigKeys {
  pdp_show_video: boolean;
  pdp_show_video_tester: boolean;
  show_roulet: boolean;
  show_new_bag: boolean;
  show_new_bag_tester: boolean;
  show_pdc_thumb_color: boolean;
  primelp_terms_search: string;
  pdp_button_add_bag: string;
  sale_off_tag: boolean;
  cashback_in_store: boolean;
  balance_cashback_in_app: boolean;
  show_prime: boolean;
  show_prime_tester: boolean;
  show_new_header: boolean;
  show_new_header_tester: boolean;
  EMAIL_TESTERS: string[];
  appName: string;
  appVersion: string;
  show_price_prime_pdp: boolean;
  show_price_prime_pdc: boolean;
  regionalization: boolean;
  installments_prime: TTypesInstallments;
  show_new_address: boolean;
  show_new_address_tester: boolean;
  show_new_address_list: boolean;
  show_new_address_list_tester: boolean;
  show_new_login: boolean,
  show_new_login_tester: boolean,
  show_new_home: boolean;
  show_on_smart_hint: boolean;
  show_item_price: boolean;
  show_item_price_tester: boolean;
  show_add_zip_code_delivery: boolean;
  show_add_zip_code_delivery_tester: boolean;
  pdp_show_gift_card: boolean;
  show_user_feedback_form: string;
  show_home_commercial_banner: boolean;
  show_kitlook: boolean;
  add_to_bag_button_is_fixed: boolean
}

type KeysMatching<T extends object, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never
}[keyof T];

type TRemoteConfigBooleanKeys = KeysMatching<IRemoteConfigKeys, boolean>;
type TRemoteConfigStringKeys = KeysMatching<IRemoteConfigKeys, string>;
type TRemoteConfigStringArrayKeys = KeysMatching<IRemoteConfigKeys, string[]>;

export const defaults: IRemoteConfigKeys = {
  show_new_bag: false,
  pdp_show_gift_card: false,
  show_new_bag_tester: true,
  pdp_button_add_bag: '#11AB6B',
  show_roulet: false,
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
  show_new_header: false,
  show_new_header_tester: true,
  show_price_prime_pdp: false,
  show_price_prime_pdc: false,
  pdp_show_video: false,
  pdp_show_video_tester: false,
  regionalization: false,
  installments_prime: 'show_prime_installments',
  show_new_address: false,
  show_new_address_tester: true,
  show_new_address_list: false,
  show_new_address_list_tester: true,
  show_new_login: false,
  show_new_login_tester: true,
  show_new_home: false,
  show_on_smart_hint: false,
  show_item_price: false,
  show_item_price_tester: true,
  show_add_zip_code_delivery: false,
  show_add_zip_code_delivery_tester: true,
  show_user_feedback_form: 'none',
  show_home_commercial_banner: false,
  show_kitlook: false,
  add_to_bag_button_is_fixed: false,
};

const FIVE_MINUTES_IN_MS = 300000;
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
        minimumFetchIntervalMillis: FIVE_MINUTES_IN_MS,
        fetchTimeMillis: FIVE_SECONDS_IN_MS,
      });

      await remoteConfig.fetchAndActivate();

      return set({ initialized: true, instance: remoteConfig });
    } catch (err) {
      ExceptionProvider.captureException(err, { message: 'Error useRemoteConfig()' });

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
