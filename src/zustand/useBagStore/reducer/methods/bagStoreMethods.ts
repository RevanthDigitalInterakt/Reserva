import type {
  IBagStore,
  IItemsBag,
  IPayload,
  TActionBagType,
} from '../../types/bagStore';
import EventProvider from '../../../../utils/EventProvider';
import {
  InitialBagStoreQuery,
  InitialBagStoreQueryVariables,
  OrderFormAddDiscountCouponMutation,
  OrderFormAddDiscountCouponMutationVariables,
  OrderFormAddGiftMutation,
  OrderFormAddGiftMutationVariables,
  OrderFormAddSellerCouponMutation,
  OrderFormAddSellerCouponMutationVariables,
  OrderformOutput,
  OrderFormRemoveDiscountCouponMutation,
  OrderFormRemoveDiscountCouponMutationVariables,
  OrderFormRemoveGiftMutation,
  OrderFormRemoveGiftMutationVariables,
  OrderFormRemoveSellerCouponMutation,
  OrderFormRemoveSellerCouponMutationVariables,
  OrderFormRemoveUnavailableItemsMutation,
  OrderFormRemoveUnavailableItemsMutationVariables,
  OrderFormSetGiftSizeDocument,
  OrderFormSetGiftSizeMutation,
  OrderFormSetGiftSizeMutationVariables,
  OrderFormUpdateItemMutation,
  OrderFormUpdateItemMutationVariables,
  InitialBagStoreDocument,
  OrderFormAddDiscountCouponDocument,
  OrderFormAddGiftDocument,
  OrderFormAddSellerCouponDocument,
  OrderFormRemoveDiscountCouponDocument,
  OrderFormRemoveGiftDocument,
  OrderFormRemoveSellerCouponDocument,
  OrderFormRemoveUnavailableItemsDocument,
  OrderFormUpdateItemDocument,
  OrderformSelectableGiftAvailableGiftOutput,
  OrderFormRefreshDataMutation,
  OrderFormRefreshDataMutationVariables,
  OrderFormRefreshDataDocument,
} from '../../../../base/graphql/generated';

import { splitSellerName } from '../../../../utils/splitSellerName';
import type { OrderForm } from '../../../../context/CartContext';
import { getApolloClient } from '../../../../utils/getApolloClient';

const bagStoreMethods: Record<
TActionBagType,
(oldState: IBagStore, payload: IPayload) => Promise<IBagStore>
> = {
  INITIAL_SET_ORDER_FORM: async (oldState, payload) => {
    const { orderForm }: { orderForm: OrderForm } = payload.value;
    try {
      const { data } = await getApolloClient().query<
      InitialBagStoreQuery,
      InitialBagStoreQueryVariables
      >({
        query: InitialBagStoreDocument,
        fetchPolicy: 'no-cache',
        variables: {
          orderFormId: orderForm.orderFormId,
        },
        context: { clientName: 'gateway' },
      });

      return await oldState.getInitialBagState({
        orderForm: data.orderForm as OrderformOutput,
        oldState,
        orderFormContext: orderForm,
      });
    } catch (error) {
      EventProvider.captureException(error);
      return { ...oldState };
    }
  },
  INITIAL_REFRESH_ORDER_FORM: async (oldState, payload) => {
    const { orderForm }: { orderForm: OrderForm } = payload.value;
    try {
      const { data } = await getApolloClient().query<
      OrderFormRefreshDataMutation,
      OrderFormRefreshDataMutationVariables
      >({
        query: OrderFormRefreshDataDocument,
        fetchPolicy: 'no-cache',
        variables: {
          input: {
            orderFormId: orderForm.orderFormId,
          },
        },
        context: { clientName: 'gateway' },
      });

      return await oldState.getInitialBagState({
        orderForm: data.orderFormRefreshData as OrderformOutput,
        oldState,
        orderFormContext: orderForm,
      });
    } catch (error) {
      EventProvider.captureException(error);
      return { ...oldState };
    }
  },
  HANDLE_ADD_AVAILABLE_GIFT: async (oldState, payload) => {
    const { currentOrderForm } = oldState;
    const {
      gift,
      giftId,
    }: {
      gift: OrderformSelectableGiftAvailableGiftOutput;
      giftId: string;
    } = payload.value;

    if (!currentOrderForm) return { ...oldState, topBarLoading: false };
    try {
      const { data } = await getApolloClient().query<
      OrderFormSetGiftSizeMutation,
      OrderFormSetGiftSizeMutationVariables
      >({
        query: OrderFormSetGiftSizeDocument,
        fetchPolicy: 'no-cache',
        variables: {
          giftId,
          id: gift.id,
          seller: gift.seller,
          orderFormId: currentOrderForm.orderFormId,
        },
        context: { clientName: 'gateway' },
      });

      return await oldState.getInitialBagState({
        orderForm: data.orderFormSetGiftSize as OrderformOutput,
        oldState,
        orderFormContext: currentOrderForm,
      });
    } catch (error) {
      EventProvider.captureException(error);
      return { ...oldState };
    }
  },
  HANDLE_SELECT_GIFT_COLOR: async (oldState, payload) => {
    const { giftColor } = payload.value;

    return {
      ...oldState,
      selectableGiftInfo: {
        ...oldState.selectableGiftInfo,
        currentSelectedColorGift: giftColor,
      },
    };
  },
  HANDLE_SELECT_GIFT_SIZE: async (oldState, payload) => {
    const { giftSize } = payload.value;

    return {
      ...oldState,
      selectableGiftInfo: {
        ...oldState.selectableGiftInfo,
        currentSelectedGiftSize: giftSize,
      },
    };
  },
  HANDLE_SELECT_GIFT_SIZE_AND_COLOR: async (oldState, payload) => {
    const { giftSize, giftColor } = payload.value;

    return {
      ...oldState,
      selectableGiftInfo: {
        ...oldState.selectableGiftInfo,
        currentSelectedGiftSize: giftSize,
        currentSelectedColorGift: giftColor,
      },
    };
  },
  SET_INITIAL_LOAD: async (oldState, payload) => ({
    ...oldState,
    bagInitialLoad: payload.value.bagInitialLoad,
  }),
  HANDLE_REMOVE_UNAVAILABLE_ITEMS: async (oldState) => {
    const { currentOrderForm } = oldState;

    if (!currentOrderForm) return { ...oldState, topBarLoading: false };

    try {
      const { data } = await getApolloClient().mutate<
      OrderFormRemoveUnavailableItemsMutation,
      OrderFormRemoveUnavailableItemsMutationVariables
      >({
        mutation: OrderFormRemoveUnavailableItemsDocument,
        context: { clientName: 'gateway' },
        variables: {
          orderFormId: currentOrderForm.orderFormId,
        },
        optimisticResponse: {
          orderFormRemoveUnavailableItems: {
            error: false,
            message: '',
          },
        },
      });

      if (data?.orderFormRemoveUnavailableItems) {
        return {
          ...oldState,
          unavailableItems: {
            error: data.orderFormRemoveUnavailableItems.error,
            message: data.orderFormRemoveUnavailableItems.message || '',
          },
          topBarLoading: false,
        };
      }

      return {
        ...oldState,
        unavailableItems: {
          error: false,
          message: '',
        },
        topBarLoading: false,
      };
    } catch (error) {
      EventProvider.captureException(error);
      return { ...oldState, topBarLoading: false };
    }
  },
  HANDLE_ADD_SELLER_COUPON: async (oldState, payload) => {
    const { value: sellerCoupom } = payload;
    const { currentOrderForm } = oldState;

    if (!currentOrderForm) {
      return { ...oldState, topBarLoading: false };
    }

    try {
      const { data } = await getApolloClient().mutate<
      OrderFormAddSellerCouponMutation,
      OrderFormAddSellerCouponMutationVariables
      >({
        mutation: OrderFormAddSellerCouponDocument,
        context: { clientName: 'gateway' },
        variables: {
          coupon: sellerCoupom,
          orderFormId: currentOrderForm.orderFormId,
        },
      });

      return {
        ...oldState,
        topBarLoading: false,
        couponInfo: {
          ...oldState.couponInfo,
          seller: {
            sellerName: splitSellerName(
              data?.orderFormAddSellerCoupon?.marketingData?.marketingTags[2]
                || '',
            ),
            sellerCode: sellerCoupom,
            sellerCouponError: false,
          },
        },
        bagInfos: {
          ...oldState.bagInfos,
          totalBagItemsPrice: data?.orderFormAddSellerCoupon.appTotalizers.items || 0,
          totalBagDiscountPrice: data?.orderFormAddSellerCoupon.appTotalizers.discount || 0,
          totalBagDeliveryPrice: data?.orderFormAddSellerCoupon.appTotalizers.delivery || 0,
        },
      };
    } catch (error) {
      EventProvider.captureException(error);

      return {
        ...oldState,
        topBarLoading: false,
        couponInfo: {
          ...oldState.couponInfo,
          seller: {
            ...oldState.couponInfo.seller,
            sellerCouponError: true,
          },
        },
      };
    }
  },
  HANDLE_REMOVE_SELLER_COUPON: async (oldState) => {
    const { currentOrderForm } = oldState;

    if (!currentOrderForm) return { ...oldState, topBarLoading: false };

    try {
      const { data } = await getApolloClient().mutate<
      OrderFormRemoveSellerCouponMutation,
      OrderFormRemoveSellerCouponMutationVariables
      >({
        mutation: OrderFormRemoveSellerCouponDocument,
        variables: {
          orderFormId: currentOrderForm.orderFormId,
        },
        context: { clientName: 'gateway' },
      });

      return {
        ...oldState,
        topBarLoading: false,
        couponInfo: {
          ...oldState.couponInfo,
          seller: {
            sellerName: '',
            sellerCode: '',
            sellerCouponError: false,
          },
        },
        bagInfos: {
          ...oldState.bagInfos,
          totalBagItemsPrice: data?.orderFormRemoveSellerCoupon.appTotalizers.items || 0,
          totalBagDiscountPrice: data?.orderFormRemoveSellerCoupon.appTotalizers.discount || 0,
          totalBagDeliveryPrice: data?.orderFormRemoveSellerCoupon.appTotalizers.delivery || 0,
        },
      };
    } catch (error) {
      EventProvider.captureException(error);
      return { ...oldState, topBarLoading: false };
    }
  },
  HANDLE_ADD_DISCOUNT_COUPON: async (oldState, payload) => {
    const { currentOrderForm } = oldState;
    if (!currentOrderForm) return { ...oldState, topBarLoading: false };

    try {
      const { coupon } = payload.value;

      const { data } = await getApolloClient().mutate<
      OrderFormAddDiscountCouponMutation,
      OrderFormAddDiscountCouponMutationVariables
      >({
        mutation: OrderFormAddDiscountCouponDocument,
        variables: {
          orderFormId: currentOrderForm.orderFormId,
          coupon,
        },
        context: { clientName: 'gateway' },
        optimisticResponse: {
          orderFormAddDiscountCoupon: {
            orderFormId: currentOrderForm.orderFormId,
            marketingData: {
              coupon,
            },
            appTotalizers: {
              discount: oldState.bagInfos.totalBagDiscountPrice,
              total: oldState.bagInfos.totalBagItemsPrice,
              delivery: oldState.bagInfos.totalBagDeliveryPrice,
              items: oldState.bagInfos.totalBagItems,
            },
          },
        },
      });

      if (!data?.orderFormAddDiscountCoupon.marketingData?.coupon) {
        return {
          ...oldState,
          topBarLoading: false,
          couponInfo: {
            ...oldState.couponInfo,
            discount: {
              discountCode: '',
              discountCouponError: true,
            },
          },
        };
      }

      return {
        ...oldState,
        topBarLoading: false,
        couponInfo: {
          ...oldState.couponInfo,
          discount: {
            discountCode: data.orderFormAddDiscountCoupon.marketingData.coupon,
            discountCouponError: false,
          },
        },
        bagInfos: {
          ...oldState.bagInfos,
          totalBagItemsPrice:
            data.orderFormAddDiscountCoupon.appTotalizers.items,
          totalBagDiscountPrice:
            data.orderFormAddDiscountCoupon.appTotalizers.discount,
          totalBagDeliveryPrice:
            data.orderFormAddDiscountCoupon.appTotalizers.delivery,
        },
      };
    } catch (error) {
      EventProvider.captureException(error);
      return {
        ...oldState,
        topBarLoading: false,
        couponInfo: {
          ...oldState.couponInfo,
          discount: {
            discountCode: '',
            discountCouponError: true,
          },
        },
      };
    }
  },
  HANDLE_REMOVE_DISCOUNT_COUPON: async (oldState) => {
    const { currentOrderForm } = oldState;

    if (!currentOrderForm) return { ...oldState, topBarLoading: false };

    try {
      const { data } = await getApolloClient().mutate<
      OrderFormRemoveDiscountCouponMutation,
      OrderFormRemoveDiscountCouponMutationVariables
      >({
        mutation: OrderFormRemoveDiscountCouponDocument,
        variables: {
          orderFormId: currentOrderForm.orderFormId,
        },
        context: { clientName: 'gateway' },
        optimisticResponse: {
          orderFormRemoveDiscountCoupon: {
            orderFormId: currentOrderForm.orderFormId,
            appTotalizers: {
              discount: oldState.bagInfos.totalBagDiscountPrice,
              total: oldState.bagInfos.totalBagItemsPrice,
              delivery: oldState.bagInfos.totalBagDeliveryPrice,
              items: oldState.bagInfos.totalBagItems,
            },
          },
        },
      });

      if (!data) return { ...oldState, topBarLoading: false };

      return {
        ...oldState,
        topBarLoading: false,
        bagInfos: {
          ...oldState.bagInfos,
          totalBagItemsPrice:
            data.orderFormRemoveDiscountCoupon.appTotalizers.items,
          totalBagDiscountPrice:
            data.orderFormRemoveDiscountCoupon.appTotalizers.discount,
          totalBagDeliveryPrice:
            data.orderFormRemoveDiscountCoupon.appTotalizers.delivery,
        },
        couponInfo: {
          ...oldState.couponInfo,
          discount: {
            discountCode: '',
            discountCouponError: false,
          },
        },
      };
    } catch (error) {
      EventProvider.captureException(error);
      return { ...oldState, topBarLoading: false };
    }
  },
  HANDLE_ADD_GIFT: async (oldState, payload) => {
    const { currentOrderForm } = oldState;

    if (!currentOrderForm) return { ...oldState, topBarLoading: false };

    try {
      const { index, id } = payload.value;

      const { data } = await getApolloClient().mutate<
      OrderFormAddGiftMutation,
      OrderFormAddGiftMutationVariables
      >({
        mutation: OrderFormAddGiftDocument,
        context: { clientName: 'gateway' },
        variables: {
          orderFormId: currentOrderForm.orderFormId,
          index,
          id,
        },
        optimisticResponse: {
          orderFormAddGift: {
            orderFormId: currentOrderForm.orderFormId,
            items: oldState.currentBagItems,
          },
        },
      });

      if (!data?.orderFormAddGift.items.length) { return { ...oldState, topBarLoading: false }; }

      return {
        ...oldState,
        topBarLoading: false,
        currentBagItems: data.orderFormAddGift.items,
      };
    } catch (error) {
      EventProvider.captureException(error);
      return { ...oldState, topBarLoading: false };
    }
  },
  HANDLE_REMOVE_GIFT: async (oldState, payload) => {
    const { currentOrderForm } = oldState;

    if (!currentOrderForm) return { ...oldState, topBarLoading: false };

    try {
      const { index, id } = payload.value;

      const { data } = await getApolloClient().mutate<
      OrderFormRemoveGiftMutation,
      OrderFormRemoveGiftMutationVariables
      >({
        mutation: OrderFormRemoveGiftDocument,
        context: { clientName: 'gateway' },
        variables: {
          orderFormId: currentOrderForm.orderFormId,
          index,
          id,
        },
        optimisticResponse: {
          orderFormRemoveGift: {
            orderFormId: currentOrderForm.orderFormId,
            items: oldState.currentBagItems,
          },
        },
      });

      if (!data?.orderFormRemoveGift.items.length) { return { ...oldState, topBarLoading: false }; }

      return {
        ...oldState,
        topBarLoading: false,
        currentBagItems: data.orderFormRemoveGift.items,
      };
    } catch (error) {
      EventProvider.captureException(error);
      return { ...oldState, topBarLoading: false };
    }
  },
  HANDLE_UPDATE_PRODUCT_COUNT: async (oldState, payload) => {
    const { currentOrderForm } = oldState;

    if (!currentOrderForm?.orderFormId) { return { ...oldState, topBarLoading: false }; }

    try {
      const {
        index,
        item,
        countUpdated,
      }: {
        index: number;
        item: IItemsBag;
        countUpdated: number;
      } = payload.value;
      let errorsMessages = '';

      const { data } = await getApolloClient().mutate<
      OrderFormUpdateItemMutation,
      OrderFormUpdateItemMutationVariables
      >({
        mutation: OrderFormUpdateItemDocument,
        variables: {
          orderFormId: currentOrderForm.orderFormId,
          index,
          id: item.id,
          seller: item.seller,
          quantity: item.isAssinaturaSimples ? 1 : countUpdated,
        },
        context: { clientName: 'gateway' },
      });

      let currentSelectableGiftInfo = oldState.selectableGiftInfo;

      if (data?.orderFormUpdateItem.messages) {
        errorsMessages = oldState.getMessageErrorWhenUpdateItem({
          currentItem: item,
          updateItemResponse: data,
          currentUpdateValueItem: countUpdated,
        });
      }

      if (!data?.orderFormUpdateItem) {
        return { ...oldState, topBarLoading: false };
      }

      if (data.orderFormUpdateItem.selectableGift === null) {
        currentSelectableGiftInfo = {
          selectableGift: null,
          currentSelectedColorGift: '',
          currentSelectedGiftSize: '',
        };
      } else {
        currentSelectableGiftInfo = {
          ...currentSelectableGiftInfo,
          selectableGift: data.orderFormUpdateItem.selectableGift || null,
        };
      }

      return {
        ...oldState,
        topBarLoading: false,
        currentBagItems: data.orderFormUpdateItem.items,
        selectableGiftInfo: {
          ...currentSelectableGiftInfo,
        },
        bagInfos: {
          ...oldState.bagInfos,
          totalBagItems: data.orderFormUpdateItem.allItemsQuantity,
          totalBagItemsPrice: data.orderFormUpdateItem.appTotalizers.items,
          totalBagDiscountPrice:
            data.orderFormUpdateItem.appTotalizers.discount,
          totalBagDeliveryPrice:
            data.orderFormUpdateItem.appTotalizers.delivery,
        },
        installmentInfo: {
          ...oldState.installmentInfo,
          installmentsNumber: data.orderFormUpdateItem.installmentInfo.installmentsNumber,
          installmentPrice: data.orderFormUpdateItem.installmentInfo.installmentPrice,
          totalPrice: data.orderFormUpdateItem.installmentInfo.totalPrice,
        },
        shippingBar: {
          loading: false,
          sumPriceShipping: data.orderFormUpdateItem.appTotalizers.total,
          totalDelivery: data.orderFormUpdateItem.appTotalizers.delivery,
        },
        deleteProductModal: {
          show: false,
          deleteInfo: undefined,
        },
        productNotFound: errorsMessages,
      };
    } catch (error) {
      EventProvider.captureException(error);
      return { ...oldState, topBarLoading: false };
    }
  },
  HANDLE_ACTIVE_MODAL_DELETE_PRODUCT: async (oldState, payload) => {
    const { show, product, index } = payload.value;

    return {
      ...oldState,
      deleteProductModal: { show, deleteInfo: { product, index } },
    };
  },
  HANDLE_CLOSE_MODAL_DELETE_PRODUCT: async (oldState) => ({
    ...oldState,
    deleteProductModal: { show: false, deleteInfo: undefined },
  }),
  SET_SHIPPING_BAR_INFOS: async (oldState, payload) => ({
    ...oldState,
    shippingBar: {
      loading: payload.value.loading,
      totalDelivery: payload.value.totalDelivery,
      sumPriceShipping: payload.value.sumPriceShipping,
    },
  }),
  SET_CURRENT_ORDER_FORM: async (oldState, payload) => ({
    ...oldState,
    currentOrderForm: payload.value.orderForm,
  }),
  SET_PRODUCT_NOT_FOUND: async (oldState, payload) => ({
    ...oldState,
    productNotFound: payload.value.productNotFound,
  }),
  TOOGLE_MODALS: async (oldState, payload) => ({
    ...oldState,
    [payload.value.modalKey]: !oldState[payload.value.modalKey],
  }),
  SET_TOP_BAR_LOADING: async (oldState, payload) => ({
    ...oldState,
    topBarLoading: payload.value.topBarLoading,
  }),
};

export default bagStoreMethods;
