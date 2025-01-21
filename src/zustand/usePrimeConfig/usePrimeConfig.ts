/* TODO when refactoring the PDC and NewSearch, you should remove this logic */
import { create } from 'zustand';
import { createZustandStoreWithSelectors } from '../../utils/createZustandStoreWithSelectors';
import {
  type PrimeConfigOutput, type PrimeConfigQuery, type PrimeConfigQueryVariables, PrimeConfigDocument,
} from '../../base/graphql/generated';
import { getApolloClient } from '../../utils/getApolloClient';
import type { ProductQL } from '../../graphql/products/productSearch';
import { ExceptionProvider } from '../../base/providers/ExceptionProvider';

interface IPrimeConfig {
  promo: any;
  onPrimeConfig: () => Promise<void>;
}

export const primeConfig = create<IPrimeConfig>((set, getState) => ({
  promo: null,
  onPrimeConfig: async () => {
    try {
      const { data } = await getApolloClient().query<PrimeConfigQuery, PrimeConfigQueryVariables>({
        query: PrimeConfigDocument,
        context: { clientName: 'gateway' },
        fetchPolicy: 'no-cache',
      });

      set({ ...getState(), promo: data.primeConfig });
    } catch (err) {
      ExceptionProvider.captureException(err, "primeConfig - usePrimeConfig.ts")
    }
  }
}))

export const usePrimeConfig = createZustandStoreWithSelectors(primeConfig);

export function getDefaultSeller(sellers?: any[]) {
  if (!sellers?.length) {
    return undefined;
  }

  const defaultSeller = sellers.find((seller) => seller.sellerDefault === true);
  if (defaultSeller?.sellerId) {
    return defaultSeller.sellerId;
  }

  return sellers[0].sellerId;
}

export const hasPrimeConditions = (
  product: ProductQL,
  promo: PrimeConfigOutput,

) => {
  if (product?.items[0]?.sellers[0]?.commertialOffer?.ListPrice
    !== product?.items[0]?.sellers[0]?.commertialOffer?.Price) {
    return false;
  }

  if (!product || !promo?.percentualDiscountValue) {
    return false;
  }

  const categories = promo?.categories.map((c) => String(c.id));

  const categoriesHasPrime = promo?.categoriesAreInclusive
    ? categories.includes(String(product.categoryId))
    : !categories.includes(String(product.categoryId));

  if (!categoriesHasPrime) {
    return false;
  }

  const brands = promo?.brands.map((c) => String(c.id));

  const brandsHasPrime = promo?.brandsAreInclusive
    ? brands.includes(String(product.brandId))
    : !brands.includes(String(product.brandId));

  if (!brandsHasPrime) {
    return false;
  }

  const collections = promo?.collections.map((c) => String(c.id));

  const productCollections = product?.productClusters?.map((c) => String(c.id));

  const hasAnyCollectionInCluster = collections.reduce(
    (acc, cur) => acc || (!!productCollections?.length && productCollections.includes(cur)),
    false,
  );

  const collectionsHasPrime = promo?.collectionsIsInclusive
    ? hasAnyCollectionInCluster
    : !hasAnyCollectionInCluster;

  if (!collectionsHasPrime) {
    return false;
  }

  const sellers = product.items.map((item) => {
    const seller = getDefaultSeller(item.sellers);

    return seller;
  });

  const sellersPrime = sellers.reduce((acc, cur) => {
    const seller = promo?.idSeller.includes(cur);
    return acc || seller;
  }, false);

  const sellerIsPrime = promo?.idSellerIsInclusive
    ? sellersPrime
    : !sellersPrime;

  if (!sellerIsPrime) {
    return false;
  }

  return true;
};

export interface IProductItemSeller {
  sellerName: string
  sellerId: string
  sellerDefault: boolean
  commertialOffer: IProductSellerCommertialOffer
}

interface IProductSellerCommertialOffer {
  AvailableQuantity: number
  Price: number
  ListPrice: number
  spotPrice: number
  Tax: number
  taxPercentage: number
  Installments: Installment[]
}

interface Installment {
  Value: number
  NumberOfInstallments: number
  PaymentSystemName: string
  PaymentSystemGroupName: string
  Name: string
}

const getPrimeInstallments = (Installments: Installment[], price: number) => {
  const maxInstallmentOption = Installments?.length ? Installments[0] : null;
  let installments = maxInstallmentOption?.NumberOfInstallments ?? 1;

  new Array(12).fill(0).forEach((_, index) => {
    if (price / (index + 1) >= 60) {
      installments = index + 1;
    }
  });

  return {
    number: installments,
    value: parseFloat((price / installments).toFixed(2)),
  };
};

export interface IGetPrimeReturn {
  primePrice: number;
  primeInstallments: { number: number; value: number; };
}

export const getPrime = (item: ProductQL, promo: PrimeConfigOutput): IGetPrimeReturn | null => {
  const hasPrime = hasPrimeConditions(item, promo);

  if (hasPrime) {
    const seller = item?.items[0]?.sellers[0];
    const priceWithDiscount = seller?.commertialOffer?.Price ?? 0;
    const Installments = seller?.commertialOffer?.Installments;

    const primePercentualDiscount = promo?.percentualDiscountValue || 0;
    const primePrice = priceWithDiscount * ((100 - primePercentualDiscount) / 100);

    const primeInstallments = getPrimeInstallments(Installments, primePrice);

    return {
      primePrice,
      primeInstallments,
    };
  }
  return null;
};
