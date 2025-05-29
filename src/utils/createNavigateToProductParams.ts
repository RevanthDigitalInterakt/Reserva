import type { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList } from '../routes/StackNavigator';

export type IProductDetailRouteParams = StackScreenProps<RootStackParamList, 'ProductDetail'>['route']['params'];

export interface IParams {
  skuId?: string;
  slug?: string;
  productId?: string;
  colorSelected?: string;
}

export function createNavigateToProductParams(params: IParams) {
  const defaultParams: IProductDetailRouteParams = {
    productId: '',
    hasCep: '',
    idsku: '',
    skuId: '',
    itemId: '',
    colorSelected: '',
    sizeSelected: '',
    selectedSize: '',
  };

  return {
    ...defaultParams,
    ...params,
  };
}
