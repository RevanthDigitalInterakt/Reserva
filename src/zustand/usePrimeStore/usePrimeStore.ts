import { create } from 'zustand';
import EventProvider from '../../utils/EventProvider';
import type { PrimeDetailOutput } from '../../base/graphql/generated';
import type { IAddItemDTO, TAddItemResponse } from '../../context/CartContext';
import { createZustandStoreWithSelectors } from '../../utils/createZustandStoreWithSelectors';

type TPrimeInformation = PrimeDetailOutput;
interface IParamsCheckbox {
  addItem: (dto: IAddItemDTO) => Promise<TAddItemResponse>;
  primeInformation: TPrimeInformation;
}
interface IPrimeStore {
  animationBag: boolean;
  loadingAddCartPrime: boolean;
  isVisibleModalWelcome: boolean;
  handleClickContinue: () => void;
  hasPrimeSubscriptionInCart: boolean;
  getHasSubscriptionPrimeInCart: (hasSubscription: boolean) => void;
  changeStateAnimationBag: (state: boolean) => void;
  handleAddToCartPrime: ({
    addItem, primeInformation,
  }: IParamsCheckbox) => Promise<void>;
}

export const primeStore = create<IPrimeStore>((_set, _getState) => ({
  animationBag: false,
  loadingAddCartPrime: false,
  isVisibleModalWelcome: false,
  hasPrimeSubscriptionInCart: false,
  handleAddToCartPrime: async ({
    addItem, primeInformation,
  }) => {
    const hasSubscriptionPrimeInCart = _getState().hasPrimeSubscriptionInCart;

    if (!hasSubscriptionPrimeInCart) {
      _set({ loadingAddCartPrime: true });

      await addItem({
        quantity: 1,
        itemId: `${primeInformation.skuId}`,
        seller: primeInformation.productSeller,
      });

      EventProvider.logEvent('add_to_cart_prime', {
        item_quantity: 1,
        item_id: `${primeInformation.skuId}`,
        seller: primeInformation.productSeller,
      });

      _set({ loadingAddCartPrime: false, animationBag: true, isVisibleModalWelcome: true });
    }
  },
  getHasSubscriptionPrimeInCart: (hasSubscription: boolean) => {
    _set({ hasPrimeSubscriptionInCart: hasSubscription });
  },
  changeStateAnimationBag: (state) => {
    _set({ animationBag: state });
  },
  handleClickContinue: () => {
    _set({ isVisibleModalWelcome: false });
  },
}));

export const usePrimeStore = createZustandStoreWithSelectors(primeStore);
