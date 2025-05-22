import { create } from 'zustand';
import type { ProductRecommendationOutput } from '../../base/graphql/generated';
import type { ProductQL } from '../../graphql/products/productSearch';
import type { IRecommendationState } from './types/recommendation';

const parseProductsGatewayToVtex = (products: ProductRecommendationOutput[]) => {
  const vtexProducts: ProductQL[] = products.map((product) => ({
    ...product,
    skuSpecifications: [],
    categoryTree: product.categoryTree?.map((category) => ({
      name: category,
    })),
    items: product.items.map((item) => ({
      ...item,
      images: item.images.map((image) => ({
        imageUrl: image,
      })),
      sellers: item.sellers.map((seller) => ({
        ...seller,
        commertialOffer: {
          Price: seller?.commertialOffer?.price,
          Installments: seller?.commertialOffer?.installments.map((installment) => ({
            Value: installment?.value,
            TotalValuePlusInterestRate: installment?.totalValuePlusInterestRate,
            NumberOfInstallments: installment?.numberOfInstallments,
          })) || [],
          ListPrice: seller?.commertialOffer?.listPrice,
          PriceWithoutDiscount: seller?.commertialOffer?.priceWithoutDiscount,
          AvailableQuantity: seller?.commertialOffer?.availableQuantity,
          Tax: seller?.commertialOffer?.tax,
          discountHighlights: [],
          teasers: [],
          spotPrice: seller.commertialOffer?.spotPrice,
          taxPercentage: seller.commertialOffer?.taxPercentage,
        },
      })),
    })),
  })) as ProductQL[];
  return vtexProducts;
};

const useRecommendation = create<IRecommendationState>((set) => ({
  showSection: true,
  products: [],
  setShowSection: (value: boolean) => set(() => ({ showSection: value })),
  setProducts: (value: ProductRecommendationOutput[]) => set(
    () => ({ products: parseProductsGatewayToVtex(value) }),
  ),
}));

export default useRecommendation;
