import { create } from 'zustand';
import type {
  ProductColorOutput, ProductQuery, ProductSizeOutput,
} from '../../base/graphql/generated';
import type { IProductDetailRouteParams } from '../../utils/createNavigateToProductParams';
import { createZustandStoreWithSelectors } from '../../utils/createZustandStoreWithSelectors';

interface IUseProductDetailStore {
  productDetail: ProductQuery['product'] | null;
  selectedColor: ProductColorOutput | null;
  selectedSize: ProductSizeOutput | null;
  selectedGiftCardSku: string | null;
  initialCep?: string;
  assinaturaSimples: {
    accepted: boolean;
    onToggleAccept: () => void;
  };
  resetProduct: () => void;
  setProduct: (data: ProductQuery['product'], routeParams?: IProductDetailRouteParams) => void;
  setSelectedColor: (colorId: string) => void;
  setSelectedSize: (variantId: string) => void;
}

export const productDetailStore = create<IUseProductDetailStore>((set, getState) => ({
  productDetail: null,
  selectedColor: null,
  selectedSize: null,
  selectedGiftCardSku: null,
  initialCep: '',
  assinaturaSimples: {
    accepted: true,
    onToggleAccept: async () => {
      const { assinaturaSimples, ...state } = getState();

      set({
        ...state,
        assinaturaSimples: {
          ...assinaturaSimples,
          accepted: !assinaturaSimples.accepted,
        },
      });
    },
  },
  resetProduct: () => {
    set({
      ...getState(),
      productDetail: null,
      selectedColor: null,
      selectedSize: null,
      initialCep: '',
    });
  },
  setProduct: (data: ProductQuery['product'], routeParams?: IProductDetailRouteParams) => {
    const { initialColor, initialSize } = data;

    set({
      ...getState(),
      productDetail: data,
      selectedColor: initialColor,
      selectedSize: initialSize,
      selectedGiftCardSku: routeParams?.skuId,
      initialCep: routeParams?.hasCep || '',
    });
  },
  setSelectedColor: (colorId: string) => {
    const state = getState();

    if (colorId === state.selectedColor?.colorId) return;

    const selectedColor = state.productDetail?.colors.find((item) => (
      !item.disabled && item?.colorId === colorId
    ));

    if (!selectedColor) return;

    const selectedSize = selectedColor.sizes.find((item) => !item.disabled);

    set({ ...state, selectedColor, selectedSize });
  },
  setSelectedSize: (sizeName: string) => {
    const state = getState();

    if (!state.selectedColor) return;
    if (sizeName === state.selectedSize?.size) return;

    const selectedSize = state.selectedColor.sizes.find((item) => (
      !item.disabled && item?.size === sizeName
    ));

    set({ ...state, selectedSize });
  },

  setGiftCardSelectedAmount: (giftCardSku: string) => {
    const state = getState();

    set({ ...state, selectedGiftCardSku: giftCardSku });
  },
}));

export const useProductDetailStore = createZustandStoreWithSelectors(productDetailStore);
