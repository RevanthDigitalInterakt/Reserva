import type { IOrderFormItem } from '../context/CartContext';

export function adaptOrderFormItemsTrack(items?: IOrderFormItem[]) {
  return (items || []).map((item) => ({
    price: item.price / 100,
    item_id: item.productId,
    quantity: item.quantity,
    item_name: item.name,
    item_variant: item.skuName,
    item_category: 'product',
  }));
}
