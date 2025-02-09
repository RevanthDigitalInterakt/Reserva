import { create } from 'zustand';
import type { FirebaseRemoteConfigTypes } from '@react-native-firebase/remote-config';
import { ExceptionProvider } from '../base/providers/ExceptionProvider';

interface IUseRemoteConfigStore {
  initialized: boolean;
  fetchInitialData: (instance: FirebaseRemoteConfigTypes.Module) => void;
  instance?: FirebaseRemoteConfigTypes.Module;
  getBoolean: (k: TRemoteConfigBooleanKeys) => boolean;
  getString: (k: TRemoteConfigStringKeys) => string;
  getNumber: (k: TRemoteConfigNumbersKeys) => number;
  getObject: (k: TRemoteConfigStringArrayKeys) => string[];
}

export type TTypesInstallments = 'hide_installments' | 'show_prime_installments' | 'show_prime_equal_to_regular';

export interface IRemoteConfigKeys {
  call_center_number: number;
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
  show_new_login_layout: boolean,
  show_new_login_layout_tester: boolean,
  show_new_login_tester: boolean,
  show_new_home: boolean;
  show_on_smart_hint: boolean;
  show_item_price: boolean;
  show_item_price_tester: boolean;
  show_add_zip_code_delivery: boolean;
  show_add_zip_code_delivery_tester: boolean;
  should_redirect_to_checkout: boolean;
  pdp_show_gift_card: boolean;
  show_user_feedback_form: string;
  show_shelf: boolean;
  show_home_commercial_banner: boolean;
  show_onep5p_bag: boolean;
  show_onep5p_home: boolean;
  show_onep5p_menu: boolean;
  show_onep5p_pdp: boolean;
  show_kitlook: boolean;
  add_to_bag_button_is_fixed: boolean;
  count_down_position: string;
  creditCardPaymentDescription: string;
  giftCardPaymentDescription: string;
  nubankPaymentDescription: string;
  pixPaymentDescription: string;
  show_button_see_bag: boolean;
  show_abandoned_cart: boolean;
  show_prime_discount: boolean;
  show_return_policy: boolean;
  show_doris_button: boolean;
  show_webview_facavc: boolean;
  show_buttons_pdp_facavc: boolean;
  show_label_facavc: boolean;
  new_offers_page: boolean;
  new_offers_page_tester: boolean;
  show_pdc_kit_look: boolean;
  show_geolocation: boolean;
}

type KeysMatching<T extends object, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never
}[keyof T];

type TRemoteConfigBooleanKeys = KeysMatching<IRemoteConfigKeys, boolean>;
type TRemoteConfigStringKeys = KeysMatching<IRemoteConfigKeys, string>;
type TRemoteConfigNumbersKeys = KeysMatching<IRemoteConfigKeys, number>;
type TRemoteConfigStringArrayKeys = KeysMatching<IRemoteConfigKeys, string[]>;

export const defaults: IRemoteConfigKeys = {
  call_center_number: 552136092550,
  show_new_bag: false,
  pdp_show_gift_card: false,
  show_new_bag_tester: true,
  pdp_button_add_bag: '#11AB6B',
  show_roulet: false,
  sale_off_tag: false,
  show_pdc_thumb_color: false,
  cashback_in_store: false,
  balance_cashback_in_app: false,
  should_redirect_to_checkout: false,
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
  show_new_login_layout: false,
  show_new_login_layout_tester: false,
  show_new_login_tester: true,
  show_new_home: false,
  show_on_smart_hint: false,
  show_item_price: false,
  show_item_price_tester: true,
  show_add_zip_code_delivery: false,
  show_add_zip_code_delivery_tester: true,
  show_user_feedback_form: 'none',
  show_shelf: false,
  show_home_commercial_banner: false,
  show_onep5p_bag: false,
  show_onep5p_home: false,
  show_onep5p_menu: false,
  show_onep5p_pdp: false,
  show_kitlook: false,
  add_to_bag_button_is_fixed: false,
  count_down_position: 'A',
  creditCardPaymentDescription: '10x sem juros no cartão, comparcela mínima de R$ 60',
  giftCardPaymentDescription: 'Cartões de Presente Pré-pagos',
  nubankPaymentDescription: 'Em até 24x',
  pixPaymentDescription: 'Pague à vista ou até em 4x sem juros.',
  show_button_see_bag: false,
  show_abandoned_cart: false,
  show_prime_discount: false,
  show_return_policy: false,
  show_doris_button: false,
  show_webview_facavc: false,
  show_buttons_pdp_facavc: false,
  show_label_facavc: false,
  new_offers_page: false,
  new_offers_page_tester: false,
  show_pdc_kit_look: false,
  show_geolocation: false,
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
      ExceptionProvider.captureException(err, "fetchInitialData - useRemoteConfig.ts");

      return set({ initialized: true, instance: remoteConfig });
    }
  },
  getBoolean: <K extends TRemoteConfigBooleanKeys>(key: K) => (
    getState().instance?.getBoolean(key) || defaults[key]
  ),
  getString: <K extends TRemoteConfigStringKeys>(key: K) => (
    getState().instance?.getString(key) || defaults[key]
  ),
  getNumber: <K extends TRemoteConfigNumbersKeys>(key: K) => (
    getState().instance?.getNumber(key) as unknown as number || defaults[key] as unknown as number
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

export const syncRemoteConfig = async () => {
  if (!useRemoteConfig.getState().initialized) {
    await new Promise((res, _) => {
      useRemoteConfig.subscribe((cb) => res(cb.initialized));

      setTimeout(() => res(null), FIVE_MINUTES_IN_MS);
    });
  }
};
