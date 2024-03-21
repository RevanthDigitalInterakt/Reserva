import type { OrderFormQuery } from '../base/graphql/generated';
import EventProvider from './EventProvider';
import type { Items } from './EventProvider/Event';
import { ExceptionProvider } from '../base/providers/ExceptionProvider';

type TTrackViewCartProps = {
  items: OrderFormQuery['orderForm']['packageItems'][0]['items'],
  price: number,
};

export const trackViewCart = ({
  items,
  price,
}: TTrackViewCartProps) => {
  const newItems: Items[] = items.map((item) => ({
    price: item.price / 100,
    quantity: item.quantity,
    item_name: item.name,
    item_category: item.additionalInfo?.brandName || 'RESERVA',
    item_id: item.id,
    item_variant: item.itemColor,
  }));

  try {
    EventProvider.logEvent('view_cart', {
      currency: 'BRL',
      items: newItems,
      value: price,
    });
  } catch (error) {
    ExceptionProvider.captureException(error);
  }
};
