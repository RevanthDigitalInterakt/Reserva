/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import { CategoriesParserString } from './categoriesParserString';
import type { IOrderFormItem } from '../context/CartContext';

interface Items extends IOrderFormItem {}

export const getAFContentId = (items: Items[]) => items.map((i: Items) => i.productId);

export const getAFContentType = (items: Items[]) => items.map((i: Items) => CategoriesParserString(i.productCategories));

export const getQuantity = (items: Items[]) => {
  const arr = items.reduce((acc: Items[], cur: Items) => {
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

export const getAFContent = (items: Items[]) => items.map((i: Items) => ({
  id: i.productId,
  price: i.price / 100 || 0,
  quantity: i.quantity,
}));

export const getAFQuantity = (items: Items[]) => JSON.stringify(items.map((i: Items) => ({
  id: i.productId,
  quantity: i.quantity,
})));

export const sumQuantity = (items: Items[]) => items.reduce((acc, value) => acc + value.quantity, 0);
