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
  OrderFormResetDocument,
  OrderFormResetMutation,
  OrderFormResetMutationVariables,
  OrderFormSetGiftSizeDocument,
  OrderFormSetGiftSizeMutation,
  OrderFormSetGiftSizeMutationVariables,
  OrderFormUpdateItemDocument,
  OrderFormUpdateItemMutation,
  OrderFormUpdateItemMutationVariables,
  ProductResultActionEnum,
  type OrderFormAddMultipleItemMutation,
  type OrderFormAddMultipleItemMutationVariables,
  OrderFormAddMultipleItemDocument,
} from '../../base/graphql/generated';
import { getAsyncStorageItem, setAsyncStorageItem } from '../../hooks/useAsyncStorageProvider';
import { getMessageErrorWhenUpdateItem } from './helpers/getMessageErrorWhenUpdateItem';
import { trackingOrderFormAddItem } from '../../utils/trackingOrderFormAddItem';
import { handleCopyTextToClipboard } from '../../utils/CopyToClipboard';
import { ExceptionProvider } from '../../base/providers/ExceptionProvider';
import { trackEventDitoStatusCart } from '../../utils/trackEventDitoStatusCart';
import { productDetailStore } from '../useProductDetail/useProductDetail';

const bagStore = create<IBagStore>((set, getState): IBagStore => ({
  initialized: false,
  topBarLoading: false,
  loadingModal: false,
  rouletCoupon: {
    code: null,
    timestamp: null,
    blocked: false,
  },
  rouletIsOpen: false,
  rouletIsLoading: false,
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

        orderForm.items = orderForm.items.map((item) => {
          if (item.productCategories.includes('Cartão Presente')) {
            item.itemColor = '';
            return item;
          }
          return item;
        });

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

        orderForm.items = orderForm.items.map((item) => {
          if (item.productCategories.includes('Cartão Presente')) {
            item.itemColor = '';
            return item;
          }
          return item;
        });

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
    ROULET_COUPON_INITIAL_LOAD: async () => {
      const rouletCoupon = await getAsyncStorageItem('rouletCoupon');

      if (rouletCoupon) {
        const { code, timestamp } = rouletCoupon;
        set(() => ({
          rouletCoupon: {
            code,
            timestamp,
            blocked: false,
          },
        }));
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

        orderForm.items = orderForm.items.map((item) => {
          if (item.productCategories.includes('Cartão Presente')) {
            item.itemColor = '';
            return item;
          }
          return item;
        });

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
    RESET_ORDER_FORM: async () => {
      try {
        set(() => ({ topBarLoading: true }));

        const { data } = await getApolloClient().query<
        OrderFormResetMutation,
        OrderFormResetMutationVariables
        >({
          query: OrderFormResetDocument,
          fetchPolicy: 'no-cache',
          variables: { orderFormId: getState().orderFormId },
          context: { clientName: 'gateway' },
        });

        const { orderFormReset: orderForm } = data;

        orderForm.items = orderForm.items.map((item) => {
          if (item.productCategories.includes('Cartão Presente')) {
            item.itemColor = '';
            return item;
          }
          return item;
        });

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
    CREATE_NEW_ORDER_FORM: async () => {
      try {
        set(() => ({ initialLoad: true }));

        const { data } = await getApolloClient().query<OrderFormQuery, OrderFormQueryVariables>({
          query: OrderFormDocument,
          fetchPolicy: 'no-cache',
          variables: { orderFormId: '' },
          context: { clientName: 'gateway' },
        });

        const { orderForm } = data;

        if (!orderForm) {
          throw new Error('OrderForm inválido.');
        }

        await setAsyncStorageItem('orderFormId', orderForm.orderFormId);

        orderForm.items = orderForm.items.map((item) => {
          if (item.productCategories.includes('Cartão Presente')) {
            item.itemColor = '';
            return item;
          }
          return item;
        });

        set(() => ({
          orderFormId: orderForm.orderFormId,
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
    COPY_ORDERFORM: () => {
      try {
        handleCopyTextToClipboard(getState().orderFormId);

        return true;
      } catch (err) {
        ExceptionProvider.captureException(err);

        return false;
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

        orderForm.items = orderForm.items.map((item) => {
          if (item.productCategories.includes('Cartão Presente')) {
            item.itemColor = '';
            return item;
          }
          return item;
        });

        set(() => ({
          marketingData: orderForm.marketingData,
          appTotalizers: orderForm.appTotalizers,
          installmentInfo: orderForm.installmentInfo,
          allItemsQuantity: orderForm.allItemsQuantity,
          items: orderForm.items,
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
          items: orderForm?.items || [],
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
          items: orderForm?.items || [],
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
          items: orderForm?.items || [],
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

        const isGiftCard = item.productCategories.includes('Cartão Presente');
        const handleQuantity = () => {
          if (isGiftCard) return countUpdated;
          if (item.isAssinaturaSimples && !isGiftCard) return 1;
          return countUpdated;
        };

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
            quantity: handleQuantity(),
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
          items: orderForm?.items.map((orderItem) => {
            if (orderItem.productCategories.includes('Cartão Presente')) {
              orderItem.itemColor = '';
              return orderItem;
            }
            return orderItem;
          }) || [],
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

        await trackEventDitoStatusCart({
          items: orderForm?.items,
          appTotalizers: orderForm?.appTotalizers,
          clientProfileData: orderForm?.clientProfileData,
        });
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

        const { selectedGiftCardEmail, productDetail } = productDetailStore.getState();
        const isGiftCard = productDetail?.action === ProductResultActionEnum.ShowGiftCard;
        let input = {
          orderFormId: getState().orderFormId,
          seller,
          id,
          quantity,
        };

        if (isGiftCard) {
          input = {
            ...input,
            giftCard: {
              email: selectedGiftCardEmail,
            },
          };
        }
        const { data } = await getApolloClient().mutate<
        OrderFormAddItemMutation,
        OrderFormAddItemMutationVariables
        >({
          mutation: OrderFormAddItemDocument,
          context: { clientName: 'gateway' },
          variables: {
            input,
          },
        });

        console.log('data', data);

        const { orderFormAddItem: orderForm } = data || {};

        set(() => ({
          items: orderForm?.items.map((item) => {
            if (item.productCategories.includes('Cartão Presente')) {
              item.itemColor = '';
              return item;
            }
            return item;
          }) || [],
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

        await trackingOrderFormAddItem(id, orderForm);
      } catch (error) {
        console.log('error', error);
        set(() => ({ error: error.message }));

        throw new Error(error.message);
      } finally {
        set(() => ({ topBarLoading: false }));
      }
    },

    ADD_MULTIPLE_ITEMS: async (orderItems) => {
      try {
        set(() => ({ topBarLoading: true }));

        if (!orderItems) return;

        const { selectedGiftCardEmail, productDetail } = productDetailStore.getState();
        const isGiftCard = productDetail?.action === ProductResultActionEnum.ShowGiftCard;

        const arrOrderItems = orderItems.orderItems.map((orderItem) => ({
          id: orderItem.id,
          quantity: orderItem.quantity,
          seller: orderItem.seller,
        }));

        let input = {
          orderFormId: getState().orderFormId,
          orderItems: arrOrderItems,
        };

        if (isGiftCard) {
          input = {
            ...input,
            giftCard: {
              email: selectedGiftCardEmail,
            },
          };
        }
        const { data } = await getApolloClient().mutate<OrderFormAddMultipleItemMutation,
        OrderFormAddMultipleItemMutationVariables>({
          mutation: OrderFormAddMultipleItemDocument,
          context: { clientName: 'gateway' },
          variables: {
            input,
          },
        });

        const { orderFormAddMultipleItem: orderForm } = data || {};

        set(() => ({
          items: orderForm?.items.map((item) => {
            if (item.productCategories.includes('Cartão Presente')) {
              item.itemColor = '';
              return item;
            }
            return item;
          }) || [],
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

        await trackingOrderFormAddItem(orderItems?.orderFormId, orderForm);
      } catch (error) {
        set(() => ({ error: error.message }));

        throw new Error(error.message);
      } finally {
        set(() => ({ topBarLoading: false }));
      }
    },
    SAVE_ROULET_COUPON: (coupon: string, timestamp: string) => {
      set(() => ({
        rouletCoupon: {
          code: coupon,
          timestamp,
          blocked: false,
        },
      }));
    },
    OPEN_ROULET: () => {
      set(() => ({ rouletIsOpen: true }));
    },
    CLOSE_ROULET: () => {
      set(() => ({ rouletIsOpen: false }));
    },
    SET_ROULET_LOADING: (value: boolean) => {
      set(() => ({ rouletIsLoading: value }));
    },
    BLOCK_ROULET_COUPON: () => {
      set(() => ({
        rouletCoupon: {
          ...getState().rouletCoupon,
          blocked: true,
        },
      }));
    },
    UNBLOCK_ROULET_COUPON: () => {
      set(() => ({
        rouletCoupon: {
          ...getState().rouletCoupon,
          blocked: false,
        },
      }));
    },
  },
}));

export const useBagStore = createZustandStoreWithSelectors(bagStore);
