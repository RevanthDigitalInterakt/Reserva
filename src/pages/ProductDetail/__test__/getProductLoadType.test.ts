import type { IProductDetailRouteParams } from '../../../utils/createNavigateToProductParams';
import { getProductLoadType } from '../utils/getProductLoadType';

const MOCK_DEFAULT_PARAMS:IProductDetailRouteParams = {
  colorSelected: 'colorSelected',
  sizeSelected: 'sizeSelected',
  hasCep: 'hasCep',
  idsku: 'idsku',
  itemId: 'itemId',
  selectedSize: 'selectedSize',
  skuId: 'skuId',
};

const MOCK_REQUIRED_PARAMS:IProductDetailRouteParams = {
  colorSelected: 'colorSelected',
  sizeSelected: 'sizeSelected',
  idsku: 'idsku',
};

const MOCK_REQUIRED_RESULT = {
  type: 'SKU_ID',
  value: 'idsku',
  colorId: 'colorSelected',
  itemId: 'idsku',
};
const MOCK_DEFAULT_RESULT = {
  type: 'SKU_ID',
  value: 'idsku',
  colorId: 'colorSelected',
  itemId: 'itemId',
};

describe('getProductLoadType', () => {
  it('should return correct values when only required params is passed', () => {
    const result = getProductLoadType(MOCK_REQUIRED_PARAMS);
    expect(result).toEqual(MOCK_REQUIRED_RESULT);
  });
  it('should return correct values when default params is passed', () => {
    const result = getProductLoadType(MOCK_DEFAULT_PARAMS);
    expect(result).toEqual(MOCK_DEFAULT_RESULT);
  });
  it('should throw error when no params is passed', () => {
    expect(() => getProductLoadType({} as IProductDetailRouteParams)).toThrowError();
  });
});
