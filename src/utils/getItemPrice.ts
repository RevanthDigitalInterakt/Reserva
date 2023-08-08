import type { Installment, SKU } from '../graphql/products/productSearch';
import { getPercent } from './getPercent';

export interface ItemPrice {
  listPrice: number;
  sellingPrice: number;
  installmentsNumber: Installment | undefined;
  installments?: Installment[];
  discountTag?: number;
  cashPaymentPrice: number;
  installmentPrice?: Installment;
}

export const getItemPrice = (item?: SKU | null) => {
  if (!item) {
    return {
      listPrice: 0,
      sellingPrice: 0,
      installments: [],
      installmentsNumber: undefined,
      discountTag: undefined,
      cashPaymentPrice: 0,
      installmentPrice: undefined,
    };
  }

  const sellerWithInstallments = item.sellers
    .find((seller) => seller.commertialOffer?.Installments?.length > 0);
  const productIsSoldOut = item.sellers
    .every((seller) => seller.commertialOffer?.AvailableQuantity === 0);
  if (!sellerWithInstallments && productIsSoldOut) {
    return {
      listPrice: item.sellers[0]?.commertialOffer?.ListPrice || 0,
      sellingPrice: item.sellers[0]?.commertialOffer?.Price || 0,
      installments: [],
      installmentsNumber: undefined,
      discountTag: undefined,
      cashPaymentPrice: 0,
      installmentPrice: undefined,
    };
  }

  const listPrice = sellerWithInstallments?.commertialOffer.ListPrice || 0;
  const sellingPrice = sellerWithInstallments?.commertialOffer.Price || 0;
  const installments = sellerWithInstallments?.commertialOffer?.Installments || [];

  const installmentsNumber = installments.reduce(
    (prev, next) => (prev.NumberOfInstallments > next.NumberOfInstallments
      ? prev
      : next),
    { NumberOfInstallments: 0, Value: 0 },
  );
  const hasListPriceAndSellingPrice = listPrice && sellingPrice;
  const discountTag = hasListPriceAndSellingPrice && getPercent(sellingPrice, listPrice);

  const cashPaymentPrice = !!discountTag && discountTag > 0
    ? sellingPrice
    : listPrice || 0;

  const installmentPrice = installments?.reduce(
    (prev, next) => (prev.NumberOfInstallments > next.NumberOfInstallments
      ? prev
      : next),
    { NumberOfInstallments: 0, Value: 0 },
  );

  return {
    listPrice,
    sellingPrice,
    installments,
    installmentsNumber,
    discountTag,
    cashPaymentPrice,
    installmentPrice,
  };
};
