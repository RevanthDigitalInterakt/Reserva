export type Items = {
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
  click_name: string;
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
  wbrand: string;
  email: string;
  appState: 'in' | 'out';
  index: number;
  open: number;
  show: number;
  success: number;
  favorite: number;
  position: 'top' | 'bottom';
};

export namespace EventsOptions {
  export type PageView = Pick<EventValues, 'wbrand'>;
  export type Login = Pick<EventValues, 'custumer_email'>;
  export type Search = Pick<EventValues, 'search_term'>;
  export type ClickHere = Pick<EventValues, 'click_name'>;
  export type ViewSearchResults = Pick<EventValues, 'search_term'>;
  export type RemoveFromCart = Pick<EventValues, 'item_id' | 'item_categories' | 'wbrand'>;
  export type ProductListView = Pick<EventValues, 'content_type' | 'wbrand'>;
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
  | 'wbrand'
  >;
  export type AddToCartPrime = Pick<
  EventValues,
  | 'item_id'
  | 'item_quantity'
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
  export type ViewItem = Pick<EventValues, 'currency' | 'items' | 'value' | 'wbrand'>;
  export type BeginCheckout = Pick<EventValues, 'items' | 'value' | 'coupon' | 'currency' | 'wbrand'>;
  export type AddShippingInfo = Pick<EventValues, 'currency' | 'items' | 'coupon' | 'wbrand'>;
  export type SelectItem = Pick<EventValues, 'item_list_id' | 'item_list_name' | 'wbrand'>;
  export type ViewItemList = Pick<EventValues, 'items' | 'wbrand'>;
  export type AddPaymentInfo = Pick<EventValues, 'coupon' | 'currency' | 'items' | 'payment_type' | 'value' | 'wbrand'>;
  export type RonOpen = Pick<
  EventValues,
  'items'
  | 'open'
  | 'wbrand'
  >;
  export type RonPurchase = Pick<
  EventValues,
  | 'coupon'
  | 'currency'
  | 'items'
  | 'transaction_id'
  | 'value'
  | 'wbrand'
  >;
  export type ClickAccessibilityApp = Pick<
  EventValues,
  | 'email'
  | 'appState'
  >;
  export type AppState = Pick<
  EventValues,
  | 'appState'
  >;
  export type ProductSlideImages = Pick<EventValues, | 'product_id' | 'index'>;
  export type ProductViewSizeGuide = Pick<EventValues, | 'product_id' | 'show'>;
  export type ProductZoom = Pick<EventValues, | 'product_id' | 'index'>;
  export type ProductWishlist = Pick<EventValues, | 'product_id' | 'favorite'>;
  export type ProductShare = Pick<EventValues, | 'product_id'>;
  export type ProductViewRecommended = Pick<EventValues, | 'show'>;
  export type ProductFindMyZipcode = Pick<EventValues, | 'product_id'>;
  export type ProductCheckDeliveryTime = Pick<EventValues, | 'product_id' | 'success'>;
  export type ProductSubscribeNewsletter = Pick<EventValues, | 'product_id' | 'success'>;
  export type ProductViewAbout = Pick<EventValues, | 'product_id' | 'show'>;
  export type PressAddToCartPrimeLP = Pick<EventValues, | 'position'>;
  export type ViewCart = Pick<EventValues, | 'currency' | 'items' | 'value'>;
  export type PressHeaderSearch = Pick<EventValues, 'open'>;
}

export type EventOptionsFn =
  | {
    type: 'login';
    payload: EventsOptions.Login;
  }
  | {
    type: 'click_here';
    payload: EventsOptions.ClickHere;
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
    type: 'add_to_cart_prime',
    payload: EventsOptions.AddToCartPrime;
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
    type: 'payment_step';
    payload: {};
  }
  | {
    type: 'add_payment_info_test';
    payload: {};
  }
  | {
    type: 'ron_open';
    payload: EventsOptions.RonOpen;
  }
  | {
    type: 'ron_purchase';
    payload: EventsOptions.RonPurchase;
  }
  | {
    type: 'click_accessibility_app';
    payload: EventsOptions.ClickAccessibilityApp;
  }
  | {
    type: 'app_state';
    payload: EventsOptions.AppState;
  }
  | {
    type: 'page_view';
    payload: EventsOptions.PageView;
  }
  | {
    type: 'product_view_size_guide';
    payload: EventsOptions.ProductViewSizeGuide;
  }
  | {
    type: 'product_slide_images';
    payload: EventsOptions.ProductSlideImages;
  }
  | {
    type: 'product_zoom';
    payload: EventsOptions.ProductZoom;
  }
  | {
    type: 'product_wishlist';
    payload: EventsOptions.ProductWishlist;
  }
  | {
    type: 'product_share';
    payload: EventsOptions.ProductShare;
  }
  | {
    type: 'product_view_recommended';
    payload: EventsOptions.ProductViewRecommended;
  }
  | {
    type: 'product_find_zipcode';
    payload: EventsOptions.ProductFindMyZipcode;
  }
  | {
    type: 'product_check_delivery_time';
    payload: EventsOptions.ProductCheckDeliveryTime;
  }
  | {
    type: 'product_subscribe_newsletter';
    payload: EventsOptions.ProductSubscribeNewsletter;
  }
  | {
    type: 'product_view_about',
    payload: EventsOptions.ProductViewAbout;
  }
  | {
    type: 'prime_press_add_to_cart_lp',
    payload: EventsOptions.PressAddToCartPrimeLP;
  }
  | {
    type: 'view_cart',
    payload: EventsOptions.ViewCart
  } | {
    type: 'header_search_click',
    payload: EventsOptions.PressHeaderSearch;
  };
