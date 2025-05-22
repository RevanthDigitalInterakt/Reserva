import type { ProductListOutput } from '../base/graphql/generated';
import type { IRsvProduct } from '../pages/Home/components/HomeShowcase/HomeShowcase';

export const getShelfData = (data: ProductListOutput[]) => {
  const newArr: IRsvProduct[] = data.map((item) => ({
    brand: item.brand,
    categoryTree: [],
    flags: [
      {
        type: 'savings',
        value: item.discountPercentage,
      },
    ],
    image: item.image,
    prices: {
      listPrice: item.listPrice,
      salePrice: item.currentPrice,
    },
    productId: item.productId,
    productLink: '',
    productName: item.productName,
    sku: [
      {
        colorHex: '',
        colorName: '',
        colorRefId: '',
        sizes: [
          {
            skuId: item.skuId,
            disabled: false,
            value: '',
          },
        ],
      },
    ],
  }));

  return newArr;
};
