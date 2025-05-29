// TODO move to BFF when create New WishList
export const getHighestInstallment = (installments: any[]) => installments?.reduce(
  (prev: any, next: any) => (prev.NumberOfInstallments > next.NumberOfInstallments ? prev : next),
  { NumberOfInstallments: 0, Value: 0 },
);

export const mapProductToFavoriteItem = (product: any, wishSkus: string[]) => product.items.flatMap((item: any) => {
  if (wishSkus.includes(item.itemId)) {
    const availableProduct = item?.sellers[0]?.commertialOffer?.AvailableQuantity > 0;
    const highestInstallment = getHighestInstallment(
      item?.sellers[0]?.commertialOffer?.Installments,
    );

    const sellerId = item?.sellers[0]?.sellerId;
    const colorName = item.variations[3]?.values[0];
    const size = item.variations[0]?.values[0];
    const imageUrl = item?.images[0]?.imageUrl;

    return [{
      id: item.itemId,
      product,
      colorName,
      size,
      imageUrl,
      sellerId,
      skuName: item.name,
      skuId: item.itemId,
      availableProduct,
      installmentsNumber: highestInstallment.NumberOfInstallments,
      installmentPrice: highestInstallment.Value,
    }];
  }
  return [];
});
