import { create } from 'zustand';
import type { IBagStore } from './types/bagStore';
import { createZustandStoreWithSelectors } from '../../utils/createZustandStoreWithSelectors';
import { getApolloClient } from '../../utils/getApolloClient';
import {
  OrderFormAddDiscountCouponDocument,
  OrderFormAddDiscountCouponMutation,
  OrderFormAddDiscountCouponMutationVariables,
  OrderFormAddGiftDocument,
  OrderFormAddGiftMutation,
  OrderFormAddGiftMutationVariables,
  OrderFormAddItemDocument,
  OrderFormAddItemMutation,
  OrderFormAddItemMutationVariables,
  OrderFormAddSellerCouponDocument,
  OrderFormAddSellerCouponMutation,
  OrderFormAddSellerCouponMutationVariables,
  OrderFormDocument,
  OrderFormQuery,
  OrderFormQueryVariables,
  OrderFormRefreshDataDocument,
  OrderFormRefreshDataMutation,
  OrderFormRefreshDataMutationVariables,
  OrderFormRemoveDiscountCouponDocument,
  OrderFormRemoveDiscountCouponMutation,
  OrderFormRemoveDiscountCouponMutationVariables,
  OrderFormRemoveGiftDocument,
  OrderFormRemoveGiftMutation,
  OrderFormRemoveGiftMutationVariables,
  OrderFormRemoveSellerCouponDocument,
  OrderFormRemoveSellerCouponMutation,
  OrderFormRemoveSellerCouponMutationVariables,
  OrderFormRemoveUnavailableItemsDocument,
  OrderFormRemoveUnavailableItemsMutation,
  OrderFormRemoveUnavailableItemsMutationVariables,
  OrderFormSetGiftSizeDocument,
  OrderFormSetGiftSizeMutation,
  OrderFormSetGiftSizeMutationVariables,
  OrderFormUpdateItemDocument,
  OrderFormUpdateItemMutation,
  OrderFormUpdateItemMutationVariables,
} from '../../base/graphql/generated';
import { getAsyncStorageItem } from '../../hooks/useAsyncStorageProvider';
import { getMessageErrorWhenUpdateItem } from './helpers/getMessageErrorWhenUpdateItem';

const bagStore = create<IBagStore>((set, getState): IBagStore => ({
  initialized: false,
  topBarLoading: false,
  loadingModal: false,
  initialLoad: false,
  productNotFound: '',
  error: '',
  deleteProductModal: {
    show: false,
    deleteInfo: undefined,
  },
  //
  orderFormId: '',
  messages: [],
  clientProfileData: undefined,
  items: [],
  selectableGift: undefined,
  marketingData: undefined,
  shippingData: undefined,
  appTotalizers: {
    delivery: 0,
    discount: 0,
    items: 0,
    total: 0,
  },
  installmentInfo: {
    installmentPrice: 0,
    installmentsNumber: 0,
    totalPrice: 0,
  },
  allItemsQuantity: 0,
  hasPrimeSubscriptionInCart: false,
  //
  currentSelectedGiftSize: '',
  currentSelectedColorGift: '',
  actions: {
    INITIAL_LOAD: async () => {
      try {
        if (getState().initialized) return;

        const orderFormId = await getAsyncStorageItem('orderFormId') || '';

        if (!orderFormId) {
          throw new Error('OrderForm inválido.');
        }

        set(() => ({ initialLoad: true }));

        const { data } = await getApolloClient().query<OrderFormQuery, OrderFormQueryVariables>({
          query: OrderFormDocument,
          fetchPolicy: 'no-cache',
          variables: { orderFormId },
          context: { clientName: 'gateway' },
        });

        const { orderForm } = data;

        if (!orderForm) {
          throw new Error('OrderForm inválido.');
        }

        set(() => ({
          orderFormId,
          messages: orderForm.messages,
          clientProfileData: orderForm.clientProfileData,
          items: orderForm.items,
          selectableGift: orderForm.selectableGift,
          marketingData: orderForm.marketingData,
          shippingData: orderForm.shippingData,
          appTotalizers: orderForm.appTotalizers,
          installmentInfo: orderForm.installmentInfo,
          allItemsQuantity: orderForm.allItemsQuantity,
          hasPrimeSubscriptionInCart: orderForm.hasPrimeSubscriptionInCart,
        }));
      } catch (error) {
        set(() => ({ error: error.message }));
      } finally {
        set(() => ({ initialLoad: false, initialized: true }));
      }
    },
    REFETCH_ORDER_FORM: async () => {
      try {
        const orderFormId = await getAsyncStorageItem('orderFormId') || '';

        set(() => ({ topBarLoading: true }));

        const { data } = await getApolloClient().query<OrderFormQuery, OrderFormQueryVariables>({
          query: OrderFormDocument,
          fetchPolicy: 'no-cache',
          variables: { orderFormId },
          context: { clientName: 'gateway' },
        });

        const { orderForm } = data;

        if (!orderForm) {
          throw new Error('OrderForm inválido.');
        }

        set(() => ({
          orderFormId,
          messages: orderForm.messages,
          clientProfileData: orderForm.clientProfileData,
          items: orderForm.items,
          selectableGift: orderForm.selectableGift,
          marketingData: orderForm.marketingData,
          shippingData: orderForm.shippingData,
          appTotalizers: orderForm.appTotalizers,
          installmentInfo: orderForm.installmentInfo,
          allItemsQuantity: orderForm.allItemsQuantity,
          hasPrimeSubscriptionInCart: orderForm.hasPrimeSubscriptionInCart,
          initialized: true,
          topBarLoading: false,
        }));
      } catch (error) {
        set(() => ({ error: error.message }));
      } finally {
        set(() => ({ topBarLoading: false, initialized: true }));
      }
    },
    REFRESH_ORDER_FORM: async () => {
      try {
        set(() => ({ topBarLoading: true }));

        const { data } = await getApolloClient().query<
        OrderFormRefreshDataMutation,
        OrderFormRefreshDataMutationVariables
        >({
          query: OrderFormRefreshDataDocument,
          fetchPolicy: 'no-cache',
          variables: {
            input: { orderFormId: getState().orderFormId },
          },
          context: { clientName: 'gateway' },
        });

        const { orderFormRefreshData: orderForm } = data;

        set(() => ({
          clientProfileData: orderForm.clientProfileData,
          items: orderForm.items,
          marketingData: orderForm.marketingData,
          shippingData: orderForm.shippingData,
          installmentInfo: orderForm.installmentInfo,
          appTotalizers: orderForm.appTotalizers,
          allItemsQuantity: orderForm.allItemsQuantity,
        }));
      } catch (error) {
        set(() => ({ error: error.message }));
      } finally {
        set(() => ({ topBarLoading: false }));
      }
    },
    ADD_SELLER_COUPON: async (sellerCoupon: string) => {
      try {
        set(() => ({ topBarLoading: true }));

        const { data } = await getApolloClient().mutate<
        OrderFormAddSellerCouponMutation,
        OrderFormAddSellerCouponMutationVariables
        >({
          mutation: OrderFormAddSellerCouponDocument,
          context: { clientName: 'gateway' },
          variables: {
            coupon: sellerCoupon,
            orderFormId: getState().orderFormId,
          },
        });

        const { orderFormAddSellerCoupon: orderForm } = data || {};

        if (!orderForm) {
          throw new Error('Cupom inválido.');
        }

        set(() => ({
          marketingData: orderForm.marketingData,
          appTotalizers: orderForm.appTotalizers,
          installmentInfo: orderForm.installmentInfo,
          allItemsQuantity: orderForm.allItemsQuantity,
        }));
      } catch (error) {
        set(() => ({ error: error.message }));

        throw new Error(error.message);
      } finally {
        set(() => ({ topBarLoading: false }));
      }
    },
    ADD_DISCOUNT_COUPON: async (coupon: string) => {
      try {
        set(() => ({ topBarLoading: true }));

        const { data } = await getApolloClient().mutate<
        OrderFormAddDiscountCouponMutation,
        OrderFormAddDiscountCouponMutationVariables
        >({
          mutation: OrderFormAddDiscountCouponDocument,
          variables: {
            orderFormId: getState().orderFormId,
            coupon,
          },
          context: { clientName: 'gateway' },
        });

        const { orderFormAddDiscountCoupon: orderForm } = data || {};

        const isInvalidCoupon = orderForm?.messages.find((item) => (
          item.includes(coupon) && item.includes('inválido')
        ));

        if (isInvalidCoupon) {
          throw new Error('Cupom inválido.');
        }

        set(() => ({
          marketingData: orderForm?.marketingData,
          appTotalizers: orderForm?.appTotalizers,
          installmentInfo: orderForm?.installmentInfo,
          allItemsQuantity: orderForm?.allItemsQuantity,
        }));
      } catch (error) {
        set(() => ({ error: error.message }));

        throw new Error(error.message);
      } finally {
        set(() => ({ topBarLoading: false }));
      }
    },
    REMOVE_SELLER_COUPON: async () => {
      try {
        set(() => ({ topBarLoading: true }));

        const { data } = await getApolloClient().mutate<
        OrderFormRemoveSellerCouponMutation,
        OrderFormRemoveSellerCouponMutationVariables
        >({
          mutation: OrderFormRemoveSellerCouponDocument,
          variables: { orderFormId: getState().orderFormId },
          context: { clientName: 'gateway' },
        });

        const { orderFormRemoveSellerCoupon: orderForm } = data || {};

        set(() => ({
          marketingData: {
            ...getState().marketingData,
            sellerCoupon: '',
            sellerCouponName: '',
          },
          appTotalizers: orderForm?.appTotalizers,
          installmentInfo: orderForm?.installmentInfo,
          allItemsQuantity: orderForm?.allItemsQuantity,
        }));
      } catch (error) {
        set(() => ({ error: error.message }));
      } finally {
        set(() => ({ topBarLoading: false }));
      }
    },
    REMOVE_DISCOUNT_COUPON: async () => {
      try {
        set(() => ({ topBarLoading: true }));

        const { data } = await getApolloClient().mutate<
        OrderFormRemoveDiscountCouponMutation,
        OrderFormRemoveDiscountCouponMutationVariables
        >({
          mutation: OrderFormRemoveDiscountCouponDocument,
          variables: { orderFormId: getState().orderFormId },
          context: { clientName: 'gateway' },
        });

        const { orderFormRemoveDiscountCoupon: orderForm } = data || {};

        set(() => ({
          marketingData: {
            ...getState().marketingData,
            coupon: '',
          },
          appTotalizers: orderForm?.appTotalizers,
          installmentInfo: orderForm?.installmentInfo,
          allItemsQuantity: orderForm?.allItemsQuantity,
        }));
      } catch (error) {
        set(() => ({ error: error.message }));
      } finally {
        set(() => ({ topBarLoading: false }));
      }
    },
    ADD_AVAILABLE_GIFT: async (gift, giftId) => {
      try {
        set(() => ({ topBarLoading: true }));

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
            orderFormId: getState().orderFormId,
          },
          context: { clientName: 'gateway' },
        });

        const { orderFormSetGiftSize: orderForm } = data || {};

        set({
          marketingData: orderForm.marketingData,
          appTotalizers: orderForm.appTotalizers,
          installmentInfo: orderForm.installmentInfo,
          allItemsQuantity: orderForm.allItemsQuantity,
          items: orderForm.items,
          selectableGift: orderForm.selectableGift,
        });
      } catch (error) {
        set(() => ({ error: error.message }));
      } finally {
        set(() => ({ topBarLoading: false }));
      }
    },
    REMOVE_UNAVAILABLE_ITEMS: async () => {
      try {
        set(() => ({ topBarLoading: true }));

        await getApolloClient().mutate<
        OrderFormRemoveUnavailableItemsMutation,
        OrderFormRemoveUnavailableItemsMutationVariables
        >({
          mutation: OrderFormRemoveUnavailableItemsDocument,
          context: { clientName: 'gateway' },
          variables: { orderFormId: getState().orderFormId },
        });
      } catch (error) {
        //
      } finally {
        set(() => ({ topBarLoading: false }));
      }
    },
    UPDATE_PRODUCT_COUNT: async (index, item, countUpdated) => {
      try {
        set(() => ({ topBarLoading: true }));

        let errorsMessages = '';

        const { data } = await getApolloClient().mutate<
        OrderFormUpdateItemMutation,
        OrderFormUpdateItemMutationVariables
        >({
          mutation: OrderFormUpdateItemDocument,
          variables: {
            orderFormId: getState().orderFormId,
            index,
            id: item.id,
            seller: item.seller,
            quantity: item.isAssinaturaSimples ? 1 : countUpdated,
          },
          context: { clientName: 'gateway' },
        });

        const { orderFormUpdateItem: orderForm } = data || {};

        if (orderForm?.messages?.length) {
          errorsMessages = getMessageErrorWhenUpdateItem({
            currentItem: item,
            updateItemResponse: data?.orderFormUpdateItem,
            currentUpdateValueItem: countUpdated,
            appTotalizers: orderForm.appTotalizers,
          });
        }

        set(() => ({
          items: orderForm?.items,
          selectableGift: orderForm?.selectableGift,
          marketingData: orderForm?.marketingData,
          appTotalizers: orderForm?.appTotalizers,
          installmentInfo: orderForm?.installmentInfo,
          allItemsQuantity: orderForm?.allItemsQuantity,
          deleteProductModal: {
            show: false,
            deleteInfo: undefined,
          },
          productNotFound: errorsMessages,
          hasPrimeSubscriptionInCart: orderForm?.hasPrimeSubscriptionInCart,
        }));
      } catch (error) {
        set(() => ({ error: error.message }));
      } finally {
        set(() => ({ topBarLoading: false }));
      }
    },
    ADD_GIFT: async (index, id) => {
      try {
        set(() => ({ topBarLoading: true }));

        const { data } = await getApolloClient().mutate<
        OrderFormAddGiftMutation,
        OrderFormAddGiftMutationVariables
        >({
          mutation: OrderFormAddGiftDocument,
          context: { clientName: 'gateway' },
          variables: {
            orderFormId: getState().orderFormId,
            index,
            id,
          },
        });

        set(() => ({ items: data?.orderFormAddGift.items }));
      } catch (error) {
        set(() => ({ error: error.message }));
      } finally {
        set(() => ({ topBarLoading: false }));
      }
    },
    REMOVE_GIFT: async (index, id) => {
      try {
        const { data } = await getApolloClient().mutate<
        OrderFormRemoveGiftMutation,
        OrderFormRemoveGiftMutationVariables
        >({
          mutation: OrderFormRemoveGiftDocument,
          context: { clientName: 'gateway' },
          variables: {
            orderFormId: getState().orderFormId,
            index,
            id,
          },
        });

        set(() => ({ items: data?.orderFormRemoveGift.items }));
      } catch (error) {
        set(() => ({ error: error.message }));
      } finally {
        set(() => ({ topBarLoading: false }));
      }
    },
    ACTIVE_MODAL_DELETE_PRODUCT: async (product, index) => {
      set(() => ({
        deleteProductModal: {
          show: true,
          deleteInfo: { product, index },
        },
      }));
    },
    CLOSE_MODAL_DELETE_PRODUCT: async () => {
      set(() => ({ deleteProductModal: { show: false, deleteInfo: undefined } }));
    },
    SELECT_GIFT_COLOR: (giftColor) => {
      set(() => ({ currentSelectedColorGift: giftColor }));
    },
    SELECT_GIFT_SIZE: (giftSize) => {
      set(() => ({ currentSelectedGiftSize: giftSize }));
    },
    SELECT_GIFT: (color, size) => {
      set(() => ({
        currentSelectedColorGift: color,
        currentSelectedGiftSize: size,
      }));
    },
    CLEAR_PRODUCT_NOT_FOUND: () => {
      set(() => ({
        productNotFound: '',
      }));
    },
    ADD_ITEM: async (seller, id, quantity) => {
      try {
        set(() => ({ topBarLoading: true }));

        const { data } = await getApolloClient().mutate<
        OrderFormAddItemMutation,
        OrderFormAddItemMutationVariables
        >({
          mutation: OrderFormAddItemDocument,
          context: { clientName: 'gateway' },
          variables: {
            input: {
              orderFormId: getState().orderFormId,
              seller,
              id,
              quantity,
            },
          },
        });

        const { orderFormAddItem: orderForm } = data || {};

        set(() => ({
          items: orderForm?.items,
          selectableGift: orderForm?.selectableGift,
          marketingData: orderForm?.marketingData,
          appTotalizers: orderForm?.appTotalizers,
          installmentInfo: orderForm?.installmentInfo,
          allItemsQuantity: orderForm?.allItemsQuantity,
          deleteProductModal: {
            show: false,
            deleteInfo: undefined,
          },
          hasPrimeSubscriptionInCart: orderForm?.hasPrimeSubscriptionInCart,
        }));
      } catch (error) {
        set(() => ({ error: error.message }));

        throw new Error(error.message);
      } finally {
        set(() => ({ topBarLoading: false }));
      }
    },
  },
}));

export const useBagStore = createZustandStoreWithSelectors(bagStore);
