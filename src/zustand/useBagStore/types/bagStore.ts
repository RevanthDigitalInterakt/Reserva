import type {
  OrderFormQuery,
  OrderformAddMultipleItemInput,
  OrderformSelectableGiftAvailableGiftOutput,
  ShippingSimulationOutput,
} from '../../../base/graphql/generated';

export type TItemBag = OrderFormQuery['orderForm']['packageItems'][0]['items'][0];

export interface IBagStore {
  initialized: boolean;
  topBarLoading: boolean;
  rouletCoupon: {
    code: string | null;
    timestamp: string | null
    blocked: boolean;
  };
  rouletIsOpen: boolean;
  rouletIsLoading: boolean;
  loadingModal: boolean;
  initialLoad: boolean;
  productNotFound: string;
  error: string;
  deleteProductModal: {
    show: boolean;
    deleteInfo?: {
      product: TItemBag;
      index: number;
    }
  };
  currentSelectedGiftSize: string;
  currentSelectedColorGift: string;
  //
  orderFormId: string;
  messages: string[];
  clientProfileData?: OrderFormQuery['orderForm']['clientProfileData'];
  packageItems: OrderFormQuery['orderForm']['packageItems']
  prime: OrderFormQuery['orderForm']['prime']
  deliveryType: {
    type: string;
    store?: string;
  }
  selectableGift: OrderFormQuery['orderForm']['selectableGift']
  marketingData: OrderFormQuery['orderForm']['marketingData']
  shippingData: OrderFormQuery['orderForm']['shippingData']
  appTotalizers: OrderFormQuery['orderForm']['appTotalizers']
  installmentInfo: OrderFormQuery['orderForm']['installmentInfo']
  allItemsQuantity: OrderFormQuery['orderForm']['allItemsQuantity']
  hasPrimeSubscriptionInCart: OrderFormQuery['orderForm']['hasPrimeSubscriptionInCart']
  //
  actions: {
    INITIAL_LOAD: () => Promise<void>;
    REFETCH_ORDER_FORM: () => Promise<void>;
    REFRESH_ORDER_FORM: () => Promise<void>;
    ROULET_COUPON_INITIAL_LOAD: () => Promise<void>;
    RESET_ORDER_FORM: () => Promise<void>;
    CREATE_NEW_ORDER_FORM: () => Promise<void>;
    COPY_ORDERFORM: () => boolean;
    ADD_SELLER_COUPON: (coupon: string) => Promise<void>;
    ADD_DISCOUNT_COUPON: (coupon: string) => Promise<void>;
    REMOVE_SELLER_COUPON: () => Promise<void>;
    OPEN_ROULET: () => void;
    CLOSE_ROULET: () => void;
    SET_ROULET_LOADING: (loading: boolean) => void;
    REMOVE_DISCOUNT_COUPON: () => Promise<void>;
    ADD_ITEM: (seller: string, id: string, quantity: number) => Promise<void>;
    ADD_DELIVERY_TO_RESIDENCE: (deliveryOptions: ShippingSimulationOutput['delivery']['deliveryOptions'], address: ShippingSimulationOutput['delivery']['address']) => Promise<void>;
    ADD_DELIVERY_TO_PICKUP_IN_POINT: (
      deliveryOptionsStore: ShippingSimulationOutput['storeList']['deliveryOptions'],
      storeAddress: ShippingSimulationOutput['storeList']['stores'][0]['address']) => Promise<void>;
    ADD_DELIVERY_TYPE: (type: string, store?: string) => void;
    ADD_MULTIPLE_ITEMS: (orderItems: OrderformAddMultipleItemInput) => Promise<void>;
    SAVE_ROULET_COUPON: (coupon: string, timestamp: string) => void;
    BLOCK_ROULET_COUPON: () => void;
    UNBLOCK_ROULET_COUPON: () => void;
    ADD_AVAILABLE_GIFT: (
      gift: OrderformSelectableGiftAvailableGiftOutput,
      giftId: string,
    ) => Promise<void>;
    ADD_GIFT: (index: number, id: string) => Promise<void>;
    REMOVE_GIFT: (index: number, id: string) => Promise<void>;
    REMOVE_UNAVAILABLE_ITEMS: () => Promise<void>;
    UPDATE_PRODUCT_COUNT: (
      index: number,
      item: TItemBag,
      countUpdated: number,
    ) => Promise<void>;
    CLOSE_MODAL_DELETE_PRODUCT: () => Promise<void>;
    ACTIVE_MODAL_DELETE_PRODUCT: (product: TItemBag, index: number) => Promise<void>;
    SELECT_GIFT_COLOR: (color: string) => void;
    SELECT_GIFT_SIZE: (size: string) => void;
    SELECT_GIFT: (color: string, size: string) => void;
    CLEAR_PRODUCT_NOT_FOUND: () => void;
  };
}
