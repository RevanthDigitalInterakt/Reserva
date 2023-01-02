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
  items: Items[];
};

export namespace EventsOptions {
  export type Login = Pick<EventValues, 'custumer_email'>;
  export type Search = Pick<EventValues, 'search_ids' | 'search_string'>;
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
  export type ProductView = Pick<
  EventValues,
  | 'product_id'
  | 'product_name'
  | 'product_category'
  | 'product_price'
  | 'product_currency'
  >;
  export type AddToCart = Pick<
  EventValues,
  | 'item_id'
  | 'item_name'
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
  };
