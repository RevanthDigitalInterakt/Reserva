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
  | 'add_payment_info';

export type EventNameOptions = Record<EventName, string>;

export type EventValuesName =
  | 'item_id'
  | 'item_name'
  | 'item_price'
  | 'item_quantity'
  | 'item_category'
  | 'item_categories'
  | 'currency'
  | 'seller'
  | 'custumer_email'
  | 'content_ids'
  | 'content_type'
  | 'product_id'
  | 'product_name'
  | 'product_category'
  | 'product_price'
  | 'product_currency'
  | 'search_string'
  | 'search_ids'
  | 'price'
  | 'quantity'
  | 'product_currency'
  | 'registration_method'
  | 'search_term'
  | 'item_list_id'
  | 'item_list_name'
  | 'payment_type';

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
};

export const eventsValue: EventValueOptions = {
  item_id: 'af_content_id',
  item_name: 'af_content',
  item_price: 'af_price',
  item_quantity: 'af_quantity',
  quantity: 'af_quantity',
  item_category: 'af_content_type',
  currency: 'af_currency',
  seller: 'af_seller',
  registration_method: 'af_registration_method',
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
};

export const onlyGaEvents = [
  'view_item_list',
  'view_item',
  'select_item',
  'begin_checkout',
  'add_payment_info',
  'add_shipping_info',
  'view_search_results',
  'payment_step'
];
