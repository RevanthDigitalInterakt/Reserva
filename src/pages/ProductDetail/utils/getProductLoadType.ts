import type { ProductInput } from '../../../base/graphql/generated';
import { GetProductTypeEnum } from '../../../base/graphql/generated';
import type { IProductDetailRouteParams } from '../../../utils/createNavigateToProductParams';

export function getProductLoadType(params: IProductDetailRouteParams): ProductInput {
  const conditions: [string | undefined, GetProductTypeEnum][] = [
    [params.slug, GetProductTypeEnum.Slug],
    [params.productId, GetProductTypeEnum.ProductId],
    [params.idsku || params.skuId, GetProductTypeEnum.SkuId],
  ];

  const [value, type] = conditions.find(([conditional]) => !!conditional) || [];

  if (!type || !value) {
    throw new Error('Parâmetros inválidos');
  }

  return {
    type,
    value,
    colorId: (params?.colorSelected || '').trim(),
    itemId: (params?.itemId || params?.skuId || params?.idsku || '').trim(),
  };
}
