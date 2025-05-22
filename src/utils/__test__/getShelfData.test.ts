import type { ProductListOutput } from '../../base/graphql/generated';
import { getShelfData } from '../getShelfData';

describe('transform data from result ProductListOutput in any data type', () => {
  it('should return new data', () => {
    const data: ProductListOutput[] = [
      {
        brand: '',
        category: '',
        colorName: '',
        currentPrice: 0,
        discountPercentage: 0,
        ean: '',
        hasDiscount: false,
        hasPrime: false,
        image: '',
        installment: {
          number: 0,
          value: 0,
        },
        listPrice: 0,
        productId: '',
        productName: '',
        sizes: [
          {
            name: '',
            sellerId: '',
            sellerName: '',
            skuId: '',
            stock: 0,
          },
        ],
        skuId: '',
        skuName: '',
      },
    ];

    const newArr = [
      {
        brand: '',
        categoryTree: [],
        flags: [
          {
            type: 'savings',
            value: 0,
          },
        ],
        image: '',
        prices: {
          listPrice: 0,
          salePrice: 0,
        },
        productId: '',
        productLink: '',
        productName: '',
        sku: [
          {
            colorHex: '',
            colorName: '',
            colorRefId: '',
            sizes: [
              {
                skuId: '',
                disabled: false,
                value: '',
              },
            ],
          },
        ],
      },
    ];

    expect(getShelfData(data)).toStrictEqual(newArr);
  });
});
