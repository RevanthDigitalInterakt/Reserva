/* eslint-disable max-len */
import { CategoriesParserString } from './categoriesParserString';

type Items = {
  productId: string;
  quantity: number;
  productCategories: any;
};

export const getAFContentId = (items: Items[]) => JSON.stringify(items.map((i: Items) => i.productId));
export const getAFContentType = (items: Items[]) => JSON.stringify(items.map((i: Items) => CategoriesParserString(i.productCategories)));
export const getQuantity = (items: Items[]) => {
  const arr = items.reduce((acc, cur) => {
    const { productId: curId, quantity: curQuantity } = cur;

    const indexOfExistingItem = acc.findIndex((item: Items) => item.productId === curId);

    if (indexOfExistingItem > -1) {
      const { productId, quantity } = acc[indexOfExistingItem];
      acc[indexOfExistingItem] = { productId, quantity: quantity + curQuantity };
      return acc;
    }

    acc = [...acc, cur];
    return acc;
  }, []);

  return arr;
};
export const getAFQuantity = (items: Items[]) => JSON.stringify(items.map((i: Items) => ({
  id: i.productId,
  quantity: i.quantity,
})));
