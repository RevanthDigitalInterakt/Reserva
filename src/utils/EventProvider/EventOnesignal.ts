type TagsValues = {
  cart_update: string;
  product_image?: string;
  product_name?: string;
  last_purchase_date: string;
  last_purchase_total: string;
  last_order_value: string;
  total_orders_value: string;
};

export namespace EventsOptions {
  export type SendAbandonedCartTags = Pick<TagsValues, | 'cart_update' | 'product_image' | 'product_name'> & {};

  export type SendLastOrderData = Pick<TagsValues, | 'last_purchase_date' | 'last_order_value' | 'total_orders_value'
  > & {};
}

export type EventOptionsOneSignalFn =
  | {
    type: 'sendAbandonedCartTags';
    payload: EventsOptions.SendAbandonedCartTags;
  }
  | {
    type: 'sendLastOrderData';
    payload: EventsOptions.SendLastOrderData;
  };
