import { CategoriesParserString } from './categoriesParserString';
import type { OrderFormQuery } from '../base/graphql/generated';

type TOrderFormItem = OrderFormQuery['orderForm']['items'][0];

interface IOrderFormItem extends TOrderFormItem {}

export const getAFContentId = (items: IOrderFormItem[]) => (
  items.map((i: IOrderFormItem) => i.productId)
);

export const getAFContentType = (items: IOrderFormItem[]) => (
  items.map((i: IOrderFormItem) => CategoriesParserString(i.productCategories))
);

export const getQuantity = (items: IOrderFormItem[]) => {
  const arr = items.reduce((acc: IOrderFormItem[], cur: IOrderFormItem) => {
    const { productId: curId, quantity: curQuantity } = cur;

    const indexOfExistingItem = acc.findIndex((item: IOrderFormItem) => item.productId === curId);

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

export const getAFContent = (items: IOrderFormItem[]) => items.map((i: IOrderFormItem) => ({
  id: i.productId,
  price: i.price / 100 || 0,
  quantity: i.quantity,
}));

export const getAFQuantity = (items: IOrderFormItem[]) => (
  JSON.stringify(items.map((i: IOrderFormItem) => ({
    id: i.productId,
    quantity: i.quantity,
  })))
);

export const sumQuantity = (items: IOrderFormItem[]) => (
  items.reduce((acc, value) => acc + value.quantity, 0)
);
