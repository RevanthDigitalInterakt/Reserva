import type { IFallBackRoute } from '../../../types/asyncDeepLinkStore';

export const productService = async (skuId:string, fulUrl:string):Promise<IFallBackRoute> => ({
  routeName: 'ProductDetail',
  params: {
    skuId,
    comeFrom: 'DeepLink',
  },
});
