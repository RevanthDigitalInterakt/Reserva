import type { OrderForm } from '../../../context/CartContext';
import type {
  OrderformOutput,
  OrderformSelectableGiftOutput,
  OrderFormUpdateItemMutation,
} from '../../../base/graphql/generated';

type TActionBagType = 'SET_TOP_BAR_LOADING'
| 'SET_PRODUCT_NOT_FOUND'
| 'TOOGLE_MODALS'
| 'SET_CURRENT_ORDER_FORM'
| 'INITIAL_SET_ORDER_FORM'
| 'INITIAL_REFRESH_ORDER_FORM'
| 'SET_SHIPPING_BAR_INFOS'
| 'HANDLE_ADD_SELLER_COUPON'
| 'HANDLE_REMOVE_SELLER_COUPON'
| 'HANDLE_ADD_DISCOUNT_COUPON'
| 'HANDLE_REMOVE_DISCOUNT_COUPON'
| 'HANDLE_ADD_GIFT'
| 'HANDLE_REMOVE_GIFT'
| 'HANDLE_UPDATE_PRODUCT_COUNT'
| 'HANDLE_ACTIVE_MODAL_DELETE_PRODUCT'
| 'HANDLE_CLOSE_MODAL_DELETE_PRODUCT'
| 'SET_INITIAL_LOAD'
| 'HANDLE_REMOVE_UNAVAILABLE_ITEMS'
| 'HANDLE_SELECT_GIFT_COLOR'
| 'HANDLE_SELECT_GIFT_SIZE'
| 'HANDLE_SELECT_GIFT_SIZE_AND_COLOR'
| 'HANDLE_ADD_AVAILABLE_GIFT';

interface IPayload {
  value: any
}

interface IBagInfos {
  totalBagItems: number
  totalBagItemsPrice: number
  totalBagDiscountPrice: number
  totalBagDeliveryPrice: number

}

interface IItemsBag {
  productTitle: string
  itemColor: string
  itemSize: string
  isGift: boolean
  isGiftable: boolean
  imageSource: string
  isAssinaturaSimples: boolean
  priceWithDiscount: number
  discountPercent: number
  discountApi?: number | null
  showFirstPurchaseDiscountMessage?: string | null
  showTotalDiscountFirstPurchaseValue?: number | null
  price: number
  productId: string
  id: string
  skuName: string
  name: string
  quantity: number
  seller: string
  disableCounter: boolean,
  sellingPrice: number
  giftOfferingId?: string | null
  listPrice: number
  isAddedAsGift: boolean
  uniqueId: string
  key: string
}
interface IPayloadBagDispatch {
  actionType: TActionBagType
  payload: IPayload
}

interface IDeleteProductModal {
  show: boolean
  deleteInfo?: {
    product: IItemsBag
    index: number
  }
}

interface IBagStore {
  [key: string]: any
  topBarLoading: boolean
  bagInitialLoad: boolean
  deleteProductModal: IDeleteProductModal
  bagInfos: IBagInfos
  productNotFound: string
  showLoadingModal: boolean

  currentBagItems: Array<IItemsBag>

  installmentInfo: {
    installmentsNumber: number,
    installmentPrice: number,
    totalPrice: number
  }

  selectableGiftInfo: {
    currentSelectedColorGift: string
    currentSelectedGiftSize: string
    selectableGift: OrderformSelectableGiftOutput | null
  }

  currentOrderForm: OrderForm | undefined

  couponInfo: {
    seller: {
      sellerName: string,
      sellerCode: string,
      sellerCouponError: boolean
    },
    discount: {
      discountCode: string
      discountCouponError: boolean
    }
  }

  unavailableItems: {
    error: boolean,
    message: string
  }

  getPriceWithDiscount: ({ calculateInstallments }: { calculateInstallments?: boolean }) => number ;
  getInitialBagState: ({
    orderForm,
    oldState,
    orderFormContext,
  }: {
    orderForm: OrderformOutput,
    oldState: IBagStore,
    orderFormContext: OrderForm
  }) => Promise<IBagStore>
  getMessageErrorWhenUpdateItem: (
    { updateItemResponse, currentItem, currentUpdateValueItem }:
    {
      updateItemResponse: OrderFormUpdateItemMutation,
      currentItem: IItemsBag,
      currentUpdateValueItem: number
    }
  ) => string;
  shippingBar: {
    loading: boolean,
    sumPriceShipping: number
    totalDelivery: number
  }
  dispatch: (payload: IPayloadBagDispatch) => Promise<IBagStore>
}

export type {
  IBagStore,
  IPayloadBagDispatch,
  TActionBagType,
  IPayload,
  IItemsBag,
  IDeleteProductModal,
};
