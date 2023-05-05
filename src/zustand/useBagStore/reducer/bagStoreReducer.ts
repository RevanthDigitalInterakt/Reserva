import type { IBagStore, IPayloadBagDispatch } from '../types/bagStore';
import bagStoreMethods from './methods/bagStoreMethods';

const bagReducer = async (state: IBagStore,
  { actionType, payload }: IPayloadBagDispatch): Promise<IBagStore> => {
  switch (actionType) {
    case 'SET_TOP_BAR_LOADING':
      return bagStoreMethods.SET_TOP_BAR_LOADING(state, payload);
    case 'SET_PRODUCT_NOT_FOUND':
      return bagStoreMethods.SET_PRODUCT_NOT_FOUND(state, payload);
    case 'TOOGLE_MODALS':
      return bagStoreMethods.TOOGLE_MODALS(state, payload);
    case 'SET_CURRENT_ORDER_FORM':
      return bagStoreMethods.SET_CURRENT_ORDER_FORM(state, payload);
    case 'INITIAL_SET_ORDER_FORM':
      return bagStoreMethods.INITIAL_SET_ORDER_FORM(state, payload);
    case 'INITIAL_REFRESH_ORDER_FORM':
      return bagStoreMethods.INITIAL_REFRESH_ORDER_FORM(state, payload);
    case 'SET_SHIPPING_BAR_INFOS':
      return bagStoreMethods.SET_SHIPPING_BAR_INFOS(state, payload);
    case 'HANDLE_ADD_SELLER_COUPON':
      return bagStoreMethods.HANDLE_ADD_SELLER_COUPON(state, payload);
    case 'HANDLE_REMOVE_SELLER_COUPON':
      return bagStoreMethods.HANDLE_REMOVE_SELLER_COUPON(state, payload);
    case 'HANDLE_ADD_DISCOUNT_COUPON':
      return bagStoreMethods.HANDLE_ADD_DISCOUNT_COUPON(state, payload);
    case 'HANDLE_REMOVE_DISCOUNT_COUPON':
      return bagStoreMethods.HANDLE_REMOVE_DISCOUNT_COUPON(state, payload);
    case 'HANDLE_ADD_GIFT':
      return bagStoreMethods.HANDLE_ADD_GIFT(state, payload);
    case 'HANDLE_REMOVE_GIFT':
      return bagStoreMethods.HANDLE_REMOVE_GIFT(state, payload);
    case 'HANDLE_UPDATE_PRODUCT_COUNT':
      return bagStoreMethods.HANDLE_UPDATE_PRODUCT_COUNT(state, payload);
    case 'HANDLE_ACTIVE_MODAL_DELETE_PRODUCT':
      return bagStoreMethods.HANDLE_ACTIVE_MODAL_DELETE_PRODUCT(state, payload);
    case 'HANDLE_CLOSE_MODAL_DELETE_PRODUCT':
      return bagStoreMethods.HANDLE_CLOSE_MODAL_DELETE_PRODUCT(state, payload);
    case 'SET_INITIAL_LOAD':
      return bagStoreMethods.SET_INITIAL_LOAD(state, payload);
    case 'HANDLE_REMOVE_UNAVAILABLE_ITEMS':
      return bagStoreMethods.HANDLE_REMOVE_UNAVAILABLE_ITEMS(state, payload);
    case 'HANDLE_ADD_AVAILABLE_GIFT':
      return bagStoreMethods.HANDLE_ADD_AVAILABLE_GIFT(state, payload);
    case 'HANDLE_SELECT_GIFT_COLOR':
      return bagStoreMethods.HANDLE_SELECT_GIFT_COLOR(state, payload);
    case 'HANDLE_SELECT_GIFT_SIZE':
      return bagStoreMethods.HANDLE_SELECT_GIFT_SIZE(state, payload);
    case 'HANDLE_SELECT_GIFT_SIZE_AND_COLOR':
      return bagStoreMethods.HANDLE_SELECT_GIFT_SIZE_AND_COLOR(state, payload);
    default:
      return { ...state };
  }
};

export default bagReducer;
