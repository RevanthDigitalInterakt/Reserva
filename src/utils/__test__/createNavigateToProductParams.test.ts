import { createNavigateToProductParams, type IParams, type IProductDetailRouteParams } from '../createNavigateToProductParams';

describe('createNavigateToProductParams', () => {
  test('should return an object with merged defaultParams and params', () => {
    const params: IParams = {
      skuId: '123',
      colorSelected: 'blue',
    };

    const result = createNavigateToProductParams(params);

    const expected: IProductDetailRouteParams = {
      productId: '',
      hasCep: '',
      idsku: '',
      skuId: '123',
      itemId: '',
      colorSelected: 'blue',
      sizeSelected: '',
      selectedSize: '',
    };

    expect(result).toEqual(expected);
  });

  test('should return an object with only defaultParams if params is empty', () => {
    const params: IParams = {};

    const result = createNavigateToProductParams(params);

    const expected: IProductDetailRouteParams = {
      productId: '',
      hasCep: '',
      idsku: '',
      skuId: '',
      itemId: '',
      colorSelected: '',
      sizeSelected: '',
      selectedSize: '',
    };

    expect(result).toEqual(expected);
  });
});
