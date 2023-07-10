import type {
  OrderFormQuery,
  OrderformSelectableGiftAvailableGiftOutput,
} from '../../../base/graphql/generated';

export type TItemBag = OrderFormQuery['orderForm']['items'][0];

export interface IBagStore {
  initialized: boolean;
  topBarLoading: boolean;
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
  items: OrderFormQuery['orderForm']['items']
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
    ADD_SELLER_COUPON: (coupon: string) => Promise<void>;
    ADD_DISCOUNT_COUPON: (coupon: string) => Promise<void>;
    REMOVE_SELLER_COUPON: () => Promise<void>;
    REMOVE_DISCOUNT_COUPON: () => Promise<void>;
    ADD_ITEM: (seller: string, id: string, quantity: number) => Promise<void>;
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
