import { create } from 'zustand';
import type {
  IBagStore, IPayloadBagDispatch, IItemsBag,
} from './types/bagStore';
import bagReducer from './reducer/bagStoreReducer';

const useBagStore = create<IBagStore>((set, getState): IBagStore => ({
  topBarLoading: false,
  productNotFound: '',
  showLoadingModal: false,
  bagInitialLoad: true,
  currentOrderForm: undefined,
  deleteProductModal: {
    show: false,
  },
  bagInfos: {
    totalBagItemsPrice: 0,
    totalBagItems: 0,
    totalBagDiscountPrice: 0,
    totalBagDeliveryPrice: 0,
  },
  installmentInfo: {
    installmentPrice: 0,
    installmentsNumber: 0,
    totalPrice: 0,
  },
  currentBagItems: [],
  couponInfo: {
    seller: {
      sellerName: '',
      sellerCode: '',
      sellerCouponError: false,
    },
    discount: {
      discountCode: '',
      discountCouponError: false,
    },
  },
  unavailableItems: {
    error: true,
    message: '',
  },
  shippingBar: {
    loading: true,
    totalDelivery: 0,
    sumPriceShipping: 0,
  },
  getInitialBagState: async ({ orderForm, oldState, orderFormContext }) => {
    let { currentSelectedGiftSize, currentSelectedColorGift } = oldState.selectableGiftInfo;

    if (orderForm.selectableGift?.currentSelectableGift) {
      currentSelectedGiftSize = orderForm.selectableGift.currentSelectableGift.skuName.split('-')[1]?.trim() || '';
      currentSelectedColorGift = orderForm.selectableGift.currentSelectableGift.skuName.split('-')[0]?.trim() || '';
    }

    return {
      ...oldState,
      currentOrderForm: orderFormContext,
      bagInitialLoad: false,
      bagInfos: {
        totalBagItems: orderForm.allItemsQuantity,
        totalBagItemsPrice: orderForm.appTotalizers.items,
        totalBagDiscountPrice: orderForm.appTotalizers.discount,
        totalBagDeliveryPrice: orderForm.appTotalizers.delivery,
      },
      currentBagItems: orderForm.items,
      selectableGiftInfo: {
        ...oldState.selectableGiftInfo,
        currentSelectedGiftSize,
        currentSelectedColorGift,
        selectableGift: orderForm.selectableGift || null,
      },
      installmentInfo: {
        installmentPrice: orderForm.installmentInfo.installmentPrice,
        installmentsNumber: orderForm.installmentInfo.installmentsNumber,
        totalPrice: orderForm.installmentInfo.totalPrice,
      },
      shippingBar: {
        loading: false,
        sumPriceShipping: orderForm.appTotalizers.total,
        totalDelivery: orderForm.appTotalizers.delivery,
      },
      deleteProductModal: {
        show: false,
        deleteInfo: undefined,
      },
      couponInfo: {
        seller: {
          sellerName: orderForm.marketingData?.sellerCouponName || '',
          sellerCode: orderForm.marketingData?.sellerCoupon || '',
          sellerCouponError: false,
        },
        discount: {
          discountCode: orderForm.marketingData?.coupon || '',
          discountCouponError: false,
        },
      },
    };
  },
  selectableGiftInfo: {
    selectableGift: null,
    currentSelectedColorGift: '',
    currentSelectedGiftSize: '',
  },
  getMessageErrorWhenUpdateItem: ({ updateItemResponse, currentItem, currentUpdateValueItem }) => {
    const messages = updateItemResponse.orderFormUpdateItem.messages.filter((error: string) => error.includes(currentItem.name))[0] || '';
    const newQuantityAndTotalizerItemInfo = updateItemResponse.orderFormUpdateItem.items.reduce(
      (previousValue, currentValue: IItemsBag) => (
        currentItem.id === currentValue.id ? {
          quantity: previousValue.quantity + currentValue.quantity,
          totalizerItem: previousValue.totalizerItem + 1,
        } : { ...previousValue }
      ),
      { quantity: 0, totalizerItem: 0 },
    );

    if (newQuantityAndTotalizerItemInfo.totalizerItem) {
      if (
        getState().bagInfos.totalBagItems === newQuantityAndTotalizerItemInfo.quantity
      ) return messages;
    } else if (
      newQuantityAndTotalizerItemInfo.quantity !== currentUpdateValueItem
        && currentUpdateValueItem > 0
    ) return messages;

    return '';
  },
  getPriceWithDiscount: ({ calculateInstallments }) => {
    const { bagInfos, installmentInfo } = getState();

    const totalBag = bagInfos.totalBagItemsPrice + bagInfos.totalBagDiscountPrice;

    if (installmentInfo.installmentsNumber > 0 && calculateInstallments) {
      return totalBag / installmentInfo.installmentsNumber;
    }

    return totalBag;
  },
  dispatch: async (payload: IPayloadBagDispatch): Promise<IBagStore> => {
    const reducerState = await bagReducer(getState(), payload);
    set({ ...reducerState });
    return reducerState;
  },
}));

export default useBagStore;
