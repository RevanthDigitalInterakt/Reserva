import { getHighestInstallment, mapProductToFavoriteItem } from '../adaptWishList';

describe('getHighestInstallment', () => {
  it('should return the highest installment from a list', () => {
    const installments = [
      { NumberOfInstallments: 2, Value: 100 },
      { NumberOfInstallments: 3, Value: 66.66 },
      { NumberOfInstallments: 1, Value: 200 },
    ];
    const result = getHighestInstallment(installments);
    expect(result).toEqual({ NumberOfInstallments: 3, Value: 66.66 });
  });

  it('should return default value for an empty array', () => {
    const result = getHighestInstallment([]);
    expect(result).toEqual({ NumberOfInstallments: 0, Value: 0 });
  });
});

describe('mapProductToFavoriteItem', () => {
  const mockProduct = {
    items: [
      {
        itemId: '123',
        sellers: [{
          commertialOffer: {
            AvailableQuantity: 5,
            Installments: [
              { NumberOfInstallments: 2, Value: 100 },
            ],
          },
          sellerId: 'seller1',
        }],
        variations: [
          { values: ['L'] },
          {},
          {},
          { values: ['Red'] },
        ],
        images: [{ imageUrl: 'http://example.com/image.jpg' }],
        name: 'Product Name',
      },
    ],
  };

  it('should map product to favorite item when item is in wishSkus and available', () => {
    const result = mapProductToFavoriteItem(mockProduct, ['123']);
    expect(result).toEqual([
      {
        id: '123',
        product: mockProduct,
        colorName: 'Red',
        size: 'L',
        imageUrl: 'http://example.com/image.jpg',
        sellerId: 'seller1',
        skuName: 'Product Name',
        skuId: '123',
        availableProduct: true,
        installmentsNumber: 2,
        installmentPrice: 100,
      },
    ]);
  });

  it('should return an empty array when item is not in wishSkus', () => {
    const result = mapProductToFavoriteItem(mockProduct, []);
    expect(result).toEqual([]);
  });

  it('should handle product items with no variations or images', () => {
    const noVariationOrImagesProduct = {
      ...mockProduct,
      items: [{
        ...mockProduct.items[0],
        variations: [],
        images: [],
      }],
    };
    const result = mapProductToFavoriteItem(noVariationOrImagesProduct, ['123']);
    expect(result[0]).toMatchObject({
      id: '123',
      colorName: undefined,
      size: undefined,
      imageUrl: undefined,
      skuName: 'Product Name',
      skuId: '123',
      availableProduct: true,
      installmentsNumber: 2,
      installmentPrice: 100,
    });
  });
});
