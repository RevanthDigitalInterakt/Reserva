import type { OrderformItemOutput } from '../base/graphql/generated';

interface Item {
  additionalInfo: {
    brandName: string;
  }
}

export const getBrands = (items: Partial<OrderformItemOutput>[] | Item[]) => {
  const brandNames = items?.map((item) => item?.additionalInfo?.brandName || '');
  return brandNames ? brandNames?.join(',') : '';
};
