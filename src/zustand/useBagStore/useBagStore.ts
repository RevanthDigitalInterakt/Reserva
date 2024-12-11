import { create } from 'zustand';
import {
  AddressTypeEnum,
  DeliveryChannelEnum,
  OrderFormAddDiscountCouponDocument,
  OrderFormAddGiftDocument,
  OrderFormAddItemDocument,
  OrderFormAddMultipleItemDocument,
  OrderFormAddSellerCouponDocument,
  OrderFormDocument,
  OrderFormRefreshDataDocument,
  OrderFormRemoveDiscountCouponDocument,
  OrderFormRemoveGiftDocument,
  OrderFormRemoveSellerCouponDocument,
  OrderFormRemoveUnavailableItemsDocument,
  OrderFormResetDocument,
  OrderFormSelectAddressDocument,
  OrderFormSetGiftSizeDocument,
  OrderFormUpdateItemDocument,
  ProductResultActionEnum,
  type OrderFormAddDiscountCouponMutation,
  type OrderFormAddDiscountCouponMutationVariables,
  type OrderFormAddGiftMutation,
  type OrderFormAddGiftMutationVariables,
  type OrderFormAddItemMutation,
  type OrderFormAddItemMutationVariables,
  type OrderFormAddMultipleItemMutation,
  type OrderFormAddMultipleItemMutationVariables,
  type OrderFormAddSellerCouponMutation,
  type OrderFormAddSellerCouponMutationVariables,
  type OrderFormQuery,
  type OrderFormQueryVariables,
  type OrderFormRefreshDataMutation,
  type OrderFormRefreshDataMutationVariables,
  type OrderFormRemoveDiscountCouponMutation,
  type OrderFormRemoveDiscountCouponMutationVariables,
  type OrderFormRemoveGiftMutation,
  type OrderFormRemoveGiftMutationVariables,
  type OrderFormRemoveSellerCouponMutation,
  type OrderFormRemoveSellerCouponMutationVariables,
  type OrderFormRemoveUnavailableItemsMutation,
  type OrderFormRemoveUnavailableItemsMutationVariables,
  type OrderFormResetMutation,
  type OrderFormResetMutationVariables,
  type OrderFormSelectAddressMutation,
  type OrderFormSelectAddressMutationVariables,
  type OrderFormSetGiftSizeMutation,
  type OrderFormSetGiftSizeMutationVariables,
  type OrderFormUpdateItemMutation,
  type OrderFormUpdateItemMutationVariables,
  type OrderformLogisticsInfoInput,
  type OrderformPackageItemsOutput,
} from '../../base/graphql/generated';
import { createZustandStoreWithSelectors } from '../../utils/createZustandStoreWithSelectors';
import { getApolloClient } from '../../utils/getApolloClient';
import type { IBagStore } from './types/bagStore';
import { ExceptionProvider } from '../../base/providers/ExceptionProvider';
import { getAsyncStorageItem, setAsyncStorageItem } from '../../hooks/useAsyncStorageProvider';
import { handleCopyTextToClipboard } from '../../utils/CopyToClipboard';
import { mergeItemsPackage } from '../../utils/mergeItemsPackage';
import { trackEventDitoStatusCart } from '../../utils/trackEventDitoStatusCart';
import { trackingOrderFormAddItem } from '../../utils/trackingOrderFormAddItem';
import { productDetailStore } from '../useProductDetail/useProductDetail';
import { getMessageErrorWhenUpdateItem } from './helpers/getMessageErrorWhenUpdateItem';

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
  packageItems: [{ items: [], totalShippingValue: 0 }],
  deliveryType: {
    type: '',
  },
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
  prime: {
    total: 0,
    totalDiscount: 0,
    renderApp: true,
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

        // TODO move to api-gateway
        orderForm.packageItems = orderForm.packageItems.map((subPackage) => {
          subPackage.items.map((item) => {
            if (item.productCategories.includes('Cartão Presente')) {
              item.itemColor = '';
              return item;
            }
            return item;
          });
          return subPackage;
        });

        set(() => ({
          orderFormId: orderForm.orderFormId,
          messages: orderForm.messages,
          clientProfileData: orderForm.clientProfileData,
          packageItems: orderForm.packageItems,
          selectableGift: orderForm.selectableGift,
          marketingData: orderForm.marketingData,
          shippingData: orderForm.shippingData,
          appTotalizers: orderForm.appTotalizers,
          installmentInfo: orderForm.installmentInfo,
          allItemsQuantity: orderForm.allItemsQuantity,
          hasPrimeSubscriptionInCart: orderForm.hasPrimeSubscriptionInCart,
          prime: orderForm.prime,
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

        // TODO move to api-gateway
        orderForm.packageItems = orderForm.packageItems.map((subPackage) => {
          subPackage.items.map((item) => {
            if (item.productCategories.includes('Cartão Presente')) {
              item.itemColor = '';
              return item;
            }
            return item;
          });
          return subPackage;
        });

        set(() => ({
          orderFormId: orderForm.orderFormId,
          messages: orderForm.messages,
          clientProfileData: orderForm.clientProfileData,
          packageItems: orderForm.packageItems,
          selectableGift: orderForm.selectableGift,
          marketingData: orderForm.marketingData,
          shippingData: orderForm.shippingData,
          appTotalizers: orderForm.appTotalizers,
          installmentInfo: orderForm.installmentInfo,
          allItemsQuantity: orderForm.allItemsQuantity,
          hasPrimeSubscriptionInCart: orderForm.hasPrimeSubscriptionInCart,
          prime: orderForm.prime,
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

        // TODO move to api-gateway
        orderForm.packageItems = orderForm.packageItems.map((subPackage) => {
          subPackage.items.map((item) => {
            if (item.productCategories.includes('Cartão Presente')) {
              item.itemColor = '';
              return item;
            }
            return item;
          });
          return subPackage;
        });

        set(() => ({
          clientProfileData: orderForm.clientProfileData,
          packageItems: orderForm.packageItems,
          marketingData: orderForm.marketingData,
          shippingData: orderForm.shippingData,
          installmentInfo: orderForm.installmentInfo,
          appTotalizers: orderForm.appTotalizers,
          allItemsQuantity: orderForm.allItemsQuantity,
          prime: orderForm.prime,
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

        // TODO move to api-gateway
        orderForm.packageItems = orderForm.packageItems.map((subPackage) => {
          subPackage.items.map((item) => {
            if (item.productCategories.includes('Cartão Presente')) {
              item.itemColor = '';
              return item;
            }
            return item;
          });
          return subPackage;
        });

        set(() => ({
          clientProfileData: orderForm.clientProfileData,
          packageItems: orderForm.packageItems,
          marketingData: orderForm.marketingData,
          shippingData: orderForm.shippingData,
          installmentInfo: orderForm.installmentInfo,
          appTotalizers: orderForm.appTotalizers,
          allItemsQuantity: orderForm.allItemsQuantity,
          prime: orderForm.prime,
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

        // TODO move to api-gateway
        orderForm.packageItems = orderForm.packageItems.map((subPackage) => {
          subPackage.items.map((item) => {
            if (item.productCategories.includes('Cartão Presente')) {
              item.itemColor = '';
              return item;
            }
            return item;
          });
          return subPackage;
        });

        set(() => ({
          orderFormId: orderForm.orderFormId,
          messages: orderForm.messages,
          clientProfileData: orderForm.clientProfileData,
          packageItems: orderForm.packageItems,
          selectableGift: orderForm.selectableGift,
          marketingData: orderForm.marketingData,
          shippingData: orderForm.shippingData,
          appTotalizers: orderForm.appTotalizers,
          installmentInfo: orderForm.installmentInfo,
          allItemsQuantity: orderForm.allItemsQuantity,
          hasPrimeSubscriptionInCart: orderForm.hasPrimeSubscriptionInCart,
          prime: orderForm.prime,
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

        // TODO move to api-gateway
        orderForm.packageItems = orderForm.packageItems.map((subPackage) => {
          subPackage.items.map((item) => {
            if (item.productCategories.includes('Cartão Presente')) {
              item.itemColor = '';
              return item;
            }
            return item;
          });
          return subPackage;
        });

        set(() => ({
          marketingData: orderForm.marketingData,
          appTotalizers: orderForm.appTotalizers,
          installmentInfo: orderForm.installmentInfo,
          allItemsQuantity: orderForm.allItemsQuantity,
          packageItems: orderForm.packageItems,
          prime: orderForm.prime,
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
          packageItems: orderForm?.packageItems || [{ items: [], totalShippingValue: 0 }],
          prime: orderForm?.prime,
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
          packageItems: orderForm?.packageItems || [{ items: [], totalShippingValue: 0 }],
          appTotalizers: orderForm?.appTotalizers,
          installmentInfo: orderForm?.installmentInfo,
          allItemsQuantity: orderForm?.allItemsQuantity,
          prime: orderForm?.prime,
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
          packageItems: orderForm?.packageItems || [{ items: [], totalShippingValue: 0 }],
          appTotalizers: orderForm?.appTotalizers,
          installmentInfo: orderForm?.installmentInfo,
          allItemsQuantity: orderForm?.allItemsQuantity,
          prime: orderForm?.prime,
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
          packageItems: orderForm?.packageItems || [{ items: [], totalShippingValue: 0 }],
          selectableGift: orderForm.selectableGift,
          prime: orderForm?.prime,
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
        set(() => ({ error: error.message }));
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

        const mergeItems = mergeItemsPackage(
          orderForm?.packageItems || [{ items: [], totalShippingValue: 0 }],
        ) as OrderformPackageItemsOutput['items'] | [];

        if (orderForm?.messages?.length) {
          errorsMessages = getMessageErrorWhenUpdateItem({
            currentItem: item,
            mergeItems,
            updateItemResponse: orderForm,
            currentUpdateValueItem: countUpdated,
            appTotalizers: orderForm.appTotalizers,
          });
        }

        set(() => ({
          packageItems: orderForm?.packageItems.map((subPackage) => {
            subPackage.items.map((packageItem) => {
              if (packageItem.productCategories.includes('Cartão Presente')) {
                packageItem.itemColor = '';
                return packageItem;
              }
              return packageItem;
            });
            return subPackage;
          }) || [{ items: [], totalShippingValue: 0 }],
          selectableGift: orderForm?.selectableGift,
          marketingData: orderForm?.marketingData,
          appTotalizers: orderForm?.appTotalizers,
          installmentInfo: orderForm?.installmentInfo,
          allItemsQuantity: orderForm?.allItemsQuantity,
          prime: orderForm?.prime,
          deleteProductModal: {
            show: false,
            deleteInfo: undefined,
          },
          productNotFound: errorsMessages,
          hasPrimeSubscriptionInCart: orderForm?.hasPrimeSubscriptionInCart,
        }));

        await trackEventDitoStatusCart({
          items: mergeItems,
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

        set(() => ({
          packageItems: data?.orderFormAddGift.packageItems,
          prime: data?.orderFormAddGift?.prime,
        }));
      } catch (error) {
        set(() => ({ error: error.message }));
      } finally {
        set(() => ({ topBarLoading: false }));
      }
    },

    REMOVE_GIFT: async (index, id) => {
      try {
        set(() => ({ topBarLoading: true }));

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

        set(() => ({
          packageItems: data?.orderFormRemoveGift.packageItems,
          prime: data?.orderFormRemoveGift?.prime,
        }));
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

        const { orderFormAddItem: orderForm } = data || {};

        set(() => ({
          packageItems: orderForm?.packageItems.map((subPackage) => {
            subPackage.items.map((packageItem) => {
              if (packageItem.productCategories.includes('Cartão Presente')) {
                packageItem.itemColor = '';
                return packageItem;
              }
              return packageItem;
            });
            return subPackage;
          }) || [{ items: [], totalShippingValue: 0 }],
          selectableGift: orderForm?.selectableGift,
          marketingData: orderForm?.marketingData,
          appTotalizers: orderForm?.appTotalizers,
          installmentInfo: orderForm?.installmentInfo,
          allItemsQuantity: orderForm?.allItemsQuantity,
          prime: orderForm?.prime,
          deleteProductModal: {
            show: false,
            deleteInfo: undefined,
          },
          hasPrimeSubscriptionInCart: orderForm?.hasPrimeSubscriptionInCart,
        }));

        await trackingOrderFormAddItem({ id, orderForm, productDetail });
      } catch (error) {
        ExceptionProvider.captureException(error);
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
        const { data } = await getApolloClient().mutate<
        OrderFormAddMultipleItemMutation,
        OrderFormAddMultipleItemMutationVariables>({
          mutation: OrderFormAddMultipleItemDocument,
          context: { clientName: 'gateway' },
          variables: {
            input,
          },
        });

        const { orderFormAddMultipleItem: orderForm } = data || {};

        set(() => ({
          packageItems: orderForm?.packageItems.map((subPackage) => {
            subPackage.items.map((packageItem) => {
              if (packageItem.productCategories.includes('Cartão Presente')) {
                packageItem.itemColor = '';
                return packageItem;
              }
              return packageItem;
            });
            return subPackage;
          }) || [{ items: [], totalShippingValue: 0 }],
          selectableGift: orderForm?.selectableGift,
          marketingData: orderForm?.marketingData,
          appTotalizers: orderForm?.appTotalizers,
          installmentInfo: orderForm?.installmentInfo,
          allItemsQuantity: orderForm?.allItemsQuantity,
          prime: orderForm?.prime,
          deleteProductModal: {
            show: false,
            deleteInfo: undefined,
          },
          hasPrimeSubscriptionInCart: orderForm?.hasPrimeSubscriptionInCart,
        }));

        await trackingOrderFormAddItem({ id: orderItems?.orderFormId, orderForm, productDetail });
      } catch (error) {
        set(() => ({ error: error.message }));

        throw new Error(error.message);
      } finally {
        set(() => ({ topBarLoading: false }));
      }
    },

    ADD_DELIVERY_TO_RESIDENCE: async (deliveryOptions, address) => {
      try {
        set(() => ({ topBarLoading: true }));

        const { orderFormId } = getState();

        const deliveryOptionsPickUp = deliveryOptions.map((option) => ({
          itemIndex: option.itemIndex,
          selectedSla: option.selectedSla,
          selectedDeliveryChannel: DeliveryChannelEnum.Delivery,
        }));

        const { data } = await getApolloClient().mutate<
        OrderFormSelectAddressMutation,
        OrderFormSelectAddressMutationVariables
        >({
          mutation: OrderFormSelectAddressDocument,
          context: { clientName: 'gateway' },
          variables: {
            input: {
              orderFormId,
              deliveryOptions: deliveryOptionsPickUp,
              addressType: AddressTypeEnum.Residential,
              addressId: address?.addressId,
              cep: address?.postalCode,
              street: address?.street,
              neighborhood: address?.neighborhood,
              city: address?.city,
              state: address?.state,
              complement: address?.complement,
              number: address?.number,
            },
          },
        });

        const { orderFormSelectAddress: orderForm } = data || {};

        set(() => ({
          packageItems: orderForm?.packageItems.map((subPackage) => {
            subPackage.items.map((packageItem) => {
              if (packageItem.productCategories.includes('Cartão Presente')) {
                packageItem.itemColor = '';
                return packageItem;
              }
              return packageItem;
            });
            return subPackage;
          }) || [{ items: [], totalShippingValue: 0 }],
          selectableGift: orderForm?.selectableGift,
          marketingData: orderForm?.marketingData,
          appTotalizers: orderForm?.appTotalizers,
          installmentInfo: orderForm?.installmentInfo,
          allItemsQuantity: orderForm?.allItemsQuantity,
          prime: orderForm?.prime,
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

    ADD_DELIVERY_TO_PICKUP_IN_POINT: async (
      deliveryOptionsStore,
      storeAddress,
    ) => {
      try {
        set(() => ({ topBarLoading: true }));

        const { orderFormId, packageItems } = getState();

        const IndexIds = deliveryOptionsStore.map((item) => item.itemIndex);

        const newDeliveryOptionsStore = deliveryOptionsStore.map((item) => ({
          itemIndex: item.itemIndex,
          selectedSla: item.selectedSla,
          selectedDeliveryChannel: item.selectedDeliveryChannel,
        }));

        const mergeItems = mergeItemsPackage(packageItems);

        const deliveryOptionsPickUp = mergeItems.map((item) => {
          if (!IndexIds.includes(String(item.index))) {
            return ({
              itemIndex: String(item.index),
              selectedSla: `Retire em Loja (${storeAddress?.addressId})`,
              selectedDeliveryChannel: DeliveryChannelEnum.PickupInPoint,
            });
          }
          return null;
        }).filter(Boolean) as OrderformLogisticsInfoInput[];

        const deliveryOptions = [...deliveryOptionsPickUp, ...newDeliveryOptionsStore];

        const { data } = await getApolloClient().mutate<
        OrderFormSelectAddressMutation,
        OrderFormSelectAddressMutationVariables
        >({
          mutation: OrderFormSelectAddressDocument,
          context: { clientName: 'gateway' },
          variables: {
            input: {
              orderFormId,
              deliveryOptions,
              addressType: AddressTypeEnum.Pickup,
              addressId: storeAddress?.addressId,
              cep: storeAddress?.postalCode,
              street: storeAddress?.street,
              neighborhood: storeAddress?.neighborhood,
              city: storeAddress?.city,
              state: storeAddress?.state,
              complement: storeAddress?.complement,
              number: storeAddress?.number,
            },
          },
        });

        const { orderFormSelectAddress: orderForm } = data || {};

        set(() => ({
          packageItems: orderForm?.packageItems.map((subPackage) => {
            subPackage.items.map((packageItem) => {
              if (packageItem.productCategories.includes('Cartão Presente')) {
                packageItem.itemColor = '';
                return packageItem;
              }
              return packageItem;
            });
            return subPackage;
          }) || [],
          selectableGift: orderForm?.selectableGift,
          marketingData: orderForm?.marketingData,
          appTotalizers: orderForm?.appTotalizers,
          installmentInfo: orderForm?.installmentInfo,
          allItemsQuantity: orderForm?.allItemsQuantity,
          prime: orderForm?.prime,
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
    ADD_DELIVERY_TYPE: (type: string, store?: string) => {
      set(() => ({ deliveryType: { type, store } }));
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
