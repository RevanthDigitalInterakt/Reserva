export type Provider = 'appsflyer' | 'analytics';

export type EventName =
  | 'login'
  | 'search'
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'checkout_initiated'
  | 'product_list_view'
  | 'product_view'
  | 'complete_registration'
  | 'view_search_results'
  | 'view_item'
  | 'begin_checkout'
  | 'add_shipping_info'
  | 'select_item'
  | 'view_item_list'
  | 'add_payment_info'
  | 'mobile_jailbroken'
  | 'pdp_icon_fvc'
  | 'pdp_button_rainbow_fvc'
  | 'pdp_open_product_with_ref_fvc'
  | 'device_info_memory'
  | 'device_info_storage'
  | 'login_forgot_password_click'
  | 'login_click'
  | 'login_register_click'
  | 'signup_recover_password_click'
  | 'signup_register_email_click'
  | 'signup_create_password_click'
  | 'profile_edit_click'
  | 'profile_my_orders_click'
  | 'profile_favorites_click'
  | 'profile_my_account_click'
  | 'profile_my_cashback_click'
  | 'profile_my_credits_click'
  | 'profile_my_addresses_click'
  | 'profile_change_password_click'
  | 'profile_my_portfolio_click'
  | 'profile_logout_click'
  | 'mobile_jailbroken';

export type EventNameOptions = Record<EventName, string>;

export type EventValuesName =
  | 'item_id'
  | 'item_name'
  | 'item_price'
  | 'item_quantity'
  | 'item_category'
  | 'item_categories'
  | 'item_list_id'
  | 'item_list_name'
  | 'item_brand'
  | 'custumer_email'
  | 'content_ids'
  | 'content_type'
  | 'product_id'
  | 'product_name'
  | 'product_category'
  | 'product_price'
  | 'product_currency'
  | 'payment_type'
  | 'search_ids'
  | 'search_term'
  | 'search_string'
  | 'price'
  | 'quantity'
  | 'currency'
  | 'seller'
  | 'price'
  | 'quantity'
  | 'method'
  | 'product_currency'
  | 'method'
  | 'search_term'
  | 'item_list_id'
  | 'item_list_name'
  | 'payment_type'
  | 'model'
  | 'os'
  | 'freeMemory'
  | 'totalMemory'
  | 'usedMemory'
  | 'freeStorage'
  | 'totalStorage'
  | 'usedStorage'
  | 'platform'
  | 'model'
  | 'ip';

export type EventValueOptions = Record<EventValuesName, string>;

export const eventsName: EventNameOptions = {
  add_to_cart: 'af_add_to_cart',
  remove_from_cart: 'remove_from_cart',
  // Manter essse sem o `af_`, até segunda ordem
  complete_registration: 'af_complete_registration',
  checkout_initiated: 'af_initiated_checkout',
  login: 'af_login',
  product_list_view: 'af_list_view',
  product_view: 'af_content_view',
  search: 'af_search',
  view_search_results: 'view_search_results',
  view_item: 'view_item',
  begin_checkout: 'begin_checkout',
  add_shipping_info: 'add_shipping_info',
  select_item: 'select_item',
  view_item_list: 'view_item_list',
  add_payment_info: 'add_payment_info',
  device_info_memory: 'device_info_memory',
  device_info_storage: 'device_info_storage',
  login_forgot_password_click: 'login_forgot_password_click',
  login_click: 'login_click',
  login_register_click: 'login_register_click',
  signup_recover_password_click: 'signup_recover_password_click',
  signup_register_email_click: 'signup_register_email_click',
  signup_create_password_click: 'signup_create_password_click',
  profile_edit_click: 'profile_edit_click',
  profile_my_orders_click: 'profile_my_orders_click',
  profile_favorites_click: 'profile_favorites_click',
  profile_my_account_click: 'profile_my_account_click',
  profile_my_cashback_click: 'profile_my_cashback_click',
  profile_my_credits_click: 'profile_my_credits_click',
  profile_my_addresses_click: 'profile_my_addresses_click',
  profile_change_password_click: 'profile_change_password_click',
  profile_my_portfolio_click: 'profile_my_portfolio_click',
  profile_logout_click: 'profile_logout_click',
  mobile_jailbroken: 'mobile_jailbroken',
  pdp_icon_fvc: 'pdp_icon_fvc',
  pdp_button_rainbow_fvc: 'pdp_button_rainbow_fvc',
  pdp_open_product_with_ref_fvc: 'pdp_open_product_with_ref_fvc',
};

export const eventsValue: EventValueOptions = {
  item_id: 'af_content_id',
  item_name: 'af_content_name',
  item_price: 'af_price',
  item_quantity: 'af_quantity',
  quantity: 'af_quantity',
  item_category: 'af_content_type',
  currency: 'af_currency',
  seller: 'af_seller',
  method: 'af_registration_method',
  item_categories: 'af_content_type',
  custumer_email: 'af_registration_method_constumer',
  content_ids: 'af_content_id',
  content_type: 'af_content_type',
  product_id: 'af_content_id',
  product_name: 'af_content',
  product_category: 'af_content_type',
  product_price: 'af_price',
  price: 'af_price',
  product_currency: 'af_currency',
  search_ids: 'af_search_string',
  search_string: 'af_content_list',
  search_term: 'search_term',
  item_list_id: 'item_list_id',
  item_list_name: 'item_list_name',
  payment_type: 'payment_type',
  os: 'os',
  freeMemory: 'freeMemory',
  totalMemory: 'totalMemory',
  usedMemory: 'usedMemory',
  freeStorage: 'freeStorage',
  totalStorage: 'totalStorage',
  usedStorage: 'usedStorage',
  item_brand: 'af_brand',
  platform: 'af_platform',
  model: 'af_model',
  ip: 'af_ip',
};

export const onlyGaEvents = [
  'view_item_list',
  'view_item',
  'select_item',
  'begin_checkout',
  'add_payment_info',
  'add_shipping_info',
  'view_search_results',
  'payment_step',
  'add_payment_info_test',
  'page_load_time',
  'sign_up',
  'click_card_cashback',
  'device_info_memory',
  'device_info_storage',
  'login_forgot_password_click',
  'login_click',
  'login_register_click',
  'signup_register_email_click',
  'signup_recover_password_click',
  'signup_create_password_click',
  'profile_edit_click',
  'profile_my_orders_click',
  'profile_favorites_click',
  'profile_my_account_click',
  'profile_my_cashback_click',
  'profile_my_credits_click',
  'profile_my_addresses_click',
  'profile_change_password_click',
  'profile_my_portfolio_click',
  'profile_logout_click',
  'mobile_jailbroken',
  'pdp_icon_fvc',
  'pdp_button_rainbow_fvc',
  'pdp_open_product_with_ref_fvc',
];
