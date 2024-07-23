import { create } from 'zustand';
import type {
  OrderformAddMultipleItemInput,
  ProductColorOutput, ProductKitOutput, ProductQuery, ProductSizeOutput,
} from '../../base/graphql/generated';
import type { IProductDetailRouteParams } from '../../utils/createNavigateToProductParams';
import { createZustandStoreWithSelectors } from '../../utils/createZustandStoreWithSelectors';

interface IUseProductDetailStore {
  productDetail: ProductQuery['product'] | null;
  kit?: ProductKitOutput[] | null,
  hasPrime?: ProductQuery['product']['hasPrime'] | null;
  selectedColor: ProductColorOutput | null;
  selectedSize: ProductSizeOutput | null;
  sizeIsSelected: boolean;
  drawerIsOpen: boolean;
  selectedGiftCardSku: string | undefined;
  selectedGiftCardEmail: string | undefined;
  selectedKitItems: OrderformAddMultipleItemInput | null;
  itemsTotalizer: number;
  initialCep?: string;
  assinaturaSimples: {
    accepted: boolean;
    onToggleAccept: () => void;
  };
  resetProduct: () => void;
  setProduct: (data: ProductQuery['product'], routeParams?: IProductDetailRouteParams) => void;
  setSelectedColor: (colorId: string) => void;
  setSelectedSize: (variantId: string) => void;
  setGiftCardSelectedAmount: (giftCardSku: string) => void;
  setGiftCardSelectedEmail: (giftCardEmail: string) => void;
  setSelectedKitItems: (kitItems: OrderformAddMultipleItemInput, itemsTotalizer: number) => void;
  setDrawerIsOpen: (isOpen: boolean) => void;
  getDisabledSizes: () => string[];
  getSizes: () => string[];
}

export const productDetailStore = create<IUseProductDetailStore>((set, getState) => ({
  productDetail: null,
  kit: null,
  hasPrime: null,
  selectedColor: null,
  selectedGiftCardEmail: undefined,
  sizeIsSelected: false,
  drawerIsOpen: false,
  selectedSize: null,
  selectedGiftCardSku: undefined,
  selectedKitItems: null,
  itemsTotalizer: 0,
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
      sizeIsSelected: false,
      drawerIsOpen: false,
      initialCep: '',
    });
  },
  setProduct: (data: ProductQuery['product'], routeParams?: IProductDetailRouteParams) => {
    const {
      initialColor,
      initialSize,
      kit,
      hasPrime,
    } = data;

    set({
      ...getState(),
      productDetail: data,
      kit,
      hasPrime,
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

    const selectedSize = state.selectedColor.sizes.find((item) => (
      !item.disabled && item?.size === sizeName
    ));

    set({ ...state, selectedSize, sizeIsSelected: true });
  },

  setGiftCardSelectedAmount: (giftCardSku: string) => {
    const state = getState();

    set({ ...state, selectedGiftCardSku: giftCardSku });
  },

  setGiftCardSelectedEmail: (giftCardEmail: string) => {
    const state = getState();

    set({ ...state, selectedGiftCardEmail: giftCardEmail });
  },

  setSelectedKitItems: (
    selectedKitItems: OrderformAddMultipleItemInput,
    itemsTotalizer: number,
  ) => {
    const state = getState();

    set({ ...state, selectedKitItems, itemsTotalizer });
  },
  setDrawerIsOpen: (isOpen: boolean) => {
    const state = getState();
    set({ ...state, drawerIsOpen: isOpen });
  },
  getDisabledSizes: () => getState().selectedColor?.sizes.filter((item) => item.disabled).map((item) => item.size || '') || [],
  getSizes: () => getState().selectedColor?.sizes.map((item) => item.size || '') || [],
}));

export const useProductDetailStore = createZustandStoreWithSelectors(productDetailStore);
