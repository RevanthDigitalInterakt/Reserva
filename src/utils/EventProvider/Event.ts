type Items = {
  price: number;
  item_id: string;
  quantity: number;
  item_name: string;
  item_variant: string;
  item_category: string;
};

type EventValues = {
  item_id: string;
  item_name: string;
  item_price: any;
  item_quantity: number;
  item_category: string;
  item_categories: string;
  currency: string;
  seller: string;
  custumer_email: string;
  content_ids: string | string[];
  content_type: string | string[];
  product_id: string;
  product_name: string;
  product_category: string;
  product_price: any;
  product_currency: string;
  search_string: string;
  search_ids: any;
  price: number;
  quantity: number | number[];
  registration_method: string;
  affiliation: string;
  coupon: string;
  value: number;
  tax: number;
  shipping: number;
  transaction_id: '';
  order_form_id: string;
  items: Items[];
  search_term: string;
  item_list_id: string;
  item_list_name: string;
  payment_type: string;
  open: string;
};

export namespace EventsOptions {
  export type Login = Pick<EventValues, 'custumer_email'>;
  export type Search = Pick<EventValues, 'search_term'>;
  export type ViewSearchResults = Pick<EventValues, 'search_term'>;
  export type RemoveFromCart = Pick<EventValues, 'item_id' | 'item_categories'>;
  export type ProductListView = Pick<EventValues, 'content_type'>;
  export type CheckoutInitiated = Pick<
  EventValues,
  'price' | 'content_type' | 'content_ids' | 'currency' | 'quantity'
  >;
  export type CompleteRegistration = Pick<
  EventValues,
  'registration_method' | 'custumer_email'
  >;
  export type OpenRonUrl = Pick<
  EventValues,
  'order_form_id'
  >;
  export type ProductView = Pick<
  EventValues,
  | 'product_id'
  | 'product_category'
  | 'product_price'
  | 'product_currency'
  >;
  export type AddToCart = Pick<
  EventValues,
  | 'item_id'
  | 'item_price'
  | 'item_quantity'
  | 'item_category'
  | 'currency'
  | 'seller'
  >;
  export type Purchase = Pick<
  EventValues,
  | 'affiliation'
  | 'coupon'
  | 'currency'
  | 'items'
  | 'shipping'
  | 'tax'
  | 'transaction_id'
  | 'value'
  > & {};
  export type ViewItem = Pick<EventValues, 'currency' | 'items' | 'value'>;
  export type BeginCheckout = Pick<EventValues, 'items' | 'value' | 'coupon' | 'currency'>;
  export type AddShippingInfo = Pick<EventValues, 'currency' | 'items' | 'coupon'>;
  export type SelectItem = Pick<EventValues, 'item_list_id' | 'item_list_name'>;
  export type ViewItemList = Pick<EventValues, 'items'>;
  export type AddPaymentInfo = Pick<EventValues, 'coupon' | 'currency' | 'items' | 'payment_type' | 'value'>;
  export type RonOpen = Pick<
  EventValues,
  'items'
  | 'open'
  >;
  export type RonPurchase = Pick<
  EventValues,
  | 'coupon'
  | 'currency'
  | 'items'
  | 'transaction_id'
  | 'value'
  >;
}

export type EventOptionsFn =
  | {
    type: 'login';
    payload: EventsOptions.Login;
  }
  | {
    type: 'search';
    payload: EventsOptions.Search;
  }
  | {
    type: 'add_to_cart';
    payload: EventsOptions.AddToCart;
  }
  | {
    type: 'remove_from_cart';
    payload: EventsOptions.RemoveFromCart;
  }
  | {
    type: 'checkout_initiated';
    payload: EventsOptions.CheckoutInitiated;
  }
  | {
    type: 'product_list_view';
    payload: EventsOptions.ProductListView;
  }
  | {
    type: 'product_view';
    payload: EventsOptions.ProductView;
  }
  | {
    type: 'complete_registration';
    payload: EventsOptions.CompleteRegistration;
  }
  | {
    type: 'view_search_results';
    payload: EventsOptions.ViewSearchResults;
  }
  | {
    type: 'view_item';
    payload: EventsOptions.ViewItem;
  }
  | {
    type: 'begin_checkout';
    payload: EventsOptions.BeginCheckout;
  }
  | {
    type: 'add_shipping_info';
    payload: EventsOptions.AddShippingInfo;
  }
  | {
    type: 'select_item';
    payload: EventsOptions.SelectItem;
  }
  | {
    type: 'view_item_list';
    payload: EventsOptions.ViewItemList;
  }
  | {
    type: 'add_payment_info';
    payload: EventsOptions.AddPaymentInfo;
  }
  | {
    type: 'ron_open';
    payload: EventsOptions.RonOpen;
  }
  | {
    type: 'ron_purchase';
    payload: EventsOptions.RonPurchase;
  };
