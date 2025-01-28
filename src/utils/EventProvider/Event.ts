import type { Maybe } from '../../base/graphql/generated';

export type Items = {
  price?: number;
  item_id?: string;
  quantity?: number;
  item_name?: string;
  item_variant?: string;
  item_category?: string;
};

export enum Method {
  Email = 'email',
  Google = 'google',
  Facebook = 'facebook',
}

export enum Actions {
  see_bag = 'click_button_see_bag',
  click_on_image = 'click_on_image',
  click_on_text = 'click_on_text',
  click_on_card_more_items = 'click_on_card_more_items',
  click_button_finish_purchase = 'click_button_finish_purchase',
}

type EventValues = {
  item_id?: string;
  item_name?: string;
  item_price?: any;
  item_quantity?: number;
  item_category: string;
  item_categories: string;
  item_size: string | number;
  item_color: string;
  currency: string;
  seller: string;
  click_name: string;
  custumer_email: string;
  content_ids: string | string[];
  content_type: string | string[];
  product_id: string;
  product_name: string;
  product_ean: string;
  product_category: string;
  product_price: any;
  product_currency: string;
  search_string: string;
  search_ids: any;
  price: number;
  quantity: number | number[];
  method: Method;
  affiliation: string;
  coupon: string;
  value?: number;
  tax: number;
  shipping: number;
  transaction_id: string;
  order_form_id: string;
  items: Items[];
  search_term: string;
  item_list_id: string;
  item_list_name: string;
  payment_type: string;
  item_brand: string;
  email: string;
  appState: 'in' | 'out';
  index: number;
  open: number;
  show: number;
  success: number;
  favorite: number;
  position: 'top' | 'bottom';
  page: string;
  os: string;
  freeMemory: string;
  totalMemory: string;
  usedMemory: string;
  freeStorage: string;
  totalStorage: string;
  usedStorage: string;
  platform?: string;
  model?: string;
  ip?: string
  locationEnabled: string;
  category: Maybe<string> | undefined;
  banner_position: Maybe<string> | undefined;
  banner_location: string;
};

type AbandonedCartEventValues = {
  action: Actions;
  index?: number;
  logged?: 'logged in' | 'logged out';
};

type CardCashbackEventValues = {
  value: number;
};

export namespace EventsOptions {
  export type PageView = Pick<EventValues, 'item_brand'>;
  export type Login = Pick<EventValues, 'custumer_email' | 'method'>;
  export type Search = Pick<EventValues, 'search_term'>;
  export type ClickHere = Pick<EventValues, 'click_name'>;
  export type ViewSearchResults = Pick<EventValues, 'search_term'>;
  export type RemoveFromCart = Pick<EventValues, 'item_id' | 'item_categories' | 'item_brand'>;
  export type ProductListView = Pick<EventValues, 'content_type' | 'item_brand'>;
  export type BannerLocation = Pick<EventValues, 'banner_location'>;
  export type CheckoutInitiated = Pick<
  EventValues,
  'price' | 'content_type' | 'content_ids' | 'currency' | 'quantity'
  >;
  export type CompleteRegistration = Pick<
  EventValues,
  'method' | 'custumer_email'
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
  | 'item_name'
  | 'item_quantity'
  | 'item_category'
  | 'item_brand'
  | 'currency'
  | 'seller'
  | 'price'
  | 'quantity'
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
  export type ViewItem = Pick<EventValues, 'currency' | 'items' | 'value' | 'item_brand'>;
  export type BeginCheckout = Pick<EventValues, 'items' | 'value' | 'coupon' | 'currency' | 'item_brand'>;
  export type AddShippingInfo = Pick<EventValues, 'currency' | 'items' | 'coupon' | 'item_brand'>;
  export type SelectItem = Pick<EventValues, 'item_list_id' | 'item_list_name' | 'item_brand'>;
  export type ViewItemList = Pick<EventValues, 'items' | 'item_brand'>;
  export type AddPaymentInfo = Pick<EventValues, 'coupon' | 'currency' | 'items' | 'payment_type' | 'value' | 'item_brand'>;
  export type RonOpen = Pick<
  EventValues,
  'items'
  | 'open'
  | 'item_brand'
  >;
  export type RonPurchase = Pick<
  EventValues,
  | 'coupon'
  | 'currency'
  | 'items'
  | 'transaction_id'
  | 'value'
  | 'item_brand'
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
  export type ProductWishlist = Pick<EventValues, | 'currency' | 'value' | 'items'>;
  export type ProductShare = Pick<EventValues, | 'product_id'>;
  export type ProductViewRecommended = Pick<EventValues, | 'show'>;
  export type ProductFindMyZipcode = Pick<EventValues, | 'product_id'>;
  export type ProductCheckDeliveryTime = Pick<EventValues, | 'product_id' | 'success'>;
  export type ProductSubscribeNewsletter = Pick<EventValues, | 'product_id' | 'success'>;
  export type ProductViewAbout = Pick<EventValues, | 'product_id' | 'show'>;
  export type PressAddToCartPrimeLP = Pick<EventValues, | 'position'>;
  export type ViewCart = Pick<EventValues, | 'currency' | 'items' | 'value'>;
  export type PressHeaderSearch = Pick<EventValues, 'open'>;
  export type PageLoadTime = Pick<EventValues, | 'page' | 'value'>;
  export type SignUp = Pick<EventValues, | 'method'>;
  export type Wishlist = Pick<EventValues, | 'currency' | 'items' | 'value'>;
  export type AbandonedCart = Pick<AbandonedCartEventValues, | 'action' | 'index' | 'logged'>;
  export type CallCenterClick = {
    phoneNumber: number;
  };
  export type CardCashback = Pick<CardCashbackEventValues, 'value'>;
  export type PurchasePrime = Pick<EventValues, 'value'>;
  export type DorisButton = Pick<EventValues, 'product_id' | 'product_ean'>;
  export type ProductSize = Pick<EventValues, 'item_id' | 'item_size'>;
  export type ProductColor = Pick<EventValues, 'item_id' | 'item_color'>;
  export type PaymentOptions = Pick<EventValues, 'item_id'>;
  export type ReturnPolicy = Pick<EventValues, 'item_id'>;
  export type AddToCartFromWishlist = Pick<EventValues, 'item_name' | 'item_color' | 'item_size' | 'value'>;
  export type DeviceInfoMemory = Pick<
  EventValues,
  | 'model'
  | 'os'
  | 'totalMemory'
  | 'freeMemory'
  | 'usedMemory'
  >;
  export type DeviceInfoStorage = Pick<
  EventValues,
  | 'model'
  | 'os'
  | 'totalStorage'
  | 'freeStorage'
  | 'usedStorage'
  >;
  export type MobileJailbroken = Pick<EventValues, 'platform' | 'model' | 'ip'>;
  export type DeviceInfoTrack = Pick<EventValues, 'locationEnabled'>;
  export type OffersCategoryBanner = Pick<EventValues, 'category' | 'banner_position'>;
  export type KitLookPDC = Pick<EventValues, 'item_id' | 'item_name'>;
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
  |
  {
    type: 'click_na_roleta',
    payload: {};
  }
  |
  {
    type: 'click_cupom_roleta',
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
    type: 'add_wishlist';
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
  }
  | {
    type: 'header_search_click',
    payload: EventsOptions.PressHeaderSearch;
  }
  | {
    type: 'page_load_time',
    payload: EventsOptions.PageLoadTime
  }
  | {
    type: 'sign_up',
    payload: EventsOptions.SignUp
  }
  | {
    type: 'add_to_wishlist',
    payload: EventsOptions.Wishlist
  } | {
    type: 'remove_from_wishlist',
    payload: EventsOptions.Wishlist
  } | {
    type: 'click_form_menu',
    payload: {}
  }
  | {
    type: 'click_form_profile',
    payload: {}
  }
  | {
    type: 'click_1p5p_menu',
    payload: {}
  }
  | {
    type: 'click_1p5p_home',
    payload: {}
  }
  | {
    type: 'abandoned_cart',
    payload: EventsOptions.AbandonedCart
  }
  | {
    type: 'call_center_click',
    payload: EventsOptions.CallCenterClick
  }
  | {
    type: 'call_center_click_prime',
    payload: EventsOptions.CallCenterClick
  }
  | {
    type: 'call_center_tab_click',
    payload: {}
  }
  | {
    type: 'offers_tab_click',
    payload: {}
  }
  | {
    type: 'click_card_cashback',
    payload: EventsOptions.CardCashback
  }
  | {
    type: 'add_new_prime_from_bag_app',
    payload: {}
  }
  | {
    type: 'doris_button',
    payload: EventsOptions.DorisButton
  } | {
    type: 'item_menu',
    payload: {
      itemName: string;
    }
  } | {
    type: 'item_fixed_menu',
    payload: {
      itemName: string;
    }
  } | {
    type: 'menu_click',
    payload: {}
  } | {
    type: 'bag_click',
    payload: {}
  } | {
    type: 'carousel_brand_click',
    payload: {
      reference: string;
    }
  } | {
    type: 'header_search_click',
    payload: {
      open: number;
    }
  } | {
    type: 'home_tab_click',
    payload: {}
  } | {
    type: 'offers_tab_click',
    payload: {}
  } | {
    type: 'roulet_tab_click',
    payload: {}
  } | {
    type: 'wishlist_tab_click',
    payload: {}
  } | {
    type: 'profile_tab_click',
    payload: {}
  } | {
    type: 'call_center_tab_click',
    payload: {}
  } | {
    type: 'top_bar_search_click',
    payload: {}
  }
  | {
    type: 'whatsapp_bar_click',
    payload: {}
  }
  | {
    type: 'filter_button_click',
    payload: {}
  }
  | {
    type: 'sort_button_click',
    payload: {}
  } | {
    type: 'change_item_size',
    payload: EventsOptions.ProductSize
  }
  | {
    type: 'change_item_color',
    payload: EventsOptions.ProductColor
  } | {
    type: 'prime_price_box_click',
    payload: {}
  } | {
    type: 'normal_price_box_click',
    payload: {}
  } | {
    type: 'cashback_info_click',
    payload: {}
  } | {
    type: 'payment_options_click',
    payload: EventsOptions.PaymentOptions;
  } | {
    type: 'return_policy_click',
    payload: EventsOptions.ReturnPolicy;
  } | {
    type: 'add_to_cart_from_wishlist',
    payload: EventsOptions.AddToCartFromWishlist;
  } | {
    type: 'faca_vc_tab_click',
    payload: {}
  } | {
    type: 'personalize_tab_click',
    payload: {}
  } | {
    type: 'mobile_jailbroken',
    payload: EventsOptions.MobileJailbroken;
  } | {
    type: 'offers_main_banner_slide',
    payload: {}
  } | {
    type: 'offers_main_banner_click',
    payload: {
      category: string;
    }
  } | {
    type: 'device_info_memory',
    payload: EventsOptions.DeviceInfoMemory,
  } | {
    type: 'device_info_storage',
    payload: EventsOptions.DeviceInfoStorage
  } | {
    type: 'login_forgot_password_click',
    payload: {}
  } | {
    type: 'login_click',
    payload: {}
  } | {
    type: 'login_register_click',
    payload: {}
  } | {
    type: 'signup_register_email_click',
    payload: {}
  } | {
    type: 'signup_recover_password_click',
    payload: {}
  } | {
    type: 'signup_create_password_click',
    payload: {}
  } | {
    type: 'profile_edit_click',
    payload: {}
  } | {
    type: 'profile_my_orders_click',
    payload: {}
  } | {
    type: 'profile_favorites_click',
    payload: {}
  } | {
    type: 'profile_my_account_click',
    payload: {}
  } | {
    type: 'profile_my_cashback_click',
    payload: {}
  } | {
    type: 'profile_my_credits_click',
    payload: {}
  } | {
    type: 'profile_my_addresses_click',
    payload: {}
  } | {
    type: 'profile_change_password_click',
    payload: {}
  } | {
    type: 'profile_my_portfolio_click',
    payload: {}
  } | {
    type: 'profile_logout_click',
    payload: {}
  } | {
    type: 'device_info',
    payload: EventsOptions.DeviceInfoTrack,
  } | {
    type: 'offers_category_banner_click',
    payload: EventsOptions.OffersCategoryBanner,
  } | {
    type: 'pdp_button_rainbow_fvc',
    payload: {},
  } | {
    type: 'pdp_icon_fvc',
    payload: {},
  } | {
    type: 'pdp_open_product_with_ref_fvc',
    payload: {},
  } | {
    type: 'pdc_click_kit_look_item',
    payload: EventsOptions.KitLookPDC,
  } | {
    type: 'shelf_offers_button_see_more',
    payload: {},
  } | {
    type: 'modal_geolocation_close',
  } | {
    type: 'show_offers_tooltip_click',
  } | {
    type: 'banner_location',
    payload: EventsOptions.BannerLocation
  };
