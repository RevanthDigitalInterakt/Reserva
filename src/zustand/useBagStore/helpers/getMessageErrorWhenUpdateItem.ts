import type { TItemBag } from '../types/bagStore';
import type {
  OrderFormQuery, OrderFormUpdateItemMutation, OrderformPackageItemsOutput,
} from '../../../base/graphql/generated';

interface IGetMessagesErrorWhenUpdatedItem {
  updateItemResponse?: OrderFormUpdateItemMutation['orderFormUpdateItem'],
  currentItem: TItemBag;
  mergeItems: OrderformPackageItemsOutput['items']
  currentUpdateValueItem: number;
  appTotalizers: OrderFormQuery['orderForm']['appTotalizers'];
}

export function getMessageErrorWhenUpdateItem(info: IGetMessagesErrorWhenUpdatedItem): string {
  const {
    updateItemResponse,
    currentItem,
    mergeItems,
    appTotalizers,
    currentUpdateValueItem: currValueItem,
  } = info;

  if (!updateItemResponse) return '';

  const messages = updateItemResponse.messages.filter((error: string) => error.includes(currentItem.name))[0] || '';

  const newQtyAndTotalizerItemInfo = mergeItems.reduce((
    previousValue,
    currentValue: TItemBag,
  ) => (
    currentItem.id === currentValue.id
      ? {
        quantity: previousValue.quantity + currentValue.quantity,
        totalizerItem: previousValue.totalizerItem + 1,
      }
      : { ...previousValue }
  ), { quantity: 0, totalizerItem: 0 });

  if (newQtyAndTotalizerItemInfo.totalizerItem) {
    if (appTotalizers.total === newQtyAndTotalizerItemInfo.quantity) {
      return messages;
    }
  } else if (newQtyAndTotalizerItemInfo.quantity !== currValueItem && currValueItem > 0) {
    return messages;
  }

  return '';
}
